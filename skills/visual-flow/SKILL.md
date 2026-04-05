# Visual Flow

Generate interactive, animated process flow diagrams from plain text descriptions or rough drafts — as self-contained, zero-dependency HTML files.

inspired by https://github.com/zarazhangrui/frontend-slides

## Core Principles

1. **Zero Dependencies** — Single HTML files with inline SVG, CSS, and JS. No Mermaid.js, no D3.js, no build tools.
2. **Parse, Don't Just Render** — Intelligently interpret user intent from natural language, ASCII art, and shorthand notation.
3. **Interaction First** — Every diagram is interactive by default: animated step-through, hover tooltips, zoom/pan, clickable nodes.
4. **Fit-to-View** — The diagram initializes centered and scaled to fit the viewport, with smooth zoom/pan for larger graphs.
5. **Distinctive Aesthetics** — No default-mermaid-gray outputs. Every diagram must feel deliberately designed.

## Supported Diagram Types

| Type | Description | Use When |
|---|---|---|
| **Flowchart** | Decisions, branches, process steps | Logic flows, algorithms, decision trees |
| **Sequence** | Actors exchanging messages over time | API flows, user journeys, protocol diagrams |
| **Architecture** | Components/services and their connections | System design, microservices, data pipelines |
| **State Machine** | States and labeled transitions | Auth flows, UI states, lifecycle diagrams |
| **Swimlane** | Multi-actor process with parallel paths | Business processes, cross-team workflows |
| **Mind Map** | Central idea radiating to subtopics | Concept maps, brainstorming, hierarchies |

---

## Phase 0: Detect Mode

Determine what the user wants:

- **Mode A: New Diagram** — From text description or topic. Go to Phase 1.
- **Mode B: Convert Draft** — User provides ASCII, markdown, or rough sketch notes. Go to Phase 1 (skip content question).
- **Mode C: Enhance** — Improve an existing HTML diagram. Read it, understand it, enhance. Follow Mode C rules.

### Mode C: Modification Rules

1. Before adding nodes: count existing nodes, check layout density
2. Adding nodes to complex diagrams (20+): ask which cluster/group they belong to
3. After modification: verify all edges still route correctly, no overlapping labels
4. If the layout becomes too crowded: offer to split into two diagrams (overview + detail)

---

## Phase 1: Content Discovery

**Ask ALL questions in a single AskUserQuestion call.**

**Question 1 — Type** (header: "Diagram Type"):
What kind of flow are you visualizing?
Options: Flowchart / Sequence Diagram / System Architecture / State Machine / Swimlane Process / Mind Map

**Question 2 — Complexity** (header: "Size"):
Roughly how many nodes or steps?
Options: Small (under 10) / Medium (10–20) / Large (20+)

**Question 3 — Interactivity** (header: "Interactivity"):
What interactions do you want?
Options:
- Animated step-through (press Play to walk through the flow step by step)
- Clickable nodes (click to expand details/description)
- Both (recommended)
- Hover tooltips only

**Question 4 — Content** (header: "Content"):
Share your description, rough draft, or topic:
Options: I'll type it below / Topic only (generate example content)

If user selects "Topic only", generate a realistic, illustrative example for that diagram type.

---

## Phase 2: Style Discovery

**This is the "show, don't tell" phase.** Generate 3 distinct single-diagram HTML previews, each showing a small sample graph (3–4 nodes) in different aesthetics.

### Step 2.1: Mood Selection

Ask (header: "Vibe", multiSelect: true, max 2):
What feeling should the diagram convey?
Options:
- Technical/Precise — Clean lines, monospace fonts, developer-friendly
- Bold/Dynamic — High contrast, energetic, confident
- Calm/Organized — Readable, structured, business-appropriate
- Creative/Expressive — Distinctive, personality-driven, memorable

### Step 2.2: Generate 3 Previews

Based on mood and diagram type, select 3 presets from [FLOW_PRESETS.md](FLOW_PRESETS.md) and generate preview HTML files.

| Mood | Suggested Presets |
|---|---|
| Technical/Precise | Blueprint Grid, Terminal Trace, Circuit Dark |
| Bold/Dynamic | Electric Graph, Neon Network, Voltage Dark |
| Calm/Organized | Paper Board, Clarity Light, Swiss Grid |
| Creative/Expressive | Organic Ink, Pastel Canvas, Retro Flow |

