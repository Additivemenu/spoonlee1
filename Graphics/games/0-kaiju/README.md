# Kaiju Lab — web prototype

A playable first vertical slice of `requirements.md`, built with TypeScript, React, Three.js, and Vite. Local only; no accounts, API keys, backend, or paid assets.

## Run in WSL

```bash
cd /home/xueshuo/github/spoonlee1/Graphics/games/0-kaiju
npm install
npm run dev
```

Open http://localhost:5173 in Windows Chrome or Edge. Node.js LTS is required. If an older terminal cannot find Node, reopen it or run `source ~/.profile`.

```bash
npm test          # deterministic combat / gameplay checks
npm run build    # TypeScript + production bundle in dist/
npm run preview  # serve the production build
```

## Play

Customize the name, pigment, scale, armor, and horns, then deploy. Save design stores it in this browser's local storage. Settings are restored on reload; battle progress is not saved.

- Monster: W/S walk, A/D turn, 1 plasma beam, 2 or Space stomp, 3 energy pulse. Walking into buildings damages them. Abilities cost energy and have cooldowns.
- Tab switches between monster and defense force; city damage persists.
- Jet: automatic forward flight, W/S pitch up/down, A/D turn, Shift boost. Avoid buildings and terrain. Crossing the sector boundary turns you back toward the action.
- Face the monster within 300 m to lock, T cycles weak points, Space fires guided missiles. Click HUD controls as an alternative for abilities and target selection.
- Destroy the shield node to remove damage reduction, the core to stop beam attacks, or the legs to slow movement. Disabled nodes can still be targeted for hull damage.
- The monster autonomously walks toward and destroys buildings while you fly. Boosting evades its timed beam attacks.
- Escape pauses. Losing focus pauses an active scenario and clears held keys. The field manual includes reset / return to lab.
- Defeating the monster, losing the aircraft, or destroying all buildings produces an after-action report.

Desktop keyboard controls are required. Responsive HUD styling does not provide touch flight controls.

## City and licensing

`public/data/melbourne.json` contains 299 clipped building footprints and 623 road segments from an OpenStreetMap extract of Melbourne CBD. The sector is approximately 500 × 500 m, centered at latitude -37.81475, longitude 144.96285. Data was retrieved on 2026-10-30. Building heights use `height`, then `building:levels`, then a deterministic estimate. Geometry is recognizable geographic data, not a photorealistic reconstruction. Building relations/multipolygons and courtyards are not imported yet. The surrounding terrain and river strip are decorative approximations.

© OpenStreetMap contributors. The map-derived database is provided under the Open Database License (ODbL) 1.0: https://www.openstreetmap.org/copyright and https://opendatacommons.org/licenses/odbl/1-0/ . This applies to the geographic database, not a blanket license for project source code. Attribution appears in the game. No geographic service is called during play. If the bundled dataset cannot load, a labelled procedural grid is used.

To rebuild the extract:

```bash
curl -fsSL 'https://api.openstreetmap.org/api/0.6/map?bbox=144.9600,-37.8170,144.9657,-37.8125' -o /tmp/melbourne.osm
python3 scripts/import_osm.py /tmp/melbourne.osm public/data/melbourne.json
```

## Architecture

- `src/simulation.ts`: engine-independent gameplay state, movement, abilities, targeting, AI, missiles, damage, cooldowns, and victory/defeat.
- `src/world.ts`: Three.js rendering, procedural models, footprint extrusion, chase cameras, effects, and bounded visual debris.
- `src/main.tsx`: React editor and HUD, keyboard controls, local storage, pause / reset, and reports.
- `scripts/import_osm.py`: reproducible geographic conversion with no third-party Python dependencies.
- `src/simulation.test.ts`: combat and scenario regression tests.

## Scope and next milestones

This is an early playable prototype, not the complete production MVP. Models are intentionally primitive. Destruction uses building health, scaled collapse animations, and short-lived debris with simple gravity; there is no structural solver or Rapier integration yet. Building/vehicle collisions use bounding boxes, including for irregular footprints. Flight is an arcade model, missiles have forgiving lock and homing, and monster attacks are timed rather than projectile-accurate. The jet starts airborne, not at an airbase. Switching back into the jet resets its approach position, but retains aircraft health and city state.

Next priorities: user playtesting and performance profiling; better cameras in dense streets; calibrated flight and encounters; Rapier collision/debris; original animated creature and jet assets; additional compatible body slots; geographic multipolygons and landmarks; and audio/impact feedback. Fusion, multiplayer, a scenario editor, and other vehicles remain later roadmap work.

The current bundle includes the Three.js renderer, so Vite reports a large chunk warning. No external models or textures are downloaded. An optional Google Fonts stylesheet improves typography; system fallbacks work without it.
