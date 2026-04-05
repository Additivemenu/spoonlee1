# Visual Flow

Generate interactive, animated process flow diagrams from plain text — as zero-dependency, self-contained HTML files.

## What This Does

Visual Flow turns a text description or rough diagram sketch into a beautiful, interactive SVG diagram that runs entirely in the browser. No libraries. No build tools. One HTML file.

**Supported diagram types:**
- Flowchart — decisions, branches, process steps
- Sequence diagram — actors exchanging messages over time
- System architecture — services, databases, queues, and their connections
- State machine — states and labeled transitions
- Swimlane process — multi-actor workflows with parallel paths
- Mind map / concept map — hierarchical ideas radiating from a center

**Interactive by default:**
- Animated step-through (press ▶ Play or Space to walk through the flow)
- Hover any node for a tooltip
- Click any node to open a detail panel
- Mouse wheel to zoom, drag to pan, `R` to reset view

## Installation

Copy this folder to `~/.claude/skills/visual-flow/`.

```bash
cp -r visual-flow ~/.claude/skills/
```

Or clone directly into your skills directory.

## Usage

In any Claude Code conversation, describe what you want:

```
Create a flowchart showing the OAuth2 authorization code flow.
```

```
Make a sequence diagram: user → frontend → API → database, for a login request.
```

```
Visualize this as an architecture diagram:
  React app → API Gateway → Auth service, Product service, Order service
  → PostgreSQL, Redis
```

Claude will walk you through style selection and generate a complete interactive HTML file.

## Input Formats

You can provide your description in any format:

**Natural language:**
```
A user submits a login form. The API validates the credentials.
If valid, it creates a session and redirects to the dashboard.
If invalid, it increments the failure counter. After 3 failures, lock the account.
```

**Arrow notation:**
```
Start → Validate Input → if valid: Process Payment → Send Receipt → End
                       → if invalid: Show Error → End
```

**ASCII diagram:**
```
[User] → [Login API] → <Credentials Valid?>
                              ↓ yes          ↓ no
                       [Create Session]  [Return 401]
                              ↓
                       [Redirect Dashboard]
```

**Bullet list:**
```
Actors: Customer, Payment Service, Bank API
1. Customer submits card details
2. Payment Service validates card format
3. Payment Service calls Bank API
4. Bank API returns approval/decline
5. Payment Service notifies Customer
```

## Included Styles (10 Presets)

| Preset | Character | Best For |
|---|---|---|
| Blueprint Grid | Technical schematic, navy + cyan | Architecture, system design |
| Terminal Trace | Developer console, green-on-black | Algorithms, sequence diagrams |
| Electric Graph | Bold contrast, black + yellow | Any type, bold presentations |
| Neon Network | Cyberpunk, purple + teal glow | Architecture, state machines |
| Paper Board | Whiteboard, hand-drawn feel | Business process, swimlanes |
| Clarity Light | Clean, documentation-grade | Any type, specs and docs |
| Swiss Grid | Bauhaus, red + black + white | Flowcharts, decision trees |
| Organic Ink | Warm cream, branch colors | Mind maps, concept maps |
| Retro Flow | Amber terminal, 80s computer | Sequence, state machines |
| Pastel Canvas | Soft pastels, pill-shaped nodes | User journeys, onboarding |

## Architecture

```
visual-flow/
├── SKILL.md                  # Full workflow instructions (Phases 0–5)
├── README.md                 # This file
├── FLOW_PRESETS.md           # 10 curated styles with colors, fonts, specs
├── html-template.md          # SVG/JS architecture and code patterns
├── animation-patterns.md     # Load animations, step-through, effects
├── viewport-base.css         # Mandatory base CSS (included in every diagram)
└── scripts/
    ├── deploy.sh             # Deploy to Vercel for a shareable URL
    └── export-pdf.sh         # Export diagram to PDF
```

Supporting files are loaded on demand during generation — `SKILL.md` maps which file is needed at which phase.

## Customization

Every generated diagram exposes CSS custom properties at the top of the `<style>` block:

```css
:root {
  --bg: #0d1b2a;          /* background color */
  --node-fill: #0f2a3d;   /* node background */
  --node-stroke: #00b4ff; /* node border */
  --accent: #00e5ff;      /* highlight/active color */
  --edge-color: #0096cc;  /* arrow color */
  --font-primary: 'JetBrains Mono', monospace;
  --node-width: 160px;    /* default node width */
  --node-height: 50px;    /* default node height */
}
```

Change these values directly in the HTML file to retheme the entire diagram instantly.

## Controls Reference

| Action | Control |
|---|---|
| Play step-through | ▶ Play button or Space |
| Advance one step | → or ↓ arrow key |
| Pause | ▶ button or Space |
| Reset & fit to view | ⟳ Reset button or R |
| Zoom in/out | Mouse wheel or +/- keys |
| Pan | Click and drag |
| Open node details | Click any node |
| Close details panel | ✕ button or Escape |

## Sharing

After generating, Claude will offer to:

- **Deploy to a live URL** via Vercel — works on any device (phone, tablet, laptop)
- **Export to PDF** — static snapshot for email, Slack, or printing

Both options are handled by scripts in the `scripts/` directory.

## Philosophy

- **Parse intent, not syntax** — Users shouldn't need to learn a diagram DSL. Natural language, arrows, and ASCII art all work.
- **Interactive first** — A static diagram is just a picture. A playable step-through turns it into a walkthrough.
- **Zero dependencies** — The output file works offline, forever, without npm.
- **Designed, not generated** — The 10 presets exist to prevent the "default gray Mermaid" look. Every output should feel deliberately styled.
