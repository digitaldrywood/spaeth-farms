-- name: GetOrder :one
SELECT * FROM orders WHERE id = $1 LIMIT 1;

-- name: GetOrderByStripeSession :one
SELECT * FROM orders WHERE stripe_session_id = $1 LIMIT 1;

-- name: ListOrders :many
SELECT * FROM orders ORDER BY created_at DESC LIMIT $1 OFFSET $2;

-- name: ListOrdersByStatus :many
SELECT * FROM orders WHERE status = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3;

-- name: ListOrdersByEmail :many
SELECT * FROM orders WHERE customer_email = $1 ORDER BY created_at DESC;

-- name: CreateOrder :one
INSERT INTO orders (stripe_session_id, customer_email, customer_name, customer_phone, shipping_address, items, subtotal_cents, shipping_cents, total_cents, status)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
RETURNING *;

-- name: UpdateOrderStatus :exec
UPDATE orders
SET status = $1, updated_at = CURRENT_TIMESTAMP
WHERE id = $2;

-- name: UpdateOrderStatusBySession :exec
UPDATE orders
SET status = $1, updated_at = CURRENT_TIMESTAMP
WHERE stripe_session_id = $2;

-- name: UpdateOrderPaymentIntent :exec
UPDATE orders
SET stripe_payment_intent = $1, updated_at = CURRENT_TIMESTAMP
WHERE stripe_session_id = $2;

-- name: CountOrders :one
SELECT COUNT(*) FROM orders;

-- name: CountOrdersByStatus :one
SELECT COUNT(*) FROM orders WHERE status = $1;

-- name: GetRecentOrders :many
SELECT * FROM orders ORDER BY created_at DESC LIMIT $1;
