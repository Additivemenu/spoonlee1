# Animation Patterns — Visual Flow

Animation reference for interactive diagrams. Read during Phase 3 and apply patterns matching the chosen preset's character.

---

## Effect-to-Feeling Guide

| Feeling | Animation Approach | Avoid |
|---|---|---|
| Technical/Precise | Edge draw (stroke-dashoffset), instant snaps, no easing | Bouncy springs, organic curves |
| Bold/Dynamic | Fast scale-in, contrast inversion on active, snap-to-grid | Slow fades, subtle micro-animations |
| Calm/Organized | Staggered fade-in, smooth transitions, gentle highlights | Abrupt changes, flashing |
| Creative/Expressive | Organic easing, color cascade, particle effects | Sharp edges, monochrome |

---

## Load Sequence (Apply to Every Diagram)

All diagrams must have a clear entrance sequence. Nodes appear first, edges draw after.

```css
/* 1. Container fades in */
.diagram-wrapper {
  animation: wrapperFadeIn 0.3s ease-out forwards;
}
@keyframes wrapperFadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* 2. Nodes: staggered scale-in (fastest approach) */
.node-group {
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
  animation: nodeScaleIn 0.35s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
  animation-delay: calc(var(--node-index, 0) * 55ms);
}
@keyframes nodeScaleIn {
  from { opacity: 0; transform: scale(0.5); }
  to   { opacity: 1; transform: scale(1); }
}

/* 3. Edges: draw along path using stroke-dashoffset trick */
.edge-path {
  stroke-dasharray: var(--path-length);   /* set via JS: path.getTotalLength() */
  stroke-dashoffset: var(--path-length);
  animation: edgeDraw 0.5s ease-out forwards;
  animation-delay: calc(var(--edge-index, 0) * 70ms + 250ms);
}
@keyframes edgeDraw {
  to { stroke-dashoffset: 0; }
}

/* 4. Header slides down */
.diagram-header {
  animation: headerSlideDown 0.4s ease-out 0.1s both;
}
@keyframes headerSlideDown {
  from { transform: translateY(-100%); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
}
```

**Important:** Set `--path-length` via JavaScript after the path is appended to the DOM:
```javascript
const len = path.getTotalLength();
path.style.setProperty('--path-length', len);
```

---

## Step-Through Animations

### Node Activation Pulse

When a node becomes the active step:

```css
.node-group.active-step .node-shape {
  animation: activePulse 0.5s ease-out;
}

@keyframes activePulse {
  0%   { stroke-width: var(--node-stroke-width); }
  40%  { stroke-width: calc(var(--node-stroke-width) * 2.5); }
  100% { stroke-width: calc(var(--node-stroke-width) * 1.8); }
}
```

### Pulse Ring (for Blueprint Grid, Neon Network, Electric Graph)

An expanding ring emanates from the active node:

```javascript
function spawnPulseRing(node) {
  const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  ring.setAttribute('cx', node.x);
  ring.setAttribute('cy', node.y);
  ring.setAttribute('r', 30);
  ring.setAttribute('fill', 'none');
  ring.setAttribute('stroke', 'var(--accent)');
  ring.setAttribute('stroke-width', '2');
  ring.style.transformOrigin = `${node.x}px ${node.y}px`;
  ring.style.animation = 'pulseRing 0.8s ease-out forwards';
  document.getElementById('nodes-layer').appendChild(ring);
  ring.addEventListener('animationend', () => ring.remove());
}
```

```css
@keyframes pulseRing {
  from { transform: scale(1); opacity: 0.8; }
  to   { transform: scale(3); opacity: 0; }
}
```

### Edge Activation Flash

Active edges briefly brighten before settling to accent color:

```css
.edge-path.active-step {
  animation: edgeActivate 0.3s ease-out forwards;
}
@keyframes edgeActivate {
  0%   { stroke: #ffffff; stroke-width: 4px; }
  50%  { stroke: var(--accent); stroke-width: 3px; }
  100% { stroke: var(--accent); stroke-width: calc(var(--edge-width) * 1.8); }
}
```

### Data Particle (Neon Network preset)

A small circle travels along an active edge path using `animateMotion`:

```javascript
function spawnDataParticle(pathEl) {
  const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  particle.setAttribute('r', '4');
  particle.setAttribute('fill', 'var(--accent)');

  const motion = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
  motion.setAttribute('dur', '0.7s');
  motion.setAttribute('repeatCount', '1');
  motion.setAttribute('fill', 'freeze');

  const mpath = document.createElementNS('http://www.w3.org/2000/svg', 'mpath');
  mpath.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#' + pathEl.id);
  motion.appendChild(mpath);

  particle.appendChild(motion);
  document.getElementById('edges-layer').appendChild(particle);
  particle.addEventListener('endEvent', () => particle.remove(), { once: true });
}
```

---

## Hover Micro-Interactions

### Node Lift (Paper Board, Pastel Canvas, Clarity Light)

```css
.node-group {
  transition: filter 0.2s ease;
}
.node-group:hover {
  filter: url(#node-shadow-lift);
}
```

```html
<!-- In <defs> -->
<filter id="node-shadow-lift" x="-20%" y="-20%" width="140%" height="160%">
  <feDropShadow dx="0" dy="6" stdDeviation="8"
                flood-color="rgba(0,0,0,0.2)" flood-opacity="1"/>
</filter>
```

