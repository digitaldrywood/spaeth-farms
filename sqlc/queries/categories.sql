-- name: GetCategory :one
SELECT * FROM categories WHERE id = $1 LIMIT 1;

-- name: ListCategories :many
SELECT * FROM categories ORDER BY sort_order, name;

-- name: CreateCategory :one
INSERT INTO categories (id, name, description, sort_order)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: UpdateCategory :exec
UPDATE categories
SET name = $1, description = $2, sort_order = $3
WHERE id = $4;

-- name: DeleteCategory :exec
DELETE FROM categories WHERE id = $1;
