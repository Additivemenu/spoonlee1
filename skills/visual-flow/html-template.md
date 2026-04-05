# HTML Template — Visual Flow

Architecture reference for generating interactive SVG-based flow diagrams. Read this during Phase 3 before writing any code.

---

## Full HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Diagram Title]</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="[font URL]" rel="stylesheet">
  <style>
    /* === CSS CUSTOM PROPERTIES === */
    :root {
      --bg: #0d1b2a;
      --node-fill: #0f2a3d;
      --node-stroke: #00b4ff;
      --node-stroke-width: 1.5px;
      --edge-color: #0096cc;
      --edge-width: 1.5px;
      --label-color: #e0f4ff;
      --accent: #00e5ff;
      --node-width: 160px;
      --node-height: 50px;
      --font-primary: 'JetBrains Mono', monospace;
      --transition-speed: 0.3s;
      --zoom-speed: 0.1;
    }

    /* === VIEWPORT BASE === */
    /* (paste full contents of viewport-base.css here) */

    /* === DIAGRAM CONTAINER === */
    /* ... */

    /* === NODE STYLES === */
    /* ... */

    /* === EDGE STYLES === */
    /* ... */

    /* === CONTROLS === */
    /* ... */

    /* === ANIMATIONS === */
    /* (paste animation patterns from animation-patterns.md here) */

    /* === TOOLTIP === */
    /* ... */

    /* === DETAIL PANEL === */
    /* ... */
  </style>
</head>
<body>
  <!-- === DIAGRAM WRAPPER === -->
  <div class="diagram-wrapper">

    <!-- Top bar: title + controls -->
    <div class="diagram-header">
      <span class="diagram-title">[Title]</span>
      <div class="diagram-controls">
        <button id="btn-play" title="Play step-through (Space)">▶ Play</button>
        <button id="btn-reset" title="Reset view (R)">⟳ Reset</button>
        <span class="step-counter" id="step-counter"></span>
      </div>
    </div>

    <!-- Main SVG canvas -->
    <div class="svg-container">
      <svg id="diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Arrowhead markers -->
          <marker id="arrow-default" markerWidth="10" markerHeight="7"
                  refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="var(--edge-color)"/>
          </marker>
          <marker id="arrow-active" markerWidth="10" markerHeight="7"
                  refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent)"/>
          </marker>

          <!-- Drop shadow filter -->
          <filter id="node-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4"
                          flood-color="rgba(0,0,0,0.3)" flood-opacity="1"/>
          </filter>

          <!-- Glow filter (preset-specific) -->
          <filter id="node-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <!-- All diagram content lives inside this group (zoom/pan target) -->
        <g id="zoom-layer">
          <g id="edges-layer"><!-- edges rendered first so nodes appear on top --></g>
          <g id="nodes-layer"></g>
          <g id="labels-layer"><!-- edge labels --></g>
        </g>
      </svg>
    </div>

    <!-- Tooltip (follows cursor) -->
    <div class="tooltip" id="tooltip"></div>

    <!-- Detail panel (slides in on node click) -->
    <div class="detail-panel" id="detail-panel">
      <button class="panel-close" id="panel-close">✕</button>
      <h3 class="panel-title" id="panel-title"></h3>
      <p class="panel-body" id="panel-body"></p>
    </div>

    <!-- Bottom legend -->
    <div class="diagram-legend" id="diagram-legend">
      <!-- Generated: colored swatches for each node type present -->
    </div>

  </div>

  <script>
    /* === GRAPH DATA === */
    // Generated from parsing Phase — do not hardcode SVG, generate from data
    const graphData = {
      nodes: [
        // { id, label, type, x, y, description, step }
      ],
      edges: [
        // { id, from, to, label, step, curved }
      ],
      title: "[Diagram Title]",
      type: "flowchart"  // flowchart | sequence | architecture | state | swimlane | mindmap
    };

    /* === DIAGRAM RENDERER === */
    /* ... (see sections below) */

    /* === ZOOM & PAN === */
    /* ... */

    /* === STEP-THROUGH ENGINE === */
    /* ... */

    /* === INTERACTIVITY === */
    /* ... */

    /* === KEYBOARD CONTROLS === */
    /* ... */

    /* === INIT === */
    render(graphData);
    fitToView();
  </script>
