# Flow Presets

10 curated visual styles for interactive diagrams. Each preset defines colors, typography, node shapes, edge styles, and signature design elements.

---

## Preset Index

| # | Name | Theme | Best For |
|---|---|---|---|
| 1 | Blueprint Grid | Dark navy + cyan technical grid | Architecture, system design |
| 2 | Terminal Trace | Monochrome terminal green | Sequence, algorithm flowcharts |
| 3 | Electric Graph | High-contrast black + electric accent | Any type, bold presentations |
| 4 | Neon Network | Dark with vibrant neon edges | Architecture, state machines |
| 5 | Paper Board | Light whiteboard + hand-drawn feel | Business process, swimlanes |
| 6 | Clarity Light | Minimal light with strong typography | Any type, documentation |
| 7 | Swiss Grid | Bauhaus-inspired red/black/white | Flowcharts, decision trees |
| 8 | Organic Ink | Warm cream with brushstroke detail | Mind maps, concept diagrams |
| 9 | Retro Flow | Amber terminal / vintage computer | Sequence, state machines |
| 10 | Pastel Canvas | Soft pastel nodes, playful spacing | Process flows, user journeys |

---

## Preset Specifications

---

### 1. Blueprint Grid

**Character:** Engineering precision. Feels like a technical schematic pulled from a drafting application.

**Colors:**
```css
--bg: #0d1b2a;
--bg-secondary: #1a2d42;
--grid-line: rgba(0, 180, 255, 0.08);
--node-fill: #0f2a3d;
--node-stroke: #00b4ff;
--node-stroke-width: 1.5px;
--edge-color: #0096cc;
--edge-width: 1.5px;
--label-color: #e0f4ff;
--accent: #00e5ff;
--decision-fill: #0a1f30;
--decision-stroke: #00e5ff;
--end-fill: #003d5c;
--shadow: drop-shadow(0 0 8px rgba(0,180,255,0.3));
```

**Typography:**
- Primary: `JetBrains Mono` (Google Fonts)
- Node labels: `font-size: 11px; letter-spacing: 0.05em; text-transform: uppercase`
- Edge labels: `font-size: 10px; fill: #0096cc`

**Background:** Blueprint grid pattern — fine cyan lines at 30px intervals, stronger lines at 150px
```css
background-image:
  linear-gradient(rgba(0,180,255,0.06) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0,180,255,0.06) 1px, transparent 1px),
  linear-gradient(rgba(0,180,255,0.02) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0,180,255,0.02) 1px, transparent 1px);
background-size: 150px 150px, 150px 150px, 30px 30px, 30px 30px;
```

**Node shapes:** Sharp corners, no border-radius. Decision = clean diamond. Process = rectangle.

**Signature element:** Node labels prefixed with type tag: `[SVC]`, `[DB]`, `[GW]` in accent color for architecture diagrams.

**Edge style:** Straight orthogonal lines (right-angle routing). No curves.

**Active step color:** `#00e5ff` with glow `drop-shadow(0 0 12px #00e5ff)`

---

### 2. Terminal Trace

**Character:** Developer tool aesthetics. Sequence of events reads like console output.

**Colors:**
```css
--bg: #0d0d0d;
--bg-secondary: #141414;
--node-fill: #1a1a1a;
--node-stroke: #3d9970;
--node-stroke-width: 1px;
--edge-color: #2ecc71;
--edge-width: 1px;
--label-color: #e0ffe0;
--accent: #2ecc71;
--decision-fill: #0f1f15;
--decision-stroke: #27ae60;
--dim: #555;
--glow: drop-shadow(0 0 6px #2ecc7166);
```

**Typography:**
- Primary: `JetBrains Mono` (Google Fonts)
- Node labels: `font-size: 12px; fill: #a8ffb0`
- Edge labels: `font-size: 10px; fill: #2ecc71; font-style: italic`

**Background:** Pure black with very subtle scanline texture
```css
background: repeating-linear-gradient(
  0deg,
  transparent,
  transparent 2px,
  rgba(0, 255, 70, 0.012) 2px,
  rgba(0, 255, 70, 0.012) 4px
);
```

**Node shapes:** All nodes are rectangles with `rx="2"`. Start node has double border (two concentric rects). End node is filled solid.

**Signature element:** A persistent "cursor" `_` blinking at the bottom of the diagram, plus a subtle `>` prefix on process node labels.

**Edge style:** Straight lines with dashed style for conditional branches (`stroke-dasharray: 4 3`).

**Active step color:** Node fill becomes `#0d2a1a`, stroke becomes `#2ecc71` with glow. A small `●` appears left of the label.

---

### 3. Electric Graph

**Character:** Bold, assertive, minimal. The diagram commands attention.

