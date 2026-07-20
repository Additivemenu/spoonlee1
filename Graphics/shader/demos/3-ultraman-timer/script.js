const canvas = document.getElementById("glcanvas");
const gl = canvas.getContext("webgl");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
gl.viewport(0, 0, canvas.width, canvas.height);

// ─────────────────────────────────────────────────────────────
// AUDIO — synthesize the "pi... pi... pipipi" beep with Web Audio.
// No audio files: we generate each beep from an oscillator on the fly.
// ─────────────────────────────────────────────────────────────
let audioCtx = null;

function initAudio() {
  // Browsers only allow audio to start after a user gesture (the click).
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

// One short electronic "pi". Higher pitch = more urgent.
function beep(freq) {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "square"; // square wave = that retro electronic tone
  osc.frequency.value = freq;

  // Quick attack, fast decay → a crisp blip (~90ms).
  gain.gain.setValueAtTime(0.0, now);
  gain.gain.linearRampToValueAtTime(0.25, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

  osc.connect(gain).connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + 0.1);
}

// ─────────────────────────────────────────────────────────────
// TIMER STATE — energy drains over time; flashing + beeping speed up.
// We compute this in JS (not the shader) so audio stays perfectly in
// sync with the visual blink, then pass the result in as uniforms.
// ─────────────────────────────────────────────────────────────
const DRAIN_SECONDS = 25; // full blue → empty red
let running = false;
let startMs = 0;
let lastMs = 0;
let beatPhase = 0; // accumulates; each whole number = one blink+beep
let lastBeat = -1;

let energy = 1;
let flash = 0;

function startTimer(nowMs) {
  running = true;
  startMs = nowMs;
  lastMs = nowMs;
  beatPhase = 0;
  lastBeat = -1;
}

function updateTimer(nowMs) {
  const dt = Math.min((nowMs - lastMs) / 1000, 0.05); // seconds, clamped
  lastMs = nowMs;

  const elapsed = (nowMs - startMs) / 1000;
  energy = Math.max(0, 1 - elapsed / DRAIN_SECONDS);

  // Blink frequency: calm ~1.2Hz when full, frantic ~9Hz when empty.
  const freqHz = 1.2 + (1 - energy) * 7.8;

  // Advance the beat phase by freq*dt so a changing frequency stays smooth.
  beatPhase += freqHz * dt;

  // Crossed into a new beat? → trigger one blink + one beep.
  const beat = Math.floor(beatPhase);
  if (beat > lastBeat) {
    lastBeat = beat;
    const tone = 620 + (1 - energy) * 520; // 620Hz calm → ~1140Hz urgent
    beep(tone);
  }

  // Visual flash: bright at the beat onset, decaying to the dim floor.
  const frac = beatPhase - Math.floor(beatPhase);
  flash = Math.pow(1 - frac, 2.2);
}

// Click anywhere to start (and to restart once it has emptied).
function handleStart() {
  if (!audioCtx) initAudio();
  if (audioCtx.state === "suspended") audioCtx.resume();
  document.getElementById("hint").classList.add("hidden");
  startTimer(performance.now());
}
canvas.addEventListener("pointerdown", handleStart);
document.getElementById("hint").addEventListener("pointerdown", handleStart);

// ─────────────────────────────────────────────────────────────
// WEBGL BOILERPLATE (same shape as demos 1 & 2)
// ─────────────────────────────────────────────────────────────
function compile(type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    console.error(gl.getShaderInfoLog(s));
  return s;
}

async function main() {
  const [vertexSrc, fragmentSrc] = await Promise.all([
    fetch("./shader.vert").then((r) => r.text()),
    fetch("./shader.frag").then((r) => r.text()),
  ]);

  const program = gl.createProgram();
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSrc));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSrc));
  gl.linkProgram(program);
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const posLoc = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  const resLoc = gl.getUniformLocation(program, "u_resolution");
  const timeLoc = gl.getUniformLocation(program, "u_time");
  const energyLoc = gl.getUniformLocation(program, "u_energy");
  const flashLoc = gl.getUniformLocation(program, "u_flash");

  function render(ms) {
    if (running) updateTimer(ms);

    gl.uniform2f(resLoc, canvas.width, canvas.height);
    gl.uniform1f(timeLoc, ms * 0.001);
    gl.uniform1f(energyLoc, running ? energy : 1.0);
    gl.uniform1f(flashLoc, running ? flash : 0.6);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