Save previews to `.claude-design/flow-previews/` (style-a.html, style-b.html, style-c.html).
Each should be ~60–80 lines, self-contained, showing a 3-node sample of the requested diagram type.
Open each preview automatically.

### Step 2.3: User Picks

Ask (header: "Style"):
Which style preview do you prefer?
Options: Style A: [Name] / Style B: [Name] / Style C: [Name] / Mix elements

---

## Phase 3: Parse & Generate

### Step 3.1: Parse User Input

**Before generating SVG, extract a graph data structure:**

```
graph = {
  nodes: [ { id, label, type, description? } ],
  edges: [ { from, to, label? } ],
  type: "flowchart" | "sequence" | "architecture" | "state" | "swimlane" | "mindmap",
  groups?: [ { id, label, nodeIds[] } ]   // for architecture/swimlane
}
```

**Parsing Rules:**

Arrow notation — all of these mean directed edge:
- `→`, `->`, `=>`, `-->`, `—>`, `to`, `leads to`, `then`

Node type detection:
- `start`, `begin`, `initial`, `entry` → type: `"start"` (oval/circle)
- `end`, `done`, `finish`, `complete`, `exit`, `return` → type: `"end"` (oval/circle)
- `if`, `check`, `decide`, `condition`, `validate`, `<...>`, `[...?]` → type: `"decision"` (diamond)
- `database`, `db`, `store`, `storage`, `cache` → type: `"database"` (cylinder)
- `queue`, `topic`, `event`, `stream` → type: `"queue"` (hexagon)
- `user`, `client`, `actor`, `person` → type: `"actor"` (person icon or bold oval)
- everything else → type: `"process"` (rectangle with rounded corners)

Edge label detection:
- Text between `[yes]`, `[no]`, `(success)`, `(failure)` → edge label
- Text after a colon on an arrow line → edge label
- `if true/false`, `on success/failure`, `yes/no` → edge label

**Example parse:**

Input:
```
User logs in → Validate credentials → if valid: update session → redirect to dashboard
                                     → if invalid: increment fail count → if > 3 attempts: lock account → show lockout
                                                                        → show error
```

Output graph:
```json
{
  "nodes": [
    { "id": "n1", "label": "User logs in", "type": "start" },
    { "id": "n2", "label": "Validate credentials", "type": "process" },
    { "id": "n3", "label": "Valid?", "type": "decision" },
    { "id": "n4", "label": "Update session", "type": "process" },
    { "id": "n5", "label": "Redirect to dashboard", "type": "end" },
    { "id": "n6", "label": "Increment fail count", "type": "process" },
    { "id": "n7", "label": "> 3 attempts?", "type": "decision" },
    { "id": "n8", "label": "Lock account", "type": "process" },
    { "id": "n9", "label": "Show lockout", "type": "end" },
    { "id": "n10", "label": "Show error", "type": "end" }
  ],
  "edges": [
    { "from": "n1", "to": "n2" },
    { "from": "n2", "to": "n3" },
    { "from": "n3", "to": "n4", "label": "valid" },
    { "from": "n4", "to": "n5" },
    { "from": "n3", "to": "n6", "label": "invalid" },
    { "from": "n6", "to": "n7" },
    { "from": "n7", "to": "n8", "label": "yes" },
    { "from": "n8", "to": "n9" },
    { "from": "n7", "to": "n10", "label": "no" }
  ]
}
```

### Step 3.2: Layout Algorithm

**Before writing SVG, compute x,y coordinates for every node.**
Use the algorithms below — do NOT randomize positions.

#### Flowchart Layout (top-to-bottom)

```
CONSTANTS: NODE_W=160, NODE_H=50, H_GAP=80, V_GAP=80

1. Topological sort nodes (find root = no incoming edges)
2. Assign ranks (depth from root via BFS)
3. Group nodes by rank
4. Within each rank: distribute horizontally centered around x=0
   x = (index - count/2) * (NODE_W + H_GAP)
   y = rank * (NODE_H + V_GAP)
5. For decision nodes: branch goes right (+x offset), straight continues down
6. Merge nodes (multiple incoming): center them below their parents
```

#### Sequence Diagram Layout

```
CONSTANTS: ACTOR_SPACING=200, MSG_SPACING=60, LIFELINE_START_Y=80

1. Extract actors in order of first appearance
2. Place actors at top: x = index * ACTOR_SPACING, y = 20
3. Draw lifelines: vertical dashed line from each actor down
4. Place messages in order: y = LIFELINE_START_Y + index * MSG_SPACING
   - Horizontal arrows from actor x to actor x at message y
   - Self-messages: small loop on right side of actor lifeline
5. Total height = LIFELINE_START_Y + message_count * MSG_SPACING + 60
```