**Colors:**
```css
--bg: #0a0a0a;
--node-fill: #111;
--node-stroke: #f0f0f0;
--node-stroke-width: 2px;
--edge-color: #f0f0f0;
--edge-width: 2px;
--label-color: #ffffff;
--accent: #f7c325;
--decision-fill: #0a0a0a;
--decision-stroke: #f7c325;
--end-fill: #f7c325;
--end-label: #000;
```

**Typography:**
- Primary: `Archivo Black` (Google Fonts, weight 900)
- Node labels: `font-size: 13px; font-weight: 700; letter-spacing: -0.02em`
- Edge labels: `font-size: 11px; fill: #f7c325; font-family: 'Archivo Black'`

**Background:** Solid near-black `#0a0a0a`. No texture.

**Node shapes:** Process nodes: sharp rectangles (no border radius). Decision: diamond with thick stroke. End nodes: yellow-filled rectangle with black text.

**Signature element:** A thick yellow horizontal rule at the top of the diagram (`<line y1="0" y2="0" stroke="#f7c325" stroke-width="4">`), and a small legend panel in bottom-left corner.

**Edge style:** Thick straight lines. No curves. Branch labels get a yellow pill background.

**Active step color:** Node fill flips to white, label flips to black. Bold contrast inversion.

---

### 4. Neon Network

**Character:** Cyber / data flow. Feels like visualizing live system traffic.

**Colors:**
```css
--bg: #080b14;
--node-fill: rgba(10, 15, 30, 0.9);
--node-stroke: #7b2fff;
--node-stroke-width: 1.5px;
--edge-color: #7b2fff;
--edge-width: 1.5px;
--label-color: #e8e0ff;
--accent-primary: #7b2fff;
--accent-secondary: #00f5d4;
--accent-tertiary: #ff3864;
--decision-stroke: #00f5d4;
--database-stroke: #ff3864;
--glow-purple: drop-shadow(0 0 10px #7b2fff88);
--glow-teal: drop-shadow(0 0 10px #00f5d488);
```

**Typography:**
- Primary: `Syne` (Google Fonts)
- Node labels: `font-size: 12px; letter-spacing: 0.08em`
- Edge labels: `font-size: 10px; fill: #00f5d4`

**Background:** Deep space with radial gradient and subtle star-field (small white dots scattered via SVG pattern)
```css
background: radial-gradient(ellipse at 50% 30%, #0d1030 0%, #050810 70%);
```

**Node shapes:** Rounded rectangles (`rx="6"`). Node type determines stroke color: process=purple, decision=teal, database=red/pink. Faint inner glow on all nodes.

**Signature element:** Animated "data particles" that travel along edges during step-through — small circles that follow the path using SVG `animateMotion`.

**Edge style:** Glowing bezier curves. Thickness increases during active step.

**Active step color:** Node gets full glow. Edge particles begin traveling. Pulse rings expand from active node.

---

### 5. Paper Board

**Character:** Collaborative whiteboard. Feels like a team session where someone drew this out.

**Colors:**
```css
--bg: #f5f0e8;
--paper: #faf7f2;
--node-fill: #ffffff;
--node-stroke: #2d2d2d;
--node-stroke-width: 2px;
--edge-color: #2d2d2d;
--edge-width: 2px;
--label-color: #1a1a1a;
--accent: #e74c3c;
--sticky-yellow: #fff9c4;
--sticky-blue: #e3f2fd;
--sticky-green: #e8f5e9;
--shadow: drop-shadow(2px 3px 0px rgba(0,0,0,0.15));
```

**Typography:**
- Primary: `Nunito` (Google Fonts, weight 600)
- Node labels: `font-size: 13px; font-weight: 600`
- Edge labels: `font-size: 11px; fill: #555; font-style: italic`

**Background:** Warm cream with a subtle dot grid
```css
background-color: #f5f0e8;
background-image: radial-gradient(circle, #bbb 1px, transparent 1px);
background-size: 24px 24px;
```

**Node shapes:** Process nodes look like sticky notes — slightly rotated (±1-2°), drop shadow, rounded `rx="4"`. Decision nodes: diamond with thick sketch-like stroke. Each node category gets a different pastel fill.

**Signature element:** A "hand-drawn" aesthetic on edges — edges use a slightly wobbly SVG path (±2px noise on control points) to feel human-made. Nodes have a subtle drop shadow offset (2px 3px).

**Edge style:** Thick (2px) black lines with large arrow markers. Curved beziers with visible control handles implied by the curve.

**Active step color:** Node gets a bright red `#e74c3c` border and a small animated circle indicator in top-right corner.

---

### 6. Clarity Light

**Character:** Clean, documentation-grade. Would look at home in a Notion page or technical spec.

