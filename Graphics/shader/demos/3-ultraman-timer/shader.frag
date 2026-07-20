// Fragment shader — Ultraman "Color Timer": a chest light that blinks blue when
// energy is high and flashes red when it runs low.
precision mediump float;

uniform vec2 u_resolution; // canvas size in pixels
uniform float u_time;      // seconds since start (subtle idle shimmer)
uniform float u_energy;    // 1.0 = full (blue/calm), 0.0 = empty (red/frantic)
uniform float u_flash;     // 0..1 per-blink brightness, driven from JS

float sdCircle(vec2 p, vec2 center, float r) {
  return length(p - center) - r;
}

void main() {
  // Centered, aspect-corrected coordinates (see demo 2).
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;

  // The timer sits in the center. A tiny shimmer keeps it feeling "alive".
  float radius = 0.16 + 0.006 * sin(u_time * 8.0);
  float d = sdCircle(uv, vec2(0.0), radius);

  // Energy picks the hue: blue when safe, red when critical.
  vec3 blue = vec3(0.25, 0.6, 1.0);
  vec3 red = vec3(1.0, 0.15, 0.1);
  vec3 tint = mix(red, blue, smoothstep(0.15, 0.55, u_energy));

  // Brightness pulses with the blink. Keep a dim floor so it never fully dies.
  float bright = mix(0.18, 1.0, u_flash);

  // The solid disk (anti-aliased edge) + a glowing halo around it.
  float disk = smoothstep(0.004, 0.0, d);
  float glow = 0.020 / max(d, 0.0001);
  glow = clamp(glow, 0.0, 1.0);

  // A hot white core at the very center makes it read as a bright lamp.
  float core = smoothstep(0.05, 0.0, length(uv));

  vec3 col = (disk + glow * 0.9) * tint * bright;
  col += core * vec3(1.0) * bright * 0.6;

  gl_FragColor = vec4(col, 1.0);
}
