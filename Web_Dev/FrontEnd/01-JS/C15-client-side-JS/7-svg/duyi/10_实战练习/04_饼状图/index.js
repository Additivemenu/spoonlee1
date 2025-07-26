draw({
  title: "前端各课程时长(h)",
  id: "#svg",
  xAxis: true,
  yAxis: true,
});

const data = [
  { text: "HTML5", value: 20 },
  { text: "CSS3", value: 30 },
  { text: "Vue", value: 120 },
  { text: "Javascript", value: 100 },
  { text: "React", value: 90 },
  { text: "jQuery", value: 30 },
];

//准备
const NS = "http://www.w3.org/2000/svg";
const svg = document.querySelector("#svg");
//计算数据的总值， 后面用来计算角度  deg/360 == value/sum
const sum = data.map((obj) => obj.value).reduce((v1, v2) => v1 + v2);
const originPoint = { x: 100, y: 100 };
const r1 = 80; //正常绘制弧的半径
const r2 = 82; //高亮时绘制弧的半径
const r3 = 85; //计算提示线的弧的半径
//随机产生0-255之间的数字
function randomColorNumber() {
  return parseInt(Math.random() * 256);
}
//随机产生颜色
function randomColor() {
  return `rgb(${randomColorNumber()},${randomColorNumber()},${randomColorNumber()})`;
}

//计算圆弧上的点（默认右上角象限，与y轴夹角）
function calcPoint(origin, r, deg) {
  return {
    x: origin.x + Math.sin((deg * Math.PI) / 180) * r,
    y: origin.y - Math.cos((deg * Math.PI) / 180) * r,
  };
}

//计算当前部分数据所对应的角度。
function caclDeg(currValue, sumValue) {
  return (currValue / sumValue) * 360;
}

//绘制弧形
let startPoint = { x: 100, y: 20 };
let lastDeg = 0;
data.forEach((obj, i) => {
  const g = document.createElementNS(NS, "g");
  g.classList.add("part");
  g.setAttribute("text", obj.text);
  g.setAttribute("value", obj.value);
  svg.appendChild(g);

  const color = randomColor();
  const currDeg = caclDeg(obj.value, sum);
  const endPoint = calcPoint(originPoint, r1, currDeg + lastDeg);
  //注意大圆小圆问题。角度>180 画大圆。 否则画小圆
  const flag = currDeg >= 180 ? 1 : 0;
  g.setAttribute("currDeg", currDeg);
  g.setAttribute("lastDeg", lastDeg);

  //绘制圆弧
  const path = document.createElementNS(NS, "path");
  let d = "";
  d += `M${25 + originPoint.x} ${25 + originPoint.y}`;
  d += `L${25 + startPoint.x} ${25 + startPoint.y}`;
  d += `A${r1} ${r1} 0 ${flag} 1 ${25 + endPoint.x} ${25 + endPoint.y}`;
  d += "Z";
  path.setAttribute("fill", color);
  path.setAttribute("d", d);
  g.appendChild(path);

  //绘制折线
  //基于当前数据弧对应角度的一半 + r3 半径来计算折线点。
  const polyPoint = calcPoint(originPoint, r3, currDeg / 2 + lastDeg);
  const polyline = document.createElementNS(NS, "polyline");
  let points = "";
  const unit = polyPoint.x >= originPoint.x ? 5 : -5;
  points += `${25 + originPoint.x} ${25 + originPoint.y} ,`;
  points += `${25 + polyPoint.x} ${25 + polyPoint.y} ,`;
  points += `${25 + polyPoint.x + unit} ${25 + polyPoint.y}`;
  polyline.setAttribute("stroke", color);
  polyline.setAttribute("points", points);
  g.appendChild(polyline);

  //绘制文字
  const text = document.createElementNS(NS, "text");
  text.setAttribute("x", 25 + polyPoint.x + unit + unit);
  text.setAttribute("y", 25 + polyPoint.y + 3);
  text.innerHTML = obj.text;
  if (unit < 0) {
    text.classList.add("left");
  }
  g.appendChild(text);

  //此时第一个弧就绘制结束了。接下来就通过循环准备绘制第二个弧了
  //绘制第二个弧时，起始点变成了上一个弧的终点。
  //计算第二个弧的终点时，依然要基于y轴角度计算。所以还要加上上一个弧的角度。
  startPoint = endPoint;
  lastDeg += currDeg;
});

//实现鼠标移入移出时的动态效果
const panel = document.querySelector("#data-panel");
svg.onmouseover = function (e) {
  if (
    e.target.parentNode.tagName === "g" &&
    e.target.parentNode.classList.contains("part")
  ) {
    //显示文字
    const text = e.target.parentNode.getAttribute("text");
    const value = e.target.parentNode.getAttribute("value");
    const currDeg = e.target.parentNode.getAttribute("currDeg");
    const lastDeg = e.target.parentNode.getAttribute("lastDeg");

    const path = e.target.parentNode.querySelector("path");
    function show(e) {
      panel.innerHTML = `${text} : ${value}`;
      panel.style.display = "block";
      panel.style.left = e.clientX + 10 + "px";
      panel.style.top = e.clientY + 5 + "px";
    }
    show(e);

    //单独绘制弧
    function drawArc(origin, r, currDeg, lastDeg) {
      const sp = calcPoint(origin, r, lastDeg);
      const ep = calcPoint(origin, r, parseFloat(currDeg) + parseFloat(lastDeg));
      const flag = currDeg >= 180 ? 1 : 0;
      let d = "";
      d += `M${25 + origin.x} ${25 + origin.y}`;
      d += `L${25 + sp.x} ${25 + sp.y}`;
      d += `A${r} ${r} 0 ${flag} 1 ${25 + ep.x} ${25 + ep.y}`;
      d += "Z";
      path.setAttribute("d", d);
    }
    drawArc(originPoint, r3, currDeg, lastDeg);

    e.target.onmousemove = function (e) {
      show(e);
    };

    e.target.onmouseout = function () {
      panel.style.display = "none";
      drawArc(originPoint, r1, currDeg, lastDeg);
      this.onmouseout = null;
      this.onmousemove = null;
    };
  }
};