**Colors:**
```css
--bg: #ffffff;
--bg-secondary: #f8f9fa;
--node-fill: #f1f3f5;
--node-stroke: #adb5bd;
--node-stroke-width: 1px;
--edge-color: #6c757d;
--edge-width: 1.5px;
--label-color: #212529;
--accent: #228be6;
--decision-fill: #fff3bf;
--decision-stroke: #f59f00;
--end-fill: #d3f9d8;
--end-stroke: #2f9e44;
--shadow: drop-shadow(0 1px 3px rgba(0,0,0,0.12));
```

**Typography:**
- Primary: `DM Sans` (Google Fonts)
- Node labels: `font-size: 13px; font-weight: 500`
- Edge labels: `font-size: 11px; fill: #6c757d`

**Background:** Pure white. Optional light gray for swimlane/cluster backgrounds.

**Node shapes:** Gently rounded (`rx="6"`). Each node type has a distinct fill: process=gray, decision=yellow, start=blue, end=green. Very subtle drop shadow.

**Signature element:** A compact legend in the top-right corner showing node types with colored swatches, and a small badge showing node count.

**Edge style:** Light gray arrows, thin, with small arrowheads. Branch condition labels in blue.

**Active step color:** Node border becomes `#228be6` (2px), label becomes bold. A progress indicator below the diagram shows current step / total.

---

### 7. Swiss Grid

**Character:** Bauhaus / International Style. Geometry, discipline, and bold use of red.

**Colors:**
```css
--bg: #f5f5f0;
--node-fill: #ffffff;
--node-stroke: #111111;
--node-stroke-width: 2.5px;
--edge-color: #111111;
--edge-width: 2px;
--label-color: #111111;
--accent: #e63946;
--grid-line: rgba(0,0,0,0.06);
--decision-fill: #e63946;
--decision-label: #ffffff;
--end-fill: #111111;
--end-label: #ffffff;
```

**Typography:**
- Primary: `Archivo` (Google Fonts, weight 700/900)
- Node labels: `font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase`
- Edge labels: `font-size: 10px; font-weight: 700; fill: #e63946`

**Background:** Off-white with a visible structural grid
```css
background-color: #f5f5f0;
background-image:
  linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
background-size: 40px 40px;
```

**Node shapes:** Pure rectangles — no border radius, no softness. Decision nodes: red-filled diamond with white text. End nodes: black-filled rectangle.

**Signature element:** Asymmetric title bar anchored to the top-left of the diagram canvas — a thick red horizontal bar with the diagram title in black Archivo Black.

**Edge style:** Strict orthogonal routing (horizontal/vertical only, no diagonals). Clean, geometric.

**Active step color:** Node gets a thick red (4px) border. Step counter appears in top-right corner: `3 / 12` in bold red.

---

### 8. Organic Ink

**Character:** Handcrafted, warm, and inviting. Best for concept maps and mind maps.

**Colors:**
```css
--bg: #fdf6e3;
--node-fill: #fffbf0;
--node-stroke: #5c4a1e;
--node-stroke-width: 2px;
--edge-color: #8b6914;
--edge-width: 2px;
--label-color: #3d2b0a;
--accent: #c0392b;
--accent-secondary: #27ae60;
--accent-tertiary: #2980b9;
--shadow: drop-shadow(1px 2px 4px rgba(92,74,30,0.2));
```

**Typography:**
- Primary: `Lora` (Google Fonts, weight 400/700)
- Secondary: `Merriweather` for larger labels
- Node labels: `font-size: 13px; font-weight: 400; font-style: italic`
- Edge labels: `font-size: 11px; fill: #8b6914`

**Background:** Warm cream with a very subtle paper texture (SVG noise filter with `feTurbulence`)

**Node shapes:** Organic, soft ellipses for mind map nodes. Blob-like irregular shapes using `<path>` with bezier curves for main concept nodes. Each branch level gets a different accent color.

**Signature element:** Branch colors cascade — root node is warm brown, first level branches each pick from `[#c0392b, #27ae60, #2980b9, #8e44ad, #d35400]`. All child nodes inherit their parent branch's color.

**Edge style:** Organic curved paths that bow outward from center. Thickness tapers: thicker near root (3px), thinner toward leaves (1px).

**Active step color:** Node gains a warm gold glow. The branch from root to active node is highlighted in its branch color.

---

### 9. Retro Flow

**Character:** Vintage terminal / amber-phosphor monitor from the 1980s. Nostalgic developer aesthetic.

**Colors:**
```css
--bg: #1a0f00;
--node-fill: #1a0f00;
--node-stroke: #ff8c00;
--node-stroke-width: 1.5px;
--edge-color: #cc7000;
--edge-width: 1.5px;
--label-color: #ffa040;
--accent: #ffb347;
--dim: #774400;
--glow: drop-shadow(0 0 8px #ff8c0066);
```