#### Architecture Layout

```
CONSTANTS: NODE_W=140, NODE_H=60, CLUSTER_PAD=30

1. Detect clusters/layers from user description (frontend, backend, database, external, etc.)
2. Assign each node to a cluster
3. Lay out clusters in rows (top = external/user, middle = services, bottom = data)
4. Within clusters: distribute nodes in a grid, left-to-right
5. Route edges: straight lines between cluster centers, bezier curves within clusters
```

#### State Machine Layout

```
CONSTANTS: RADIUS=200, NODE_R=40

1. Count states (N)
2. Arrange states in a circle:
   x = cx + RADIUS * cos(2π * i / N)
   y = cy + RADIUS * sin(2π * i / N)
3. Initial state: leftmost or explicitly marked
4. Self-transitions: arc that leaves and re-enters from the top of the node
5. Bidirectional edges: offset the two arrows slightly (±10px perpendicular)
```

#### Swimlane Layout

```
CONSTANTS: LANE_H=120, NODE_W=140, NODE_H=50, NODE_SPACING=200

1. Extract actors (lanes) in order of first mention
2. Draw horizontal lanes: each lane is a row of height LANE_H
3. Number steps per actor; place nodes left-to-right within their lane
   x = step_index * NODE_SPACING + 100
   y = lane_index * LANE_H + LANE_H/2
4. Cross-lane edges: diagonal lines connecting last node in one lane to first node in next
5. Label left column with actor names
```

#### Mind Map Layout

```
CONSTANTS: ROOT_R=50, CHILD_R=35, GRANDCHILD_R=25, L1_RADIUS=180, L2_RADIUS=120

1. Root node at center (0, 0)
2. Level-1 children: spread evenly around circle at L1_RADIUS
   angle = (2π * i / count) - π/2   (start from top)
3. Level-2 grandchildren: fan out from their parent in the direction away from root
   parent_angle + small offset, at L2_RADIUS from parent
4. Leaf nodes: continue same pattern, L2_RADIUS from grandparent
5. Use curved bezier paths (not straight lines) for all connections
```

### Step 3.3: SVG Generation

**Read [html-template.md](html-template.md) and [viewport-base.css](viewport-base.css) before generating.**

Mandatory SVG structure:
```html
<svg id="diagram-svg" xmlns="http://www.w3.org/2000/svg" ...>
  <defs>
    <!-- arrowhead markers, filters (drop-shadow, glow), gradients -->
  </defs>
  <g id="zoom-layer">          <!-- receives transform for zoom/pan -->
    <g id="edges-layer">...</g>
    <g id="nodes-layer">...</g>
    <g id="labels-layer">...</g>
  </g>
</svg>
```

Node shape per type:
- `start` / `end`: `<ellipse>` or `<rect rx="25">`
- `process`: `<rect rx="8">`
- `decision`: `<polygon>` (rotated square, 4 points)
- `database`: `<path>` (cylinder shape using bezier)
- `queue`: `<polygon>` (hexagon, 6 points)
- `actor`: `<circle>` + `<text>` label below

Edge routing:
- Straight-line edges: `<line>` with arrowhead marker
- Curved/bypass edges: `<path d="M x1,y1 C cx1,cy1 cx2,cy2 x2,y2">` (cubic bezier)
- Edge labels: `<text>` centered on the midpoint of the edge

Arrowhead definition (in `<defs>`):
```svg
<marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
  <polygon points="0 0, 10 3.5, 0 7" fill="var(--edge-color)"/>
</marker>
```

### Step 3.4: Interactivity

**Always include zoom/pan (non-optional).**

#### Zoom & Pan
```javascript
// Mouse wheel zoom
svg.addEventListener('wheel', e => {
  e.preventDefault();
  const delta = e.deltaY > 0 ? 0.9 : 1.1;
  scale = Math.min(Math.max(scale * delta, 0.2), 4);
  applyTransform();
});

// Drag to pan
svg.addEventListener('mousedown', startDrag);
svg.addEventListener('mousemove', onDrag);
svg.addEventListener('mouseup', endDrag);

function applyTransform() {
  zoomLayer.setAttribute('transform', `translate(${tx},${ty}) scale(${scale})`);
}

// Fit-to-view on load
function fitToView() {
  const bbox = zoomLayer.getBBox();
  const svgW = svg.clientWidth, svgH = svg.clientHeight;
  scale = Math.min(svgW / (bbox.width + 80), svgH / (bbox.height + 80)) * 0.9;
  tx = (svgW - bbox.width * scale) / 2 - bbox.x * scale;
  ty = (svgH - bbox.height * scale) / 2 - bbox.y * scale;
  applyTransform();
}
```

