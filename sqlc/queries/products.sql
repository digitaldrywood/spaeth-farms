-- name: GetProduct :one
SELECT * FROM products WHERE id = $1 LIMIT 1;

-- name: GetProductBySlug :one
SELECT * FROM products WHERE slug = $1 LIMIT 1;

-- name: ListProducts :many
SELECT * FROM products ORDER BY name;

-- name: ListProductsByCategory :many
SELECT * FROM products WHERE category_id = $1 ORDER BY name;

-- name: ListFeaturedProducts :many
SELECT * FROM products WHERE featured = true ORDER BY name;

-- name: ListInStockProducts :many
SELECT * FROM products WHERE in_stock = true ORDER BY name;

-- name: SearchProducts :many
SELECT * FROM products
WHERE name LIKE $1 OR description LIKE $2
ORDER BY name;

-- name: CreateProduct :one
INSERT INTO products (slug, name, category_id, price_cents, weight, description, image, featured, in_stock)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *;

-- name: UpdateProduct :exec
UPDATE products
SET name = $1, category_id = $2, price_cents = $3, weight = $4, description = $5, image = $6, featured = $7, in_stock = $8, updated_at = CURRENT_TIMESTAMP
WHERE id = $9;

-- name: UpdateProductBySlug :exec
UPDATE products
SET name = $1, category_id = $2, price_cents = $3, weight = $4, description = $5, image = $6, featured = $7, in_stock = $8, updated_at = CURRENT_TIMESTAMP
WHERE slug = $9;

-- name: DeleteProduct :exec
DELETE FROM products WHERE id = $1;

-- name: DeleteProductBySlug :exec
DELETE FROM products WHERE slug = $1;

-- name: CountProducts :one
SELECT COUNT(*) FROM products;

-- name: CountProductsByCategory :one
SELECT COUNT(*) FROM products WHERE category_id = $1;
