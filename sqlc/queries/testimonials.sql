-- name: GetTestimonial :one
SELECT * FROM testimonials WHERE id = $1 LIMIT 1;

-- name: ListTestimonials :many
SELECT * FROM testimonials ORDER BY created_at DESC;

-- name: ListFeaturedTestimonials :many
SELECT * FROM testimonials WHERE featured = true ORDER BY created_at DESC;

-- name: CreateTestimonial :one
INSERT INTO testimonials (author, location, content, rating, featured)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: UpdateTestimonial :exec
UPDATE testimonials
SET author = $1, location = $2, content = $3, rating = $4, featured = $5
WHERE id = $6;

-- name: DeleteTestimonial :exec
DELETE FROM testimonials WHERE id = $1;
