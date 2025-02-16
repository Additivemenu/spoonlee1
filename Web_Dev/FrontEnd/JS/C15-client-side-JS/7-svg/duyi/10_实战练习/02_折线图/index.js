draw({
  title: "前段视频周播放量（天）",
  id: "#svg",
  yAxis: false,
  color: "#abf",
});

//准备数据
const data = [
  { text: "周一", value: 200 },
  { text: "周二", value: 550 },
  { text: "周三", value: 60 },
  { text: "周四", value: 300 },
  { text: "周五", value: 240 },
  { text: "周六", value: 180 },
  { text: "周日", value: 360 },
];

//左侧数值的绘制设计：
//  找到最大值， 将其分成5份，绘制出6个数值
//  假设最大值500 / 5 = 100  0 100 200 300 400 500
//让折线不顶边。做一个向上去整的处理
//  max(500) -- 500
//  max(450) -- 500
//  max(1250) -- 2000
//  三位数 基准100 ， 四位数 基准1000 ，最大值除不尽基准，达到下一个基准倍数

function calcUpLimit(maxValue) {
  const len = (maxValue + "").length;
  const unit = Math.pow(10, len - 1);
  return maxValue % unit == 0
    ? maxValue
    : (parseInt(maxValue / unit) + 1) * unit;
}

const maxValue = data
  .map((obj) => obj.value)
  .reduce((v1, v2) => Math.max(v1, v2));
const upLimit = calcUpLimit(maxValue);
//计算缩放比例
const ratio = 200 / upLimit;

//准备
const NS = "http://www.w3.org/2000/svg";
const svg = document.querySelector("#svg");

//绘制左侧数值
const count = 5;
const yDataSpace = upLimit / count;
const ySpace = 200 / count;

let g = document.createElementNS(NS, "g");
g.classList.add("y-text");
svg.appendChild(g);
for (let i = 0; i <= count; i++) {
  const text = document.createElementNS(NS, "text");
  text.innerHTML = i * yDataSpace;
  text.setAttribute("x", 20);
  text.setAttribute("y", 225 - i * ySpace);
  g.appendChild(text);
}

//绘制底部的线
const xSpace = 200 / data.length;
g = document.createElementNS(NS, "g");
g.classList.add("x-line");
svg.appendChild(g);
let d = "";
for (let i = 0; i <= data.length; i++) {
  d += `M${25 + i * xSpace} 225V230`;
}
const path = document.createElementNS(NS, "path");
path.setAttribute("d", d);
g.appendChild(path);

//绘制底部的文字
g = document.createElementNS(NS, "g");
g.classList.add("x-text");
svg.appendChild(g);
data.forEach((obj, i) => {
  const text = document.createElementNS(NS, "text");
  text.innerHTML = obj.text;
  text.setAttribute("x", 25 + i * xSpace + xSpace / 2);
  text.setAttribute("y", 235);
  g.appendChild(text);
});

//绘制线
let points = "";
data.forEach((obj, i) => {
  points += `${25 + i * xSpace + xSpace / 2} ${225 - obj.value * ratio}`;
  if (i < data.length - 1) {
    points += ",";
  }
});
const polyline = document.createElementNS(NS, "polyline");
polyline.classList.add("data-line");
polyline.setAttribute("points", points);
svg.appendChild(polyline);

//绘制数据圆
g = document.createElementNS(NS, "g");
g.classList.add("data-circle");
svg.appendChild(g);
data.forEach((obj, i) => {
  const circle = document.createElementNS(NS, "circle");
  circle.setAttribute("cx", 25 + i * xSpace + xSpace / 2);
  circle.setAttribute("cy", 225 - obj.value * ratio);
  circle.setAttribute('value',obj.value);
  g.appendChild(circle);
});



//扩展： 鼠标点在圆点上，显示对应数值
svg.onmouseover = function(e){
    if(e.target.tagName === 'circle'){
       const left = e.clientX + 5 + 'px';
       const top = e.clientY + 5 + 'px'  ;
       const panel = document.querySelector('#data-panel');
       panel.style.left = left ;
       panel.style.top = top ;
       panel.style.display = 'block' ;
       panel.innerHTML = e.target.getAttribute('value');

       e.target.onmouseout = function(){
        panel.style.display = 'none';
        e.target.onmouseout = null ;
       }
    }
}