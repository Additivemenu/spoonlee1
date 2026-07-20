# Demo 1 — Animated Color Strip

A minimal WebGL shader demo: two triangles cover the whole screen, and a
fragment shader paints every pixel with an animated color based on its
position and the current time.

```
1-color-strip/
├── index.html      HTML + CSS — creates the <canvas> and makes it fill the screen
├── script.js       JavaScript — sets up WebGL, loads the shaders, runs the animation loop
├── shader.vert     Vertex shader (GLSL) — where geometry goes
├── shader.frag     Fragment shader (GLSL) — what color each pixel is
└── README.md       You are here
```

---

## 1. The big picture

WebGL draws by running two tiny programs **on the GPU**:

| Shader | Question it answers | Runs once per... |
| --- | --- | --- |
| **Vertex shader** | "Where does this point go?" | vertex (corner) |
| **Fragment shader** | "What color is this pixel?" | pixel |

This demo's trick: cover the entire screen with a **rectangle made of two
triangles**, so the fragment shader runs for every pixel on screen. All the
visual interest lives in the fragment shader.

```
CPU (JavaScript)                    GPU
────────────────                    ───
每帧 requestAnimationFrame ─ time ─►  fragment shader runs for
canvas size ─────────────── res ──►  ALL pixels in parallel,
                                     each outputs one (r,g,b,a)
```

Because every pixel is computed **independently and in parallel**, a shader
must be written as a pure function of *position* and *time* — there is no
shared memory between pixels, no loops over the image, no "previous pixel."

---

## 2. The full-screen quad

WebGL's coordinate system ("clip space") runs from **-1 to +1** on both axes,
with `(0,0)` at the center:

```
        y = +1
          │
 x=-1 ────┼──── x = +1
          │
        y = -1
```

To cover the whole screen we need a rectangle spanning all four corners.
A GPU only draws triangles, so the rectangle is two triangles (6 vertices):

```js
new Float32Array([
  -1, -1,   1, -1,  -1,  1,   // triangle 1 (bottom-left half)
  -1,  1,   1, -1,   1,  1,   // triangle 2 (top-right half)
])
```

```
(-1, 1)         (1, 1)
    ┌──────────────┐
    │ ◤        2   │
    │    ◤         │
    │       ◤      │
    │   1      ◤   │
    └──────────────┘
(-1,-1)         (1,-1)
```

---

## 3. The vertex shader (`shader.vert`)

```glsl
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
```

- `attribute vec2 a_position` — per-vertex input, fed from the buffer above.
  Runs 6 times, once per corner.
- `gl_Position` — the required output: where the vertex lands in clip space.
  It's a `vec4` (x, y, z, w); we pass `z = 0` (flat, 2D) and `w = 1`.

This shader is intentionally boring — it passes positions straight through
with no transformation. It's a 2D fullscreen effect, so there's no 3D math.

---

## 4. The fragment shader (`shader.frag`) — the interesting part

```glsl
precision mediump float;

uniform vec2 u_resolution;  // canvas size in pixels
uniform float u_time;       // seconds since start

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;

  float r = 0.5 + 0.5 * sin(u_time + uv.x * 6.2831);
  float g = 0.5 + 0.5 * sin(u_time + uv.y * 6.2831 + 2.0);
  float b = 0.5 + 0.5 * sin(u_time + 4.0);

  gl_FragColor = vec4(r, g, b, 1.0);
}
```

**Line by line:**

- `precision mediump float;` — required in WebGL fragment shaders: sets the
  default precision for floats. `mediump` (medium) is the safe default.

- `uniform` — a value sent from JavaScript that is the **same for every pixel**
  in a frame (hence "uniform"). Here: the canvas size and the elapsed time.

- `gl_FragCoord.xy` — a built-in giving this pixel's coordinates **in pixels**,
  e.g. `(427, 312)`. Origin is the bottom-left.

- `vec2 uv = gl_FragCoord.xy / u_resolution;` — divide by canvas size to
  **normalize** to the `0.0 → 1.0` range. `uv` is now a relative position:
  `(0,0)` bottom-left, `(1,1)` top-right. ("uv" is the traditional name for
  2D surface coordinates.)

