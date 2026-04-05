#!/usr/bin/env bash
# =============================================================================
# export-pdf.sh — Export a Visual Flow diagram to PDF
#
# Usage:
#   bash scripts/export-pdf.sh <diagram.html> [output.pdf] [--compact]
#
# Options:
#   --compact   Render at 1280×720 instead of 1920×1080 (smaller file size)
#
# What it does:
#   - Starts a local HTTP server (so fonts and assets load correctly)
#   - Opens the diagram in a headless Chromium browser via Playwright
#   - Waits for fonts and animations to settle
#   - Resets the diagram to its initial fit-to-view state (step 0)
#   - Takes a full-viewport screenshot
#   - Saves as PDF and opens the result
#
# Requirements:
#   - Node.js (https://nodejs.org)
#   - Playwright (installed automatically if missing, ~150MB first run)
#
# Notes:
#   - Animations resolve to their visual resting state in the export
#   - Step-through resets to step 0 (diagram shown with all nodes visible)
#   - First run installs Playwright + Chromium (~150MB, one-time download)
# =============================================================================

set -euo pipefail

# ── Helpers ───────────────────────────────────────────────────────────────────
log() { echo "  $*"; }
ok()  { echo "✓ $*"; }
err() { echo "✗ $*" >&2; exit 1; }
hr()  { echo "────────────────────────────────────────────────"; }

hr
echo "  Visual Flow — Export to PDF"
hr

# ── Arguments ─────────────────────────────────────────────────────────────────
if [ $# -lt 1 ]; then
  err "Usage: bash scripts/export-pdf.sh <diagram.html> [output.pdf] [--compact]"
fi

HTML_INPUT="$1"
OUTPUT_PDF=""
COMPACT=false

for arg in "${@:2}"; do
  if [ "$arg" = "--compact" ]; then
    COMPACT=true
  elif [ -z "$OUTPUT_PDF" ]; then
    OUTPUT_PDF="$arg"
  fi
done

# Default output path
if [ -z "$OUTPUT_PDF" ]; then
  BASENAME="$(basename "$HTML_INPUT" .html)"
  OUTPUT_PDF="$(dirname "$HTML_INPUT")/${BASENAME}.pdf"
fi

# Resolve absolute paths
HTML_INPUT="$(cd "$(dirname "$HTML_INPUT")" && pwd)/$(basename "$HTML_INPUT")"
OUTPUT_PDF="$(cd "$(dirname "$OUTPUT_PDF")" && pwd)/$(basename "$OUTPUT_PDF")"

if [ ! -f "$HTML_INPUT" ]; then
  err "HTML file not found: $HTML_INPUT"
fi

ok "Input:  $HTML_INPUT"
ok "Output: $OUTPUT_PDF"
[ "$COMPACT" = true ] && log "Mode: compact (1280×720)" || log "Mode: full (1920×1080)"

# ── Check Node.js ─────────────────────────────────────────────────────────────
if ! command -v node &>/dev/null; then
  err "Node.js is required. Install from https://nodejs.org or: brew install node"
fi
ok "Node.js $(node -v)"

# ── Create temp workspace ─────────────────────────────────────────────────────
TMPDIR="$(mktemp -d)"
trap 'rm -rf "$TMPDIR"' EXIT

# ── Write the Playwright export script ───────────────────────────────────────
cat > "$TMPDIR/export.mjs" << 'PLAYWRIGHT_SCRIPT'
import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFileSync, createReadStream, writeFileSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const htmlPath   = process.argv[2];
const outputPath = process.argv[3];
const compact    = process.argv[4] === '--compact';

const WIDTH  = compact ? 1280 : 1920;
const HEIGHT = compact ? 720  : 1080;
const HTML_DIR = dirname(htmlPath);

// ── MIME types for local asset serving ──────────────────────────────────────
const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.webp': 'image/webp',
  '.gif':  'image/gif',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
  '.ttf':  'font/ttf',
};

// ── Local HTTP server (needed for fonts and relative assets) ─────────────────
const server = createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = join(HTML_DIR, urlPath);

  try {
    const ext  = extname(filePath).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    createReadStream(filePath).pipe(res);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});

// Copy HTML as index.html so server root resolves correctly
const htmlContent = readFileSync(htmlPath, 'utf8');
writeFileSync(join(HTML_DIR, '_vf_index.html'), htmlContent);

