-- name: GetSetting :one
SELECT * FROM site_settings WHERE key = $1 LIMIT 1;

-- name: ListSettings :many
SELECT * FROM site_settings ORDER BY key;

-- name: UpsertSetting :exec
INSERT INTO site_settings (key, value, updated_at)
VALUES ($1, $2, CURRENT_TIMESTAMP)
ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP;

-- name: DeleteSetting :exec
DELETE FROM site_settings WHERE key = $1;