**Typography:**
- Primary: `Courier Prime` (Google Fonts)
- Node labels: `font-size: 12px; letter-spacing: 0.1em; fill: #ffa040`
- Edge labels: `font-size: 10px; fill: #cc7000`

**Background:** Near-black with amber scanline texture
```css
background-color: #1a0f00;
background-image: repeating-linear-gradient(
  0deg,
  transparent,
  transparent 3px,
  rgba(255, 140, 0, 0.015) 3px,
  rgba(255, 140, 0, 0.015) 4px
);
```

**Node shapes:** Process: simple rectangles, no radius. Decision: `<>` angle-bracket style (wider diamond). Start/end: double-bordered oval.

**Signature element:** A retro title bar across the top: `[PROCESS FLOW v1.0]` with blinking cursor. Nodes show their IDs in small text above (like old-school BASIC line numbers: `10`, `20`, `30`…).

**Edge style:** Dashed for all conditional branches (`stroke-dasharray: 6 3`). Solid for main flow.

**Active step color:** Node glows amber, edges flash briefly white before settling amber. Cursor blinks at active node.

---

### 10. Pastel Canvas

**Character:** Friendly, modern, approachable. Great for user journeys and onboarding flows.

**Colors:**
```css
--bg: #fafafa;
--node-process: #dbeafe;
--node-process-stroke: #3b82f6;
--node-decision: #fef9c3;
--node-decision-stroke: #eab308;
--node-start: #dcfce7;
--node-start-stroke: #22c55e;
--node-end: #fce7f3;
--node-end-stroke: #ec4899;
--node-database: #ede9fe;
--node-database-stroke: #8b5cf6;
--edge-color: #94a3b8;
--edge-width: 2px;
--label-color: #1e293b;
--accent: #3b82f6;
--shadow: drop-shadow(0 2px 8px rgba(0,0,0,0.08));
```

**Typography:**
- Primary: `Plus Jakarta Sans` (Google Fonts, weight 500/600)
- Node labels: `font-size: 13px; font-weight: 500`
- Edge labels: `font-size: 11px; fill: #64748b; font-weight: 600`

**Background:** White or very light gray `#fafafa`.

**Node shapes:** Pill-shaped rectangles (`rx="24"`). Bold, large border-radius makes them feel tactile and friendly. Drop shadow for depth.

**Signature element:** Each node type gets its own pastel fill AND matching border color (see CSS vars above). The color legend in the corner uses matching pastel pills — visually cohesive.

**Edge style:** Light gray lines with large, rounded arrowheads. Bezier curves for all edges.

**Active step color:** Node scales up slightly (1.04x transform), shadow deepens. Connecting edges animate to the node's accent color.

---

## Font Pairings Reference

| Preset | Primary Font | Weight Usage | Load URL |
|---|---|---|---|
| Blueprint Grid | JetBrains Mono | 400, 700 | Google Fonts |
| Terminal Trace | JetBrains Mono | 400 | Google Fonts |
| Electric Graph | Archivo Black | 900 | Google Fonts |
| Neon Network | Syne | 400, 700 | Google Fonts |
| Paper Board | Nunito | 600, 700 | Google Fonts |
| Clarity Light | DM Sans | 400, 500, 700 | Google Fonts |
| Swiss Grid | Archivo | 700, 900 | Google Fonts |
| Organic Ink | Lora | 400, 700 | Google Fonts |
| Retro Flow | Courier Prime | 400 | Google Fonts |
| Pastel Canvas | Plus Jakarta Sans | 500, 600 | Google Fonts |

---

## DO NOT USE

- **System fonts:** Arial, Helvetica, Times New Roman, sans-serif fallback as primary
- **Generic grays:** `#999`, `#ccc`, `#333` as primary colors (fine as secondary/muted)
- **Default SVG colors:** `stroke="black"`, `fill="blue"` without CSS variables
- **Purple-on-white:** The most overused AI-generated diagram color scheme
- **Mermaid default aesthetic:** Square gray nodes with thin default arrows
- **Uniform node colors:** Every node the same fill regardless of type

## CSS Gotchas for SVG

- SVG `filter` values do not support direct negation: use `calc(-1 * value)` not `-value`
- `stroke-dashoffset` animation requires `pathLength="1"` on the `<path>` for normalized values
- SVG `<text>` elements don't wrap — use `<foreignObject>` for multi-line labels, or manually split with `<tspan>` elements
- `pointer-events: none` on `<g>` is inherited — set `pointer-events: all` explicitly on interactive child elements
- Fonts loaded via `@import` in SVG `<style>` do not always load in exported screenshots — embed font declarations in the HTML `<head>` instead
