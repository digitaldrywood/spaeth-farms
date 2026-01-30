-- name: GetContactSubmission :one
SELECT * FROM contact_submissions WHERE id = $1 LIMIT 1;

-- name: ListContactSubmissions :many
SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT $1 OFFSET $2;

-- name: ListUnreadContactSubmissions :many
SELECT * FROM contact_submissions WHERE read = false ORDER BY created_at DESC;

-- name: CreateContactSubmission :one
INSERT INTO contact_submissions (name, email, phone, subject, message)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: MarkContactRead :exec
UPDATE contact_submissions SET read = true WHERE id = $1;

-- name: DeleteContactSubmission :exec
DELETE FROM contact_submissions WHERE id = $1;

-- name: CountUnreadContacts :one
SELECT COUNT(*) FROM contact_submissions WHERE read = false;
