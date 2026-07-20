// Vertex shader — just positions two triangles that cover the whole screen.
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