### Node Glow (Blueprint Grid, Neon Network, Terminal Trace)

```css
.node-group:hover .node-shape {
  filter: url(#node-glow);
  stroke: var(--accent);
}
```

### Edge Highlight on Node Hover

When hovering a node, its connected edges gently brighten:

```javascript
nodeGroup.addEventListener('mouseenter', () => {
  const connected = graphData.edges.filter(
    e => e.from === node.id || e.to === node.id
  );
  connected.forEach(edge => {
    const edgeEl = document.querySelector(`[data-edge-id="${edge.id}"] .edge-path`);
    if (edgeEl) edgeEl.style.stroke = 'var(--accent)';
  });
});

nodeGroup.addEventListener('mouseleave', () => {
  document.querySelectorAll('.edge-path').forEach(p => {
    if (!p.classList.contains('active-step')) {
      p.style.stroke = '';
    }
  });
});
```

---

## Background Effects

### Animated Grid (Blueprint Grid)

```css
/* The grid itself is static, but add a subtle slow drift */
.svg-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0,180,255,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,180,255,0.06) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: gridDrift 60s linear infinite;
  pointer-events: none;
}
@keyframes gridDrift {
  from { background-position: 0 0; }
  to   { background-position: 40px 40px; }
}
```

### Scanline Flicker (Terminal Trace, Retro Flow)

```css
.svg-container::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(0,255,70,0.012) 3px,
    rgba(0,255,70,0.012) 4px
  );
  pointer-events: none;
  animation: flicker 0.15s steps(2) infinite;
  opacity: 0.4;
}
@keyframes flicker {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 0.35; }
}
```

### Particle Field (Neon Network)

Spawn 40 tiny dots that drift slowly across the background:

```javascript
function initParticleField(container) {
  const PARTICLE_COUNT = 40;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const dot = document.createElement('div');
    dot.className = 'bg-particle';
    dot.style.left   = Math.random() * 100 + 'vw';
    dot.style.top    = Math.random() * 100 + 'vh';
    dot.style.animationDelay    = Math.random() * 10 + 's';
    dot.style.animationDuration = (8 + Math.random() * 12) + 's';
    container.appendChild(dot);
  }
}
```

```css
.bg-particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: var(--accent);
  border-radius: 50%;
  opacity: 0.3;
  animation: particleDrift linear infinite;
  pointer-events: none;
}
@keyframes particleDrift {
  0%   { transform: translateY(0) translateX(0); opacity: 0.1; }
  50%  { opacity: 0.4; }
  100% { transform: translateY(-80px) translateX(30px); opacity: 0; }
}
```

---

## Transition Helpers

### Smooth Scale on Fit-to-View

Don't apply transform instantly — animate the initial fit:

```javascript
function fitToView(animate = true) {
  // ... compute scale, tx, ty ...
  if (animate) {
    zoomLayer.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    applyTransform();
    setTimeout(() => { zoomLayer.style.transition = ''; }, 500);
  } else {
    applyTransform();
  }
}
```

### Node Selection / Deselection

```javascript
function selectNode(node) {
  // Deselect all
  document.querySelectorAll('.node-group.selected').forEach(n => {
    n.classList.remove('selected');
  });
  // Select target (CSS handles the visual)
  document.querySelector(`[data-node-id="${node.id}"]`).classList.add('selected');
}
```

```css
.node-group.selected .node-shape {
  stroke: var(--accent);
  stroke-width: 3px;
  filter: url(#node-glow);
  transition: stroke 0.2s, stroke-width 0.2s;
}
```

---

## Reduced Motion Support

Always include this block — users who opt out of animation must still get a functional diagram:

```css
@media (prefers-reduced-motion: reduce) {
  .node-group,
  .edge-path,
  .diagram-header,
  .diagram-wrapper {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
    stroke-dashoffset: 0 !important;
  }
  .detail-panel {
    transition: none !important;
  }
}
```

```javascript
// Disable step-through delay for reduced-motion users
const STEP_DELAY = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ? 0
  : 900;
```

---

## Preset Signature Animations

| Preset | Signature Animation | Notes |
|---|---|---|
| Blueprint Grid | Orthogonal edge draw + grid drift | Edges must be horizontal/vertical only |
| Terminal Trace | Fade-in with cursor blink at active node | Add `▌` character after active node label |
| Electric Graph | Contrast inversion flash on active node | White → black fill swap, sharp and fast |
| Neon Network | Data particles on edges + glow pulse rings | Use `animateMotion` with SVG `<mpath>` |
| Paper Board | Node "stamp" entrance (scale from 1.2 → 1.0) | Slight rotation variance per node |
| Clarity Light | Gentle fade + progress bar below diagram | Bar fills left-to-right as steps advance |
| Swiss Grid | Step counter flashes in red | Bold number update at each step |
| Organic Ink | Branch color cascade, bezier curve draw | Draw edges thickness-weighted (root=thick) |
| Retro Flow | Amber cursor blink + scanline flicker | Timing: cursor blinks every 0.7s |
| Pastel Canvas | Scale-up bounce on active node | `cubic-bezier(0.34, 1.4, 0.64, 1)` spring |
