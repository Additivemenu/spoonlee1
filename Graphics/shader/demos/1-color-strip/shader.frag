// Fragment shader — runs once per pixel, every frame. Produces an animated color.
precision mediump float;

uniform vec2 u_resolution;  // canvas size in pixels
uniform float u_time;       // seconds since start

void main() {
  // Normalize pixel coords to 0.0 - 1.0
  vec2 uv = gl_FragCoord.xy / u_resolution;

  // Animate colors using time + position
  float r = 0.5 + 0.5 * sin(u_time + uv.x * 6.2831);
  float g = 0.5 + 0.5 * sin(u_time + uv.y * 6.2831 + 2.0);
  float b = 0.5 + 0.5 * sin(u_time + 4.0);

  gl_FragColor = vec4(r, g, b, 1.0);
}