</body>
</html>
```

---

## CSS Architecture

### Diagram Wrapper

```css
/* === DIAGRAM WRAPPER === */
.diagram-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  overflow: hidden;
  position: relative;
  font-family: var(--font-primary);
}

.diagram-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  height: 48px;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: var(--bg);
  z-index: 10;
}

.diagram-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--label-color);
  letter-spacing: 0.05em;
  opacity: 0.9;
}

.svg-container {
  flex: 1;
  position: relative;
  overflow: hidden;
  cursor: grab;
}

.svg-container:active { cursor: grabbing; }

#diagram-svg {
  width: 100%;
  height: 100%;
  display: block;
}
```

### Node Styles

```css
/* === NODE STYLES === */
.node-group {
  cursor: pointer;
  transition: filter var(--transition-speed);
}

.node-group:hover .node-shape {
  filter: url(#node-glow);
}

.node-shape {
  fill: var(--node-fill);
  stroke: var(--node-stroke);
  stroke-width: var(--node-stroke-width);
  transition: fill 0.2s, stroke 0.2s, filter 0.2s;
}

.node-label {
  fill: var(--label-color);
  font-family: var(--font-primary);
  font-size: 12px;
  text-anchor: middle;
  dominant-baseline: middle;
  pointer-events: none;
  user-select: none;
}

/* Type-specific overrides */
.node-start .node-shape,
.node-end .node-shape {
  /* Filled differently per preset */
}

.node-decision .node-shape {
  stroke: var(--accent);
  stroke-width: 2px;
}

/* Step-through active state */
.node-group.active-step .node-shape {
  stroke: var(--accent);
  stroke-width: 3px;
  filter: url(#node-glow);
}

.node-group.visited .node-shape {
  opacity: 0.5;
}

/* Entrance animation */
.node-group {
  opacity: 0;
  transform-origin: center;
  animation: nodeEnter 0.4s ease-out forwards;
  animation-delay: calc(var(--node-index, 0) * 60ms);
}

@keyframes nodeEnter {
  from { opacity: 0; transform: scale(0.7); }
  to   { opacity: 1; transform: scale(1); }
}
```

### Edge Styles

```css
/* === EDGE STYLES === */
.edge-path {
  fill: none;
  stroke: var(--edge-color);
  stroke-width: var(--edge-width);
  marker-end: url(#arrow-default);
  stroke-dasharray: var(--path-length, 1000);
  stroke-dashoffset: var(--path-length, 1000);
  animation: edgeDraw 0.6s ease-out forwards;
  animation-delay: calc(var(--edge-index, 0) * 80ms + 300ms);
}

@keyframes edgeDraw {
  to { stroke-dashoffset: 0; }
}

.edge-path.conditional {
  stroke-dasharray: 6 4;
  stroke-dashoffset: 0; /* override draw animation for dashed */
  animation: none;
  opacity: 0;
  animation: edgeFade 0.4s ease-out forwards;
  animation-delay: calc(var(--edge-index, 0) * 80ms + 300ms);
}

@keyframes edgeFade {
  to { opacity: 1; }
}

.edge-path.active-step {
  stroke: var(--accent);
  stroke-width: calc(var(--edge-width) * 1.8);
  marker-end: url(#arrow-active);
}

.edge-label {
  fill: var(--label-color);
  font-family: var(--font-primary);
  font-size: 10px;
  opacity: 0.8;
  text-anchor: middle;
  dominant-baseline: middle;
  pointer-events: none;
}
```

### Controls

```css
/* === CONTROLS === */
.diagram-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.diagram-controls button {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  color: var(--label-color);
  padding: 5px 14px;
  border-radius: 4px;
  font-family: var(--font-primary);
  font-size: 12px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}

.diagram-controls button:hover {
  background: rgba(255,255,255,0.12);
  border-color: var(--accent);
}

.step-counter {
  font-size: 11px;
  color: var(--accent);
  min-width: 50px;
  text-align: right;
  opacity: 0.8;
}
```

### Tooltip & Panel

```css
/* === TOOLTIP === */
.tooltip {
  position: fixed;
  background: var(--bg-secondary, #1a2d42);
  color: var(--label-color);
  border: 1px solid var(--node-stroke);
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 11px;
  font-family: var(--font-primary);
  max-width: 220px;
  pointer-events: none;
  display: none;
  z-index: 1000;
  white-space: pre-wrap;
}

/* === DETAIL PANEL === */
.detail-panel {
  position: absolute;
  right: 0;
  top: 48px;
  width: 280px;
  height: calc(100% - 48px);
  background: var(--bg-secondary, rgba(0,0,0,0.9));
  border-left: 1px solid var(--node-stroke);
  padding: 24px 20px;
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;
  overflow-y: auto;
}

.detail-panel.open {
  transform: translateX(0);
}

.panel-close {
  position: absolute;
  top: 12px;
  right: 14px;
  background: none;
  border: none;
  color: var(--label-color);
  cursor: pointer;
  font-size: 16px;
  opacity: 0.6;
}

.panel-title {
  font-size: 16px;
  color: var(--accent);
  margin: 0 0 12px;
  font-family: var(--font-primary);
}

.panel-body {
  font-size: 13px;
  color: var(--label-color);
  opacity: 0.85;
  line-height: 1.6;
  font-family: var(--font-primary);
}
```

---

## JavaScript Architecture

### Render Function

The renderer translates `graphData` into SVG elements. Keep data and rendering separate — never hardcode SVG coordinates.

```javascript
function render(data) {
  const edgesLayer  = document.getElementById('edges-layer');
  const nodesLayer  = document.getElementById('nodes-layer');
  const labelsLayer = document.getElementById('labels-layer');

  // Render edges first (nodes appear on top)
  data.edges.forEach((edge, i) => {
    const fromNode = data.nodes.find(n => n.id === edge.from);
    const toNode   = data.nodes.find(n => n.id === edge.to);
    if (!fromNode || !toNode) return;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.classList.add('edge-group');
    g.dataset.edgeId = edge.id;
    if (edge.step !== undefined) g.dataset.step = edge.step;

    const path = createEdgePath(fromNode, toNode, edge.curved);
    path.classList.add('edge-path');
    path.style.setProperty('--edge-index', i);
    path.style.setProperty('--path-length', path.getTotalLength());
    if (edge.conditional) path.classList.add('conditional');

    g.appendChild(path);
    edgesLayer.appendChild(g);

    // Edge label
    if (edge.label) {
      const mid = path.getPointAtLength(path.getTotalLength() * 0.5);
      const text = makeSVGText(edge.label, mid.x, mid.y - 10);
      text.classList.add('edge-label');
      labelsLayer.appendChild(text);
    }
  });

  // Render nodes
  data.nodes.forEach((node, i) => {
    const g = createNodeGroup(node, i);
    nodesLayer.appendChild(g);
  });
}
```

### Node Shape Factories

```javascript
function createNodeGroup(node, index) {
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.classList.add('node-group', `node-${node.type}`);
  g.setAttribute('transform', `translate(${node.x}, ${node.y})`);
  g.style.setProperty('--node-index', index);
  g.dataset.nodeId = node.id;
  if (node.step !== undefined) g.dataset.step = node.step;

  const shape = createNodeShape(node);
  shape.classList.add('node-shape');
  g.appendChild(shape);

  // Label (centered at 0,0 since group is translated)
  const label = makeSVGText(node.label, 0, 0);
  label.classList.add('node-label');
  g.appendChild(label);

  // Interactivity
  g.addEventListener('mouseenter', e => showTooltip(e, node));
  g.addEventListener('mouseleave', hideTooltip);
  g.addEventListener('click', () => selectNode(node));

  return g;
}

// Returns the correct SVG shape for each node type
function createNodeShape(node) {
  const W = 160, H = 50;  // defaults — adjust per preset
  let el;

  switch (node.type) {
    case 'start':
    case 'end':
      el = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      el.setAttribute('x', -W/2); el.setAttribute('y', -H/2);
      el.setAttribute('width', W); el.setAttribute('height', H);
      el.setAttribute('rx', H/2);  // fully rounded = pill
      break;

    case 'decision':
      el = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      // Diamond: top, right, bottom, left
      el.setAttribute('points',
        `0,${-H*0.7} ${W*0.6},0 0,${H*0.7} ${-W*0.6},0`);
      break;

    case 'database':
      el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      // Cylinder: top ellipse + rectangle body
      const r = W/2, h = H;
      el.setAttribute('d',
        `M ${-r},${-h/2+8} a ${r},8 0 0,0 ${r*2},0 ` +
        `v ${h-16} a ${r},8 0 0,1 ${-r*2},0 Z`);
      break;

    case 'queue':
      el = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      const hw = W/2, hh = H/2, indent = 15;
      el.setAttribute('points',
        `${-hw+indent},${-hh} ${hw},${-hh} ${hw-indent},0 ` +
        `${hw},${hh} ${-hw+indent},${hh} ${-hw},0`);
      break;

    default:  // process
      el = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      el.setAttribute('x', -W/2); el.setAttribute('y', -H/2);
      el.setAttribute('width', W); el.setAttribute('height', H);
      el.setAttribute('rx', 8);
  }

  return el;
}
```

### Edge Path Computation

```javascript
// Computes source/target attachment points and returns an SVG path element
function createEdgePath(fromNode, toNode, curved = false) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  // Find the closest attachment points on each node's bounding box
  const src = getAttachPoint(fromNode, toNode);
  const dst = getAttachPoint(toNode, fromNode);

  if (curved) {
    // Bezier control points: perpendicular to the edge direction
    const dx = dst.x - src.x, dy = dst.y - src.y;
    const cx1 = src.x + dx * 0.4, cy1 = src.y + dy * 0.1;
    const cx2 = src.x + dx * 0.6, cy2 = src.y + dy * 0.9;
    path.setAttribute('d',
      `M ${src.x},${src.y} C ${cx1},${cy1} ${cx2},${cy2} ${dst.x},${dst.y}`);
  } else {
    path.setAttribute('d', `M ${src.x},${src.y} L ${dst.x},${dst.y}`);
  }

  path.setAttribute('marker-end', 'url(#arrow-default)');
  return path;
}

// Returns the point on the node's edge closest to the other node
function getAttachPoint(node, other) {
  const W = 160, H = 50;
  const dx = other.x - node.x, dy = other.y - node.y;
  const angle = Math.atan2(dy, dx);

  // Clamp to rectangle boundary
  const cosA = Math.cos(angle), sinA = Math.sin(angle);
  const scaleX = (W/2) / Math.abs(cosA || 0.0001);
  const scaleY = (H/2) / Math.abs(sinA || 0.0001);
  const scale = Math.min(scaleX, scaleY);

  return {
    x: node.x + cosA * scale,
    y: node.y + sinA * scale
  };
}
```

### Zoom & Pan

```javascript
let scale = 1, tx = 0, ty = 0;
let isDragging = false, dragStart = { x: 0, y: 0 };
const svg = document.getElementById('diagram-svg');
const zoomLayer = document.getElementById('zoom-layer');

function applyTransform() {
  zoomLayer.setAttribute('transform', `translate(${tx},${ty}) scale(${scale})`);
}

// Zoom toward cursor position
svg.addEventListener('wheel', e => {
  e.preventDefault();
  const rect = svg.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  const delta = e.deltaY > 0 ? 0.88 : 1.12;
  const newScale = Math.min(Math.max(scale * delta, 0.1), 5);
  tx = mx - (mx - tx) * (newScale / scale);
  ty = my - (my - ty) * (newScale / scale);
  scale = newScale;
  applyTransform();
}, { passive: false });

svg.addEventListener('mousedown', e => {
  if (e.target.closest('.node-group')) return;  // don't drag when clicking nodes
  isDragging = true;
  dragStart = { x: e.clientX - tx, y: e.clientY - ty };
  e.preventDefault();
});

window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  tx = e.clientX - dragStart.x;
  ty = e.clientY - dragStart.y;
  applyTransform();
});

window.addEventListener('mouseup', () => { isDragging = false; });

function fitToView() {
  const bbox = zoomLayer.getBBox();
  if (!bbox.width || !bbox.height) return;
  const svgW = svg.clientWidth, svgH = svg.clientHeight;
  const padding = 80;
  scale = Math.min(
    (svgW - padding) / bbox.width,
    (svgH - padding) / bbox.height
  ) * 0.9;
  tx = (svgW - bbox.width * scale) / 2 - bbox.x * scale;
  ty = (svgH - bbox.height * scale) / 2 - bbox.y * scale;
  applyTransform();
}
```

### Step-Through Engine

```javascript
let stepIndex = 0;
let stepTimer = null;
let isPlaying = false;
const STEP_DELAY = 900; // ms between steps

// Collect all step-annotated elements, sorted by step number
const stepElements = () =>
  [...document.querySelectorAll('[data-step]')]
    .sort((a, b) => +a.dataset.step - +b.dataset.step);

function playThrough() {
  isPlaying = true;
  document.getElementById('btn-play').textContent = '⏸ Pause';
  advanceStep();
}

function pausePlaythrough() {
  isPlaying = false;
  clearTimeout(stepTimer);
  document.getElementById('btn-play').textContent = '▶ Play';
}

function advanceStep() {
  const steps = stepElements();
  if (stepIndex >= steps.length) {
    pausePlaythrough();
    return;
  }

  const el = steps[stepIndex];
  el.classList.add('active-step');
  el.classList.remove('pending');

  // Mark previous steps as visited
  steps.slice(0, stepIndex).forEach(s => {
    s.classList.remove('active-step');
    s.classList.add('visited');
  });

  updateStepCounter(stepIndex + 1, steps.length);
  panToElement(el);
  stepIndex++;

  if (isPlaying) {
    stepTimer = setTimeout(advanceStep, STEP_DELAY);
  }
}

function resetSteps() {
  clearTimeout(stepTimer);
  isPlaying = false;
  stepIndex = 0;
  document.getElementById('btn-play').textContent = '▶ Play';
  stepElements().forEach(el => {
    el.classList.remove('active-step', 'visited', 'pending');
  });
  updateStepCounter(0, stepElements().length);
  fitToView();
}

function panToElement(el) {
  // Get element center in diagram coordinates, pan smoothly to it
  const bbox = el.getBBox ? el.getBBox() : el.getBoundingClientRect();
  // (implementation: get world coordinates, convert to screen, animate tx/ty)
}

function updateStepCounter(current, total) {
  const counter = document.getElementById('step-counter');
  if (counter) counter.textContent = total > 0 ? `${current} / ${total}` : '';
}

document.getElementById('btn-play').addEventListener('click', () => {
  if (isPlaying) { pausePlaythrough(); } else { playThrough(); }
});

document.getElementById('btn-reset').addEventListener('click', resetSteps);
```

### Keyboard Controls

```javascript
document.addEventListener('keydown', e => {
  switch (e.key) {
    case ' ':
    case 'Enter':
      e.preventDefault();
      if (isPlaying) { pausePlaythrough(); } else { playThrough(); }
      break;
    case 'r':
    case 'R':
      resetSteps();
      fitToView();
      break;
    case 'Escape':
      closePanel();
      pausePlaythrough();
      break;
    case 'ArrowRight':
    case 'ArrowDown':
      e.preventDefault();
      if (!isPlaying) { advanceStep(); }
      break;
    case '+':
    case '=':
      scale = Math.min(scale * 1.15, 5); applyTransform(); break;
    case '-':
      scale = Math.max(scale * 0.85, 0.1); applyTransform(); break;
  }
});
```

### Tooltip & Panel

```javascript
const tooltip = document.getElementById('tooltip');

function showTooltip(e, node) {
  if (!node.description && !node.label) return;
  tooltip.textContent = node.description || node.label;
  tooltip.style.display = 'block';
  moveTooltip(e);
}

function moveTooltip(e) {
  tooltip.style.left = (e.clientX + 14) + 'px';
  tooltip.style.top  = (e.clientY - 8) + 'px';
}

function hideTooltip() {
  tooltip.style.display = 'none';
}

document.addEventListener('mousemove', e => {
  if (tooltip.style.display !== 'none') moveTooltip(e);
});

// Panel
function selectNode(node) {
  const panel = document.getElementById('detail-panel');
  document.getElementById('panel-title').textContent = node.label;
  document.getElementById('panel-body').textContent =
    node.description || 'No additional details.';
  panel.classList.add('open');

  // Highlight connected edges
  document.querySelectorAll('.edge-path').forEach(e => e.classList.remove('active-step'));
  document.querySelectorAll('.edge-group').forEach(g => {
    const edge = graphData.edges.find(e => e.id === g.dataset.edgeId);
    if (edge && (edge.from === node.id || edge.to === node.id)) {
      g.querySelector('.edge-path').classList.add('active-step');
    }
  });
}

function closePanel() {
  document.getElementById('detail-panel').classList.remove('open');
  document.querySelectorAll('.edge-path').forEach(e => e.classList.remove('active-step'));
}

document.getElementById('panel-close').addEventListener('click', closePanel);
```

---

## Sequence Diagram Special Structure

For sequence diagrams, use a different SVG layout — no `node-group` translate approach, instead:

```javascript
// Actors: vertical lifelines
// Messages: horizontal arrows between lifelines
// Time flows downward

function renderSequence(data) {
  const ACTOR_SPACING = 200;
  const MSG_SPACING   = 70;
  const LIFELINE_Y    = 80;
  const actors = [...new Set(data.messages.flatMap(m => [m.from, m.to]))];

  // Draw actor boxes at top
  actors.forEach((actor, i) => {
    const x = 100 + i * ACTOR_SPACING;
    drawActorBox(actor, x, 20);
    drawLifeline(x, LIFELINE_Y, LIFELINE_Y + data.messages.length * MSG_SPACING + 40);
  });

  // Draw messages
  data.messages.forEach((msg, i) => {
    const fromX = 100 + actors.indexOf(msg.from) * ACTOR_SPACING;
    const toX   = 100 + actors.indexOf(msg.to)   * ACTOR_SPACING;
    const y     = LIFELINE_Y + (i + 1) * MSG_SPACING;
    drawMessage(fromX, toX, y, msg.label, msg.type, i);
  });
}
```

---

## Mind Map Special Structure

For mind maps, render radially from center with curved organic paths:

```javascript
function renderMindMap(data) {
  const cx = 0, cy = 0;
  const root = data.nodes.find(n => !data.edges.some(e => e.to === n.id));

  // Place root at center
  root.x = cx; root.y = cy;

  // Level-1 children: distribute around circle
  const L1 = data.edges.filter(e => e.from === root.id).map(e =>
    data.nodes.find(n => n.id === e.to));

  L1.forEach((child, i) => {
    const angle = (2 * Math.PI * i / L1.length) - Math.PI / 2;
    child.x = cx + Math.cos(angle) * 200;
    child.y = cy + Math.sin(angle) * 200;
    child.branchColor = BRANCH_COLORS[i % BRANCH_COLORS.length];

    // Level-2: fan out in parent direction
    const L2 = data.edges.filter(e => e.from === child.id).map(e =>
      data.nodes.find(n => n.id === e.to));
    L2.forEach((grandchild, j) => {
      const spread = (j - (L2.length - 1) / 2) * 0.35;
      grandchild.x = child.x + Math.cos(angle + spread) * 150;
      grandchild.y = child.y + Math.sin(angle + spread) * 150;
      grandchild.branchColor = child.branchColor;
    });
  });
}
```

---

## Code Quality Standards

- Every major section must have a `/* === SECTION NAME === */` comment block
- `graphData` must be populated from parsing, never hardcoded positions
- CSS custom properties for all colors — never hardcode hex in JS
- Use `requestAnimationFrame` for smooth pan/zoom animations (not direct attribute writes in event handlers)
- Never use `innerHTML` with user-provided content (XSS risk) — use `textContent` or `createTextNode`
- `prefers-reduced-motion`: disable all CSS animations and JS step delays when `window.matchMedia('(prefers-reduced-motion: reduce)').matches`
- Semantic IDs: `node-{id}`, `edge-{from}-{to}`, `label-{id}`
- Touch support: mirror all mouse events with Touch equivalents (`touchstart`, `touchmove`, `touchend`) for mobile/tablet pinch-zoom and drag
