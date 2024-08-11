class Mypaint {
  static get inputProperties() {
    return ["--gap"];
  }
  paint(ctx, msg, props) {
    const colors = ["#f00", "#ff0", "#0f0", "#f0f", "#00f", "#0ff"];
    const size = 25;
    const gap = +props.get("--gap").toString();
    for (let x = 0; x < msg.width / size; x++) {
      for (let y = 0; y < msg.height / size; y++) {
        // ctx进行绘画
        ctx.fillStyle = colors[(x + y) % colors.length];
        ctx.fillRect(x * (size+gap), y * (size+gap), size, size);
      }
    }
  }
}

registerPaint("mypaint", Mypaint);
