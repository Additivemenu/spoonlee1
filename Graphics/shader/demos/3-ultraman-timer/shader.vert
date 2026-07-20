// Vertex shader — same full-screen quad as the other demos.
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
