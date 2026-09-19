#!/usr/bin/env bash
# Rebuilds the optimised image set in assets/ from the source ParkEase repository.
#
#   ./tools/build-assets.sh /path/to/ParkEase-Smart-Parking
#
# Every output traces to a real screenshot committed in that repository. Nothing is
# generated or synthesised. Requires ImageMagick (`convert`).
#
# Outputs: a 1400px WebP for lightbox viewing and a 700px WebP thumbnail per shot.

set -euo pipefail

SRC="${1:-/tmp/audit/ParkEase-Smart-Parking}/imagess"
OUT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/assets/parkease"

[ -d "$SRC" ] || { echo "source not found: $SRC" >&2; exit 1; }
command -v convert >/dev/null || { echo "ImageMagick 'convert' is required" >&2; exit 1; }
mkdir -p "$OUT"

# full <src> <name> [gravity] — wide view + thumbnail.
#
# The thumbnail keeps the screenshot's own aspect ratio and is only capped in
# height. An earlier version forced every thumb to 700x440, which cropped the
# taller pages down to their top strip (user-reports lost roughly 80% of its
# height) and made the grid show chrome instead of the actual UI.
full() {
  local src="$SRC/$1" name="$2" grav="${3:-north}"
  convert "$src" -resize '1400x>' -strip -quality 80 "$OUT/$name.webp"
  convert "$src" -resize '700x' -gravity "$grav" -crop '700x560+0+0' +repage \
          -strip -quality 80 "$OUT/$name-thumb.webp"
  printf '  %-22s %s (thumb %s)\n' "$name" \
    "$(identify -format '%wx%h' "$OUT/$name.webp")" \
    "$(identify -format '%wx%h' "$OUT/$name-thumb.webp")"
}

# crop <src> <name> <WxH+X+Y> — crop first (used to strip mailbox chrome from email proof).
crop() {
  local src="$SRC/$1" name="$2" geom="$3"
  convert "$src" -crop "$geom" +repage -resize '1200x>' -strip -quality 82 "$OUT/$name.webp"
  printf '  %-22s %s\n' "$name" "$(identify -format '%wx%h' "$OUT/$name.webp")"
}

echo "Building ParkEase assets -> $OUT"

full landing-page.png        landing
full login-page.png          login
full user-dashboard.png      user-dashboard
full user-find-parking.png   find-parking
full user-my-bookings.png    my-bookings
full admin-dashboard.png     admin-dashboard
full parking-lot.png         parking-lots
full manage-user.png         manage-users
full user-reports.png        user-reports

# Diagrams keep their full height (no thumbnail crop).
convert "$SRC/ER.jpg"  -resize '1200x>' -strip -quality 88 "$OUT/er-diagram.webp"
convert "$SRC/DFD.jpg" -resize '900x>'  -strip -quality 88 "$OUT/dfd.webp"
printf '  %-22s %s\n' er-diagram "$(identify -format '%wx%h' "$OUT/er-diagram.webp")"
printf '  %-22s %s\n' dfd        "$(identify -format '%wx%h' "$OUT/dfd.webp")"

# Email proof: crop to the message body so no personal mailbox data is published.
crop booking-cnf.png    email-booking  '1085x460+230+105'
crop booking-end.png    email-release  '1085x430+230+105'
crop monthly-report.png email-monthly  '1015x545+293+105'

echo "Done. Total: $(du -sh "$OUT" | cut -f1)"