#### Animated Step-Through (if requested)
```javascript
// Each node and edge has data-step attribute matching its traversal order
// Play button highlights nodes/edges sequentially
let currentStep = 0;
const steps = [...document.querySelectorAll('[data-step]')]
  .sort((a, b) => +a.dataset.step - +b.dataset.step);

function playNext() {
  if (currentStep >= steps.length) { currentStep = 0; resetAll(); return; }
  const el = steps[currentStep++];
  el.classList.add('active-step');
  // Pan diagram to keep active node in view
  panToElement(el);
  setTimeout(playNext, 800);
}
```

#### Clickable Nodes (if requested)
```javascript
// Each node has a data-description attribute
// Click opens an overlay panel with label + description
nodeGroup.addEventListener('click', () => {
  showPanel(node.label, node.description);
  // Highlight connected edges
  highlightConnections(node.id);
});
```

#### Hover Tooltips (always included)
```javascript
// Lightweight tooltip that follows cursor
nodeGroup.addEventListener('mouseenter', e => {
  tooltip.textContent = node.description || node.label;
  tooltip.style.display = 'block';
});
```

#### Keyboard Controls
- `Space` or `Enter` — advance step-through
- `R` — reset / fit to view
- `Escape` — close panel / deselect
- Arrow keys — pan the diagram

### Step 3.5: Animation on Load

**Read [animation-patterns.md](animation-patterns.md) for the chosen preset's signature animation.**

Mandatory load sequence:
1. Fade in the SVG container (0.4s)
2. Nodes entrance: staggered scale-in from 0 → 1 with `animation-delay: calc(var(--i) * 60ms)`
3. Edges entrance: SVG stroke-dashoffset draw animation (see animation-patterns.md)
4. Controls bar slides up from bottom (0.6s)

---

## Phase 4: Delivery

1. **Clean up** — Delete `.claude-design/flow-previews/` if it exists
2. **Open** — Run `open [filename].html` to launch in browser
3. **Summarize** — Tell the user:
   - File name, preset style, node count, edge count
   - Controls: scroll to zoom, drag to pan, `R` to reset view
   - Step-through: click ▶ Play button or press Space
   - Click any node for details (if clickable mode enabled)
   - Customization: `:root` CSS variables for colors, node dimensions in `--node-width`/`--node-height`

---

## Phase 5: Share & Export (Optional)

After delivery, ask: _"Would you like to share this diagram? I can deploy it to a live URL or export it as a PDF."_

Options: Deploy to URL / Export to PDF / Both / No thanks

### 5A: Deploy to a Live URL (Vercel)

```bash
bash scripts/deploy.sh <path-to-diagram.html>
```

Follow the same Vercel login flow as frontend-slides (see deploy.sh comments).

### 5B: Export to PDF / PNG

```bash
bash scripts/export-pdf.sh <path-to-diagram.html> [output.pdf]
```

The script screenshots the diagram at fit-to-view scale (1920×1080). Animations resolve to their final visual state. Step-through resets to step 0.

---

## Supporting Files

| File | Purpose | When to Read |
|---|---|---|
| [FLOW_PRESETS.md](FLOW_PRESETS.md) | 10 curated visual presets with colors, fonts, signature elements | Phase 2 (style selection) |
| [viewport-base.css](viewport-base.css) | Mandatory base CSS — copy into every diagram | Phase 3 (generation) |
| [html-template.md](html-template.md) | Full HTML/SVG/JS architecture reference | Phase 3 (generation) |
| [animation-patterns.md](animation-patterns.md) | Load animations, step-through effects, edge drawing | Phase 3 (generation) |
| [scripts/deploy.sh](scripts/deploy.sh) | Deploy diagram HTML to Vercel | Phase 5 (sharing) |
| [scripts/export-pdf.sh](scripts/export-pdf.sh) | Export diagram to PDF | Phase 5 (sharing) |