await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;
const url  = `http://127.0.0.1:${port}/_vf_index.html`;

// ── Launch headless browser ───────────────────────────────────────────────────
const browser = await chromium.launch();
const page    = await browser.newPage();

await page.setViewportSize({ width: WIDTH, height: HEIGHT });
await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

// Wait for fonts and entrance animations to finish
await page.waitForTimeout(1200);

// Force all animated elements to their final visible state
await page.evaluate(() => {
  // Disable all CSS animations
  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      transition-duration: 0s !important;
    }
  `;
  document.head.appendChild(style);

  // Show all nodes and edges (resolve entrance animations)
  document.querySelectorAll('.node-group, .edge-path, .edge-group').forEach(el => {
    el.style.opacity = '1';
    el.style.strokeDashoffset = '0';
    el.style.transform = '';
  });

  // Reset step-through state
  document.querySelectorAll('[data-step]').forEach(el => {
    el.classList.remove('active-step', 'visited', 'pending');
  });

  // Trigger fit-to-view
  if (typeof fitToView === 'function') fitToView(false);
});

await page.waitForTimeout(300);

// Screenshot and convert to PDF
const screenshotBuf = await page.screenshot({
  fullPage: false,
  type: 'png',
});

// Use Playwright's built-in PDF with the screenshot as background
// For a diagram, a direct PDF from the page is better quality than image-to-PDF
await page.pdf({
  path: outputPath,
  width:  `${WIDTH}px`,
  height: `${HEIGHT}px`,
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});

await browser.close();
server.close();

// Cleanup temp file
import { unlinkSync } from 'fs';
try { unlinkSync(join(process.argv[2].replace(/[^/]+$/, ''), '_vf_index.html')); } catch {}

console.log('EXPORT_DONE:' + outputPath);
PLAYWRIGHT_SCRIPT

# ── Install dependencies ───────────────────────────────────────────────────────
log "Setting up Playwright..."
cd "$TMPDIR"
npm init -y > /dev/null 2>&1
npm install playwright > /dev/null 2>&1 || err "Failed to install Playwright"

# Install Chromium browser if not present
if ! node -e "require('playwright')" 2>/dev/null; then
  err "Playwright install failed. Try: npx playwright install chromium"
fi

log "Installing Chromium (one-time, ~150MB)..."
node -e "
const { chromium } = require('playwright');
chromium.launch().then(b => b.close()).catch(() => {});
" > /dev/null 2>&1 || npx playwright install chromium

ok "Playwright ready"

# ── Run export ────────────────────────────────────────────────────────────────
echo ""
log "Exporting diagram..."

EXPORT_OUTPUT="$(node export.mjs "$HTML_INPUT" "$OUTPUT_PDF" $([ "$COMPACT" = true ] && echo '--compact') 2>&1)" || {
  echo "$EXPORT_OUTPUT"
  err "Export failed. See output above."
}

cd - > /dev/null

# ── Result ─────────────────────────────────────────────────────────────────────
echo ""
hr
if [ -f "$OUTPUT_PDF" ]; then
  FILE_SIZE="$(du -sh "$OUTPUT_PDF" | cut -f1)"
  ok "Exported successfully!"
  echo ""
  echo "  File:  $OUTPUT_PDF"
  echo "  Size:  $FILE_SIZE"
  echo ""
  echo "  Notes:"
  echo "  - Animations show their final visual state (all nodes visible)"
  echo "  - Step-through reset to initial view"
  echo "  - Works in email, Slack, Notion, Google Docs, and print"
  echo ""

  # Warn if file is large
  SIZE_BYTES="$(stat -f%z "$OUTPUT_PDF" 2>/dev/null || stat -c%s "$OUTPUT_PDF" 2>/dev/null || echo 0)"
  if [ "$SIZE_BYTES" -gt 10485760 ] && [ "$COMPACT" = false ]; then
    echo "  ⚠ PDF is larger than 10MB. Run with --compact for a smaller file:"
    echo "    bash scripts/export-pdf.sh $1 [output.pdf] --compact"
    echo ""
  fi

  # Open the PDF
  if command -v open &>/dev/null; then
    open "$OUTPUT_PDF"
  elif command -v xdg-open &>/dev/null; then
    xdg-open "$OUTPUT_PDF"
  fi
else
  err "Output file not created. Export may have failed silently."
fi
hr