**The color math** — the pattern `0.5 + 0.5 * sin(x)` is the key idiom:

- `sin(x)` oscillates between **-1 and +1**.
- Multiply by `0.5` → range **-0.5 to +0.5**.
- Add `0.5` → range **0.0 to 1.0** — exactly the valid range for a color channel.

So each channel is a smooth wave that never leaves the legal color range:

| Channel | Depends on | Visual effect |
| --- | --- | --- |
| `r` | `uv.x` + time | vertical color bands that scroll horizontally over time |
| `g` | `uv.y` + time (+2.0 phase) | horizontal bands, shifted out of sync with red |
| `b` | time only (no `uv`) | uniform across screen, just pulses over time |

- `6.2831` is **2π** — one full sine cycle across the width/height of the screen.
- Adding `u_time` inside `sin(...)` slides the wave over time → animation.
- The `+2.0` and `+4.0` are **phase offsets** so the three channels peak at
  different moments, producing shifting color mixes instead of gray.

- `gl_FragColor` — the required output: the final pixel color as
  `vec4(red, green, blue, alpha)`, each `0.0–1.0`. `alpha = 1.0` = fully opaque.

---

## 5. How JavaScript drives it (`script.js`)

The JS side does four jobs:

1. **Size the canvas & viewport**
   ```js
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   gl.viewport(0, 0, canvas.width, canvas.height); // GPU draws into the whole buffer
   ```
   > ⚠️ The `gl.viewport(...)` call is essential. Without it the GPU only draws
   > into a default 300×150 region in the bottom-left corner. (That was the
   > original bug in this demo.)

2. **Load & compile the shaders** — fetch the `.vert` / `.frag` files as text,
   then `compile()` + link them into a `program`:
   ```js
   const [vertexSrc, fragmentSrc] = await Promise.all([
     fetch("./shader.vert").then((r) => r.text()),
     fetch("./shader.frag").then((r) => r.text()),
   ]);
   ```
   > `fetch` needs an `http://` server (Live Server is fine). It will **not**
   > work by double-clicking the file (`file://` is blocked by browser security).

3. **Upload the quad** to a GPU buffer and connect it to `a_position`.

4. **Animate** — `requestAnimationFrame` calls `render` ~60×/sec, updating the
   `u_time` and `u_resolution` uniforms and issuing the draw call:
   ```js
   function render(ms) {
     gl.uniform2f(resLoc, canvas.width, canvas.height);
     gl.uniform1f(timeLoc, ms * 0.001); // ms -> seconds
     gl.drawArrays(gl.TRIANGLES, 0, 6); // draw the 6 vertices as triangles
     requestAnimationFrame(render);
   }
   ```

---

## 6. Things to try

Small edits to `shader.frag` to build intuition:

- **Freeze the animation:** delete `u_time +` from each line — you'll see the
  static gradient underneath the motion.
- **Change the frequency:** replace `6.2831` with `12.566` (4π) → twice as many
  color bands across the screen.
- **Diagonal bands:** use `(uv.x + uv.y)` instead of `uv.x` in the red channel.
- **Radial pattern:** try `float d = distance(uv, vec2(0.5));` then feed `d`
  into the `sin(...)` instead of `uv.x` → rings emanating from the center.
- **Speed:** multiply `u_time` by a factor, e.g. `sin(u_time * 3.0 + ...)`.

---

## Glossary

| Term | Meaning |
| --- | --- |
| **clip space** | WebGL's coordinate system, -1 to +1 on each axis |
| **vertex** | a corner point; input to the vertex shader |
| **fragment** | a candidate pixel; the fragment shader colors it |
| **attribute** | per-vertex input (varies each vertex) |
| **uniform** | per-draw input (same for all vertices/pixels in a frame) |
| **uv** | normalized 2D coordinates, conventionally 0–1 |
| **quad** | a rectangle, here built from two triangles |
| **`gl_FragCoord`** | built-in: current pixel's location in pixels |
| **`gl_Position`** | required vertex-shader output: clip-space position |
| **`gl_FragColor`** | required fragment-shader output: pixel color (rgba) |
