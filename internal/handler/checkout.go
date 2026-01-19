package handler

import (
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"

	"github.com/jackc/pgx/v5/pgtype"

	"spaeth-farms/internal/database/sqlc"
	"spaeth-farms/internal/services"
	"spaeth-farms/templates/pages"

	"github.com/labstack/echo/v4"
)

func (h *Handler) Checkout(c echo.Context) error {
	ctx := c.Request().Context()
	return pages.Checkout(h.cfg.StripePublishableKey).Render(ctx, c.Response().Writer)
}

func (h *Handler) CheckoutCreateSession(c echo.Context) error {
	ctx := c.Request().Context()

	if !h.stripe.IsConfigured() {
		return c.JSON(http.StatusServiceUnavailable, map[string]string{
			"error": "Payments are not configured",
		})
	}

	var req services.CheckoutRequest
	if err := c.Bind(&req); err != nil {
		slog.Error("failed to parse checkout request", "error", err)
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid request",
		})
	}

	if len(req.Items) == 0 {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Cart is empty",
		})
	}

	// SECURITY: Validate prices server-side by looking up each product
	// Never trust client-supplied prices
	var subtotal int32
	for i, item := range req.Items {
		product, err := h.db.Queries.GetProductBySlug(ctx, item.Slug)
		if err != nil {
			slog.Error("product not found during checkout", "slug", item.Slug, "error", err)
			return c.JSON(http.StatusBadRequest, map[string]string{
				"error": fmt.Sprintf("Product not found: %s", item.Slug),
			})
		}

		// Use server-side price, not client-supplied price
		req.Items[i].Price = int64(product.PriceCents)
		req.Items[i].Name = product.Name
		if product.Weight.Valid {
			req.Items[i].Weight = product.Weight.String
		}
		if product.Image.Valid {
			req.Items[i].Image = product.Image.String
		}

		subtotal += product.PriceCents * int32(item.Qty)
	}

	baseURL := h.cfg.Site.URL
	successURL := baseURL + "/checkout/success"
	cancelURL := baseURL + "/checkout/cancel"

	sess, err := h.stripe.CreateCheckoutSession(ctx, &req, successURL, cancelURL)
	if err != nil {
		slog.Error("failed to create checkout session", "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to create checkout session",
		})
	}

	// Store order in database with validated prices
	itemsJSON, _ := json.Marshal(req.Items)

	// Calculate shipping (free over $199)
	var shippingCents int32
	if subtotal < 19900 {
		shippingCents = 2999
	}
	totalCents := subtotal + shippingCents

	address := fmt.Sprintf("%s %s, %s, %s %s",
		req.Customer.Address,
		req.Customer.Apartment,
		req.Customer.City,
		req.Customer.State,
		req.Customer.ZipCode)

	customerName := req.Customer.FirstName + " " + req.Customer.LastName

	_, err = h.db.Queries.CreateOrder(ctx, sqlc.CreateOrderParams{
		StripeSessionID: pgtype.Text{String: sess.ID, Valid: true},
		CustomerEmail:   req.Customer.Email,
		CustomerName:    pgtype.Text{String: customerName, Valid: true},
		CustomerPhone:   toPgText(req.Customer.Phone),
		ShippingAddress: pgtype.Text{String: address, Valid: true},
		Items:           string(itemsJSON),
		SubtotalCents:   subtotal,
		ShippingCents:   pgtype.Int4{Int32: shippingCents, Valid: true},
		TotalCents:      totalCents,
		Status:          pgtype.Text{String: "pending", Valid: true},
	})
	if err != nil {
		slog.Error("failed to create order", "error", err)
	}

	return c.JSON(http.StatusOK, map[string]string{
		"sessionId": sess.ID,
		"url":       sess.URL,
	})
}

func (h *Handler) CheckoutSuccess(c echo.Context) error {
	ctx := c.Request().Context()
	sessionID := c.QueryParam("session_id")

	if sessionID != "" && h.stripe.IsConfigured() {
		sess, err := h.stripe.GetCheckoutSession(ctx, sessionID)
		if err != nil {
			slog.Error("failed to get checkout session", "error", err)
		} else {
			// Update order status
			err = h.db.Queries.UpdateOrderStatusBySession(ctx, sqlc.UpdateOrderStatusBySessionParams{
				Status:          pgtype.Text{String: "completed", Valid: true},
				StripeSessionID: pgtype.Text{String: sessionID, Valid: true},
			})
			if err != nil {
				slog.Error("failed to update order status", "error", err)
			}

			slog.Info("checkout success", "session_id", sessionID, "customer_email", sess.CustomerEmail)
		}
	}

	return pages.CheckoutSuccess().Render(ctx, c.Response().Writer)
}

func (h *Handler) CheckoutCancel(c echo.Context) error {
	ctx := c.Request().Context()
	return pages.CheckoutCancel().Render(ctx, c.Response().Writer)
}

func (h *Handler) StripeWebhook(c echo.Context) error {
	if !h.stripe.IsConfigured() {
		return c.NoContent(http.StatusOK)
	}

	body, err := io.ReadAll(c.Request().Body)
	if err != nil {
		slog.Error("failed to read webhook body", "error", err)
		return c.NoContent(http.StatusBadRequest)
	}

	signature := c.Request().Header.Get("Stripe-Signature")
	event, err := h.stripe.VerifyWebhookSignature(body, signature)
	if err != nil {
		slog.Error("webhook signature verification failed", "error", err)
		return c.NoContent(http.StatusBadRequest)
	}

	if err := h.stripe.HandleWebhookEvent(event); err != nil {
		slog.Error("webhook handler error", "error", err)
		return c.NoContent(http.StatusInternalServerError)
	}

	return c.NoContent(http.StatusOK)
}

