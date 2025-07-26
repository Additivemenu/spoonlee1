const box = document.querySelector(".box");

// 获取元素样式
// window.getComputedStyle();
// const width = getComputedStyle(box).width;

// 设置元素样式
// dom.style.property = value;
// box.style.opacity = 0.5;
// box.style.opacity += .1;
// 运算问题
// 错误问题

// 获取元素样式
// Element.prototype.computedStyleMap();
// const map = box.computedStyleMap();
// const styleMap = box.attributeStyleMap;
// styleMap.set('opacity', '.1');

// 值计算
// const value = CSS.px(20).add(CSS.percent(40));
// 表达式 （构造函数）
// const value1 = new CSSMathSum(CSS.px(100), CSS.px(100));
// const v1 = new CSSMathInvert(CSS.number(10));
// const v2 = new CSSMathProduct(value1, v1);
// const v3 = new CSSMathSum(CSS.percent(10), new CSSMathNegate(CSS.px(100)))

// CSS 变换

const rotate = new CSSRotate(CSS.deg(0));

const transform = new CSSTransformValue([rotate]);
// transfrom: rotate(0deg);

box.onmouseenter = function () {
  draw();
};
box.onmouseleave = function () {
  clearInterval(rid);
};
let rid = null;

function draw() {
  rid = setInterval(function () {
    rotate.angle.value += 5;
    box.attributeStyleMap.set("transform", transform);
  }, 1000 / 60);
}

// function draw() {
//   rid = requestAnimationFrame(draw);
//   rotate.angle.value += 5;
//   box.attributeStyleMap.set('transform', transform);
// }
