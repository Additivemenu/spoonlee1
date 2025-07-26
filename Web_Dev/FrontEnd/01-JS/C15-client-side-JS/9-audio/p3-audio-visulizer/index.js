const audioEle = document.querySelector("audio");
const cvs = document.querySelector("canvas");
const ctx = cvs.getContext("2d");
function initCvs() {
  // cvs.width = window.innerWidth * devicePixelRatio;
  // cvs.height = (window.innerHeight / 2) * devicePixelRatio;
  cvs.width = window.innerWidth;
  cvs.height = window.innerHeight / 2;
}
initCvs();

let isInit = false;
let dataArray, analyser;
audioEle.onplay = function () {
  if (isInit) {
    return;
  }
  // init audio context and nodes for processing audio data
  const aduCtx = new AudioContext(); // in audCtx, we have a variety of nodes for processing audio data
  const source = aduCtx.createMediaElementSource(audioEle); // 创建音频源节点, 即音频数据的来源
  analyser = aduCtx.createAnalyser(); // 创建分析器节点 用于分析音频数据
  // ! config analyser node:
  analyser.fftSize = 512; // 设置分析器的FFT大小, 该值决定了分析器的精度  FFT: 快速傅立叶变换
  dataArray = new Uint8Array(analyser.frequencyBinCount); // 创建一个无符号字节数组用于存储分析器的频域数据

  source.connect(analyser); // 连接音频源节点和分析器节点
  analyser.connect(aduCtx.destination); // 连接分析器节点和目的地节点

  isInit = true;
};

// draw visualizer on canvas
function draw() {
  requestAnimationFrame(draw);

  // clear canvas
  const { width, height } = cvs;
  ctx.clearRect(0, 0, width, height);

  // 让分析器节点分析出数据到数组中
  if (!isInit) {
    return;
  }
  analyser.getByteFrequencyData(dataArray); // ! 将分析器的频域数据存入数组中
  //   console.log(dataArray);
  const len = dataArray.length / 2; // just visualizing half of the data -> only the low frequency audio data
  const barWidth = width / len / 2;
  ctx.fillStyle = "#78C5F7";
  for (let i = 0; i < len; i++) {
    const data = dataArray[i]; // < 256
    const barHeight = (data / 255) * height;
    const x1 = i * barWidth + width / 2;
    const x2 = width / 2 - (i + 1) * barWidth;
    const y = height - barHeight;
    ctx.fillRect(x1, y, barWidth - 2, barHeight); // right side -> this is the low frequency audio data
    ctx.fillRect(x2, y, barWidth - 2, barHeight); // left side -> we made a mirror effect to the right side
  }
}

draw();
