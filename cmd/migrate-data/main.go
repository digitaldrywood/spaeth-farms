package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"os"
	"strings"

	"github.com/jackc/pgx/v5/pgtype"

	"spaeth-farms/pkg/database"
	"spaeth-farms/pkg/database/sqlc"
)

type ProductJSON struct {
	ID              string   `json:"id"`
	Slug            string   `json:"slug"`
	Name            string   `json:"name"`
	Description     string   `json:"description"`
	LongDescription string   `json:"longDescription"`
	Price           float64  `json:"price"`
	Weight          string   `json:"weight"`
	Category        string   `json:"category"`
	Image           string   `json:"image"`
	InStock         bool     `json:"inStock"`
	Featured        bool     `json:"featured"`
	Details         []string `json:"details"`
}

type CategoryJSON struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Image       string `json:"image"`
}

type ProductsFile struct {
	Products   []ProductJSON  `json:"products"`
	Categories []CategoryJSON `json:"categories"`
}

func main() {
	ctx := context.Background()

	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		slog.Error("DATABASE_URL environment variable is required")
		os.Exit(1)
	}

	slog.Info("connecting to database", "url", dbURL)
	db, err := database.New(ctx, dbURL)
	if err != nil {
		slog.Error("failed to connect to database", "error", err)
		os.Exit(1)
	}
	defer db.Close()

	// Load products.json
	data, err := os.ReadFile("src/data/products.json")
	if err != nil {
		slog.Error("failed to read products.json", "error", err)
		os.Exit(1)
	}

	var productsFile ProductsFile
	if err := json.Unmarshal(data, &productsFile); err != nil {
		slog.Error("failed to parse products.json", "error", err)
		os.Exit(1)
	}

	// Migrate categories
	slog.Info("migrating categories", "count", len(productsFile.Categories))
	for i, cat := range productsFile.Categories {
		_, err := db.Queries.CreateCategory(ctx, sqlc.CreateCategoryParams{
			ID:          cat.ID,
			Name:        cat.Name,
			Description: toPgText(cat.Description),
			SortOrder:   pgtype.Int4{Int32: int32(i), Valid: true},
		})
		if err != nil {
			if strings.Contains(err.Error(), "duplicate key") {
				slog.Info("category already exists, skipping", "id", cat.ID)
				continue
			}
			slog.Error("failed to create category", "id", cat.ID, "error", err)
			continue
		}
		slog.Info("created category", "id", cat.ID, "name", cat.Name)
	}

	// Migrate products
	slog.Info("migrating products", "count", len(productsFile.Products))
	for _, prod := range productsFile.Products {
		// Convert price to cents
		priceCents := int32(prod.Price * 100)

		// Use long description if available
		description := prod.Description
		if prod.LongDescription != "" {
			description = prod.LongDescription
		}

		// Fix image path (remove /spaeth-farms prefix and add /static)
		image := strings.TrimPrefix(prod.Image, "/spaeth-farms")
		if !strings.HasPrefix(image, "/static") && strings.HasPrefix(image, "/images") {
			image = "/static" + image
		}

		_, err := db.Queries.CreateProduct(ctx, sqlc.CreateProductParams{
			Slug:        prod.Slug,
			Name:        prod.Name,
			CategoryID:  toPgText(prod.Category),
			PriceCents:  priceCents,
			Weight:      toPgText(prod.Weight),
			Description: toPgText(description),
			Image:       toPgText(image),
			Featured:    pgtype.Bool{Bool: prod.Featured, Valid: true},
			InStock:     pgtype.Bool{Bool: prod.InStock, Valid: true},
		})
		if err != nil {
			if strings.Contains(err.Error(), "duplicate key") {
				slog.Info("product already exists, skipping", "slug", prod.Slug)
				continue
			}
			slog.Error("failed to create product", "slug", prod.Slug, "error", err)
			continue
		}
		slog.Info("created product", "slug", prod.Slug, "name", prod.Name)
	}

	// Add default hero slides
	slog.Info("adding hero slides")
	heroImages := []struct {
		Image   string
		AltText string
	}{
		{"/static/images/hero-cattle.jpg", "Spaeth Farms cattle grazing"},
		{"/static/images/farm-scene.jpg", "Scenic farm view"},
		{"/static/images/hereford-herd.jpg", "Hereford cattle herd"},
	}

	for i, slide := range heroImages {
		_, err := db.Queries.CreateHeroSlide(ctx, sqlc.CreateHeroSlideParams{
			Image:     slide.Image,
			AltText:   toPgText(slide.AltText),
			SortOrder: pgtype.Int4{Int32: int32(i), Valid: true},
			Active:    pgtype.Bool{Bool: true, Valid: true},
		})
		if err != nil {
			slog.Warn("failed to create hero slide", "image", slide.Image, "error", err)
			continue
		}
		slog.Info("created hero slide", "image", slide.Image)
	}

	// Add default site settings
	slog.Info("adding site settings")
	settings := map[string]string{
		"phone":             "715-313-0075",
		"email":             "info@spaethfarms.com",
		"address":           "Loyal, Wisconsin",
		"free_shipping_min": "199",
		"tagline":           "Premium Farm-Raised Beef Delivered Nationwide",
		"about_short":       "Family-owned Spaeth Farms has been raising premium Hereford cattle in Wisconsin for generations.",
		"facebook_url":      "",
		"instagram_url":     "",
		"shipping_info":     "Orders ship Monday-Wednesday via FedEx. Free shipping on orders over $199.",
		"return_policy":     "We stand behind our products. If you're not satisfied, contact us within 7 days of delivery.",
	}

	for key, value := range settings {
		err := db.Queries.UpsertSetting(ctx, sqlc.UpsertSettingParams{
			Key:   key,
			Value: toPgText(value),
		})
		if err != nil {
			slog.Warn("failed to upsert setting", "key", key, "error", err)
			continue
		}
		slog.Info("set setting", "key", key)
	}

	// Add sample testimonials
	slog.Info("adding testimonials")
	testimonials := []struct {
		Author   string
		Location string
		Content  string
		Rating   int32
		Featured bool
	}{
		{
			Author:   "Michael R.",
			Location: "Chicago, IL",
			Content:  "The ribeyes from Spaeth Farms are hands-down the best steaks I've ever cooked at home. The marbling is incredible and the flavor is unmatched.",
			Rating:   5,
			Featured: true,
		},
		{
			Author:   "Sarah & Tom K.",
			Location: "Minneapolis, MN",
			Content:  "We ordered the Family Essentials Bundle and it fed our family of five for over a month. Great variety and amazing quality at a fair price.",
			Rating:   5,
			Featured: true,
		},
		{
			Author:   "David L.",
			Location: "Denver, CO",
			Content:  "Shipping was fast and everything arrived frozen solid. You can really taste the difference when beef is raised right. We're customers for life!",
			Rating:   5,
			Featured: true,
		},
	}

	for _, t := range testimonials {
		_, err := db.Queries.CreateTestimonial(ctx, sqlc.CreateTestimonialParams{
			Author:   t.Author,
			Location: toPgText(t.Location),
			Content:  t.Content,
			Rating:   pgtype.Int4{Int32: t.Rating, Valid: true},
			Featured: pgtype.Bool{Bool: t.Featured, Valid: true},
		})
		if err != nil {
			slog.Warn("failed to create testimonial", "author", t.Author, "error", err)
			continue
		}
		slog.Info("created testimonial", "author", t.Author)
	}

	fmt.Println("\nData migration complete!")
	fmt.Println("Run 'make migrate' first if you haven't already.")
}

func toPgText(s string) pgtype.Text {
	if s == "" {
		return pgtype.Text{Valid: false}
	}
	return pgtype.Text{String: s, Valid: true}
}
