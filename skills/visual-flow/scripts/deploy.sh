#!/usr/bin/env bash
# =============================================================================
# deploy.sh — Deploy a Visual Flow diagram to Vercel
#
# Usage:
#   bash scripts/deploy.sh <path-to-diagram.html>
#   bash scripts/deploy.sh <path-to-folder-with-index.html>
#
# What it does:
#   - Accepts a single HTML file or a folder containing index.html
#   - If a single HTML file: creates a temp deploy directory, copies it as
#     index.html, and bundles any locally-referenced image/asset files
#   - Deploys to Vercel (free tier) and prints the live URL
#
# Requirements:
#   - Node.js (https://nodejs.org)
#   - Vercel CLI (installed automatically if missing)
# =============================================================================

set -euo pipefail

# ── Helpers ──────────────────────────────────────────────────────────────────
log()  { echo "  $*"; }
ok()   { echo "✓ $*"; }
err()  { echo "✗ $*" >&2; exit 1; }
hr()   { echo "────────────────────────────────────────────────"; }

hr
echo "  Visual Flow — Deploy to Vercel"
hr

# ── Argument validation ───────────────────────────────────────────────────────
if [ $# -lt 1 ]; then
  err "Usage: bash scripts/deploy.sh <diagram.html or folder>"
fi

INPUT="$1"

if [ ! -e "$INPUT" ]; then
  err "Not found: $INPUT"
fi

# ── Determine deploy directory ────────────────────────────────────────────────
CLEANUP_TMPDIR=false
DEPLOY_DIR=""

if [ -d "$INPUT" ]; then
  # Folder input — deploy as-is
  if [ ! -f "$INPUT/index.html" ]; then
    err "Folder must contain an index.html file: $INPUT"
  fi
  DEPLOY_DIR="$INPUT"
  ok "Deploying folder: $DEPLOY_DIR"

elif [ -f "$INPUT" ]; then
  # Single HTML file — create temp directory and bundle assets
  TMPDIR="$(mktemp -d)"
  CLEANUP_TMPDIR=true
  cp "$INPUT" "$TMPDIR/index.html"
  ok "Copied $INPUT → $TMPDIR/index.html"

  # Extract referenced src/href assets from the HTML and copy them over
  log "Scanning for referenced assets..."
  ASSET_COUNT=0
  INPUT_DIR="$(dirname "$INPUT")"

  while IFS= read -r asset; do
    # Skip external URLs, data URIs, and empty strings
    [[ "$asset" =~ ^https?:// ]] && continue
    [[ "$asset" =~ ^data: ]]     && continue
    [[ -z "$asset" ]]            && continue

    ASSET_PATH="$INPUT_DIR/$asset"
    if [ -f "$ASSET_PATH" ]; then
      ASSET_DEST_DIR="$TMPDIR/$(dirname "$asset")"
      mkdir -p "$ASSET_DEST_DIR"
      cp "$ASSET_PATH" "$ASSET_DEST_DIR/"
      ASSET_COUNT=$((ASSET_COUNT + 1))
    fi
  done < <(
    grep -oE '(src|href)="[^"]*"' "$INPUT" \
      | sed 's/.*="\(.*\)"/\1/' \
      | grep -v '^#'
  )

  if [ "$ASSET_COUNT" -gt 0 ]; then
    ok "Bundled $ASSET_COUNT asset(s)"
  else
    log "No local assets detected (self-contained HTML)"
  fi

  DEPLOY_DIR="$TMPDIR"
else
  err "Input must be an HTML file or a folder: $INPUT"
fi

# ── Check Node.js ─────────────────────────────────────────────────────────────
if ! command -v node &> /dev/null; then
  echo ""
  echo "  Node.js is required but not installed."
  echo "  Install it from https://nodejs.org or run: brew install node"
  echo ""
  [ "$CLEANUP_TMPDIR" = true ] && rm -rf "$TMPDIR"
  exit 1
fi
ok "Node.js $(node -v)"

# ── Check / install Vercel CLI ────────────────────────────────────────────────
if ! npx vercel --version &> /dev/null 2>&1; then
  log "Installing Vercel CLI..."
  npm install -g vercel || err "Failed to install Vercel CLI"
fi
ok "Vercel CLI ready"

# ── Check login ───────────────────────────────────────────────────────────────
echo ""
if ! npx vercel whoami &> /dev/null 2>&1; then
  echo "  You're not logged in to Vercel."
  echo ""
  echo "  Steps to get a free account:"
  echo "  1. Go to https://vercel.com/signup in your browser"
  echo "  2. Sign up with GitHub, Google, or email"
  echo "  3. Run:  npx vercel login"
  echo "  4. Then re-run this script"
  echo ""
  [ "$CLEANUP_TMPDIR" = true ] && rm -rf "$TMPDIR"
  exit 1
fi

VERCEL_USER="$(npx vercel whoami 2>/dev/null)"
ok "Logged in as: $VERCEL_USER"

# ── Derive project name from input filename ───────────────────────────────────
BASENAME="$(basename "$INPUT" .html)"
PROJECT_NAME="$(echo "$BASENAME" \
  | tr '[:upper:]' '[:lower:]' \
  | sed 's/[^a-z0-9-]/-/g' \
  | sed 's/--*/-/g' \
  | sed 's/^-//' \
  | sed 's/-$//' \
  | cut -c1-100)"

[ -z "$PROJECT_NAME" ] && PROJECT_NAME="visual-flow-diagram"
log "Project name: $PROJECT_NAME"

# ── Deploy ────────────────────────────────────────────────────────────────────
echo ""
log "Deploying to Vercel..."
echo ""

DEPLOY_OUTPUT="$(npx vercel deploy "$DEPLOY_DIR" \
  --yes \
  --prod \
  --name "$PROJECT_NAME" \
  2>&1)"

LIVE_URL="$(echo "$DEPLOY_OUTPUT" | grep -oE 'https://[a-zA-Z0-9._/-]+\.vercel\.app' | tail -1)"

# ── Cleanup ───────────────────────────────────────────────────────────────────
[ "$CLEANUP_TMPDIR" = true ] && rm -rf "$TMPDIR"

# ── Result ────────────────────────────────────────────────────────────────────
echo ""
hr
if [ -n "$LIVE_URL" ]; then
  ok "Deployed successfully!"
  echo ""
  echo "  Live URL:  $LIVE_URL"
  echo ""
  echo "  - Works on any device (phone, tablet, laptop)"
  echo "  - Share it via Slack, email, or direct link"
  echo "  - To take it down: https://vercel.com/dashboard → delete the project"
  echo "  - To redeploy (same URL): run this script again"
else
  echo "  Deploy output:"
  echo "$DEPLOY_OUTPUT"
  err "Could not extract live URL. Check output above."
fi
hr
