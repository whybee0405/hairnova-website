#!/bin/sh
set -e

DATA_DIR="${DATA_DIR:-/app/data}"
DB_FILE="$DATA_DIR/hairnova.db"
MEDIA_SUBDIR="$DATA_DIR/media"

mkdir -p "$MEDIA_SUBDIR"

# First boot against a fresh volume: seed it from the snapshot baked into the
# image. Never touches an existing db, so admin edits and leads persist
# across image rebuilds and redeploys.
if [ ! -f "$DB_FILE" ]; then
  echo "[entrypoint] No existing database at $DB_FILE, seeding from image snapshot..."
  cp /app/seed-data/hairnova.db "$DB_FILE"
  cp -r /app/seed-data/media/. "$MEDIA_SUBDIR/"
  echo "[entrypoint] Seed complete."
else
  echo "[entrypoint] Existing database found at $DB_FILE, skipping seed."
fi

export DATABASE_URI="file:$DB_FILE"
export MEDIA_DIR="$MEDIA_SUBDIR"

exec "$@"
