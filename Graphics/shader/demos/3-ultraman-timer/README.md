# Demo 3 — Ultraman Color Timer ⏱️🔴

奥特曼胸口的**彩色计时器（カラータイマー）**：能量充足时是蓝色、慢慢闪；能量耗尽
时变成红色、急促闪烁，并伴随越来越快的 "哔…哔…哔哔哔" 警报声。

Builds on [Demo 2](../2-sdf-circle/README.md) (same SDF circle + glow). The two
new ideas here:

1. **Driving the shader from JS state** — the "energy" and "blink" are computed
   in JavaScript and passed in as uniforms, instead of derived purely from time.
2. **Sound with the Web Audio API** — synthesizing the beep so it stays perfectly
   in sync with the visual flash. No audio files needed.

```
3-ultraman-timer/
├── index.html   canvas + a "click to start" overlay
├── script.js    timer logic + Web Audio beeps + the WebGL loop
├── shader.frag  the color timer look (blue↔red, blink brightness)
├── shader.vert  unchanged
└── README.md    you are here
```

> ▶️ **Open it and click.** Audio can't autoplay — browsers require a user
> gesture first — so the timer starts (and the sound unlocks) on your click.
> Click again after it empties to reset.

---

## 1. Why compute the timer in JavaScript?

In demos 1–2 everything came from `u_time` inside the shader. Here we *could*
do the blinking in GLSL too — but the **beep has to line up with the flash**,
and the beep is triggered from JavaScript. So JS is the single source of truth:

```
JavaScript (every frame)                     Shader (uniforms)
────────────────────────                     ─────────────────
energy   = drains 1 → 0 over 25s      ──────► u_energy   (hue: blue→red)
blink    = accelerating pulse         ──────► u_flash    (brightness 0→1)
on each new blink → beep()                    (audio, stays in sync)
```

The pattern to notice: **the shader stays a pure function of its uniforms.** All
the *logic* (draining, timing, sound) lives in JS; the shader just *renders* the
state it's handed. That separation is how bigger shader apps are structured.

---

## 2. The accelerating blink (`updateTimer` in `script.js`)

Energy drains linearly, and the blink frequency rises as it empties:

```js
energy = Math.max(0, 1 - elapsed / DRAIN_SECONDS);  // 1 → 0
const freqHz = 1.2 + (1 - energy) * 7.8;            // 1.2Hz calm → 9Hz frantic
```

The tricky part: since `freqHz` **changes over time**, you can't just do
`sin(time * freq)` — the wave would jump. Instead we accumulate a **phase**:

```js
beatPhase += freqHz * dt;          // advance by freq × time-step each frame
const beat = Math.floor(beatPhase); // each whole number = one blink
if (beat > lastBeat) { lastBeat = beat; beep(tone); } // rising edge → beep
```

Accumulating `freq * dt` keeps the motion continuous even while the frequency
speeds up — the standard trick for any variable-rate oscillation. The fractional
part drives the visual flash (bright at onset, decaying):

```js
const frac = beatPhase - Math.floor(beatPhase);
flash = Math.pow(1 - frac, 2.2);   // 1.0 at the beat → fades toward 0
```

---

## 3. The sound (`beep` — Web Audio API)

No `.mp3`/`.wav` file. We build each beep from an **oscillator** (a raw tone
generator) shaped by a **gain envelope** (volume over time):

```js
const osc  = audioCtx.createOscillator();
const gain = audioCtx.createGain();
osc.type = "square";          // square wave → retro electronic buzz
osc.frequency.value = freq;

gain.gain.setValueAtTime(0.0, now);
gain.gain.linearRampToValueAtTime(0.25, now + 0.005);      // fast attack
gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09); // fast decay → "pi"

osc.connect(gain).connect(audioCtx.destination);
osc.start(now); osc.stop(now + 0.1);
```

Concepts:

- **Oscillator** = the sound source. `square` gives the classic 8-bit-ish beep;
  try `"sine"` (soft), `"sawtooth"` (harsh), `"triangle"` (mellow).
- **Gain envelope** = how loud it is over time. The quick up-then-down ramp is
  what makes it a short "pi" instead of a continuous tone.
- **Pitch tracks urgency:** `tone = 620 + (1 - energy) * 520` → higher and more
  alarming as energy drains.
- **The gesture rule:** `AudioContext` starts *suspended*; we create/resume it
  inside the click handler, which is why there's a "click to start" overlay.

---

## 4. The look (`shader.frag`)

Mostly demo 2's circle + glow, with two additions driven by the uniforms:

```glsl
// Hue from energy: red when critical, blue when safe.
vec3 tint = mix(red, blue, smoothstep(0.15, 0.55, u_energy));

// Brightness from the blink, with a dim floor so it never goes fully black.
float bright = mix(0.18, 1.0, u_flash);
```

Plus a hot white **core** (`smoothstep(0.05, 0.0, length(uv))`) so it reads like
a real glowing lamp rather than a flat disk.

---

## 5. Things to try

- **Faster panic:** lower `DRAIN_SECONDS` (e.g. `10`).
- **Different alarm tone:** change `osc.type` to `"sine"`, or bump the pitch
  range in the `tone` formula.
- **Double beep "pi-po":** call `beep()` twice with two pitches and a tiny delay.
- **Shake when critical:** in the shader, when `u_energy` is near 0, offset the
  circle center by a small `sin(u_time * 40.0)` for a nervous vibration.
- **Heartbeat instead:** shape `flash` as two quick pulses per beat (lub-dub).

---

## What's new vs. Demo 2

| Concept | Demo 2 | Demo 3 |
| --- | --- | --- |
| Shader inputs | time + mouse | JS-computed **energy + flash** |
| Who owns the logic | the shader | **JavaScript** (shader just renders) |
| Timing | steady | **accelerating** (phase accumulator) |
| Output | visual only | **visual + synchronized audio** |

**Next idea:** you now have visuals + audio + state. A natural step is combining
several SDFs into one scene (`min`/`max`), then pushing the distance idea into 3D
with **raymarching** — rendering whole worlds from a single fragment shader.
