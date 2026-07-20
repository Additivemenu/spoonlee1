const canvas = document.getElementById("glcanvas");
const gl = canvas.getContext("webgl");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
gl.viewport(0, 0, canvas.width, canvas.height);

// --- Compile + link helper ---
function compile(type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    console.error(gl.getShaderInfoLog(s));
  return s;
}

// --- Main: load shaders from files, then set up and render ---
async function main() {
  // Fetch the two shader sources as plain text
  const [vertexSrc, fragmentSrc] = await Promise.all([
    fetch("./shader.vert").then((r) => r.text()),
    fetch("./shader.frag").then((r) => r.text()),
  ]);

  const program = gl.createProgram();
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSrc));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSrc));
  gl.linkProgram(program);
  gl.useProgram(program);

  // --- A full-screen quad (two triangles) ---
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

  // --- Hook up uniforms and animate ---
  const resLoc = gl.getUniformLocation(program, "u_resolution");
  const timeLoc = gl.getUniformLocation(program, "u_time");

  function render(ms) {
    gl.uniform2f(resLoc, canvas.width, canvas.height);
    gl.uniform1f(timeLoc, ms * 0.001); // ms -> seconds
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
