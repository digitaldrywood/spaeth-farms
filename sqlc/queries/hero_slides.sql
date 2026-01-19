-- name: GetHeroSlide :one
SELECT * FROM hero_slides WHERE id = $1 LIMIT 1;

-- name: ListHeroSlides :many
SELECT * FROM hero_slides ORDER BY sort_order;

-- name: ListActiveHeroSlides :many
SELECT * FROM hero_slides WHERE active = true ORDER BY sort_order;

-- name: CreateHeroSlide :one
INSERT INTO hero_slides (image, alt_text, sort_order, active)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: UpdateHeroSlide :exec
UPDATE hero_slides
SET image = $1, alt_text = $2, sort_order = $3, active = $4
WHERE id = $5;

-- name: DeleteHeroSlide :exec
DELETE FROM hero_slides WHERE id = $1;
