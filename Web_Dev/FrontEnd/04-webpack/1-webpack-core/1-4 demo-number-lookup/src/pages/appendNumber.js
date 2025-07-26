import isPrime from "../utils/isPrime";
import radColor, { getRandom } from "../utils/radColor";

let divContainer = document.getElementById("divContainer");
let divCenter = document.getElementById("divCenter");

/**
 * dedicated for page element manipulation
 * @param {*} number
 */
export default function appendNumber(number) {
  const isPrimeNumber = isPrime(number);

  const span = document.createElement("span");
  if (isPrimeNumber) {
    const randomColor = radColor();
    span.style.color = randomColor;
    createCenterPrimeNumber(number, randomColor);
  }
  span.innerText = number;

  divContainer.appendChild(span);

  createCenterNumber(number);
}

function createCenterNumber(number) {
  divCenter.innerText = number;
}

/**
 * show special effect on prime number
 * @param {*} number
 */
function createCenterPrimeNumber(number, color) {
  const div = document.createElement("div");
  div.className = "center";
  div.style.color = color;
  div.innerText = number;
  document.body.appendChild(div);

  // 加入div之后, 强制重新渲染页面
  getComputedStyle(div).left; //!只要读取某个位置的位置或尺寸信息, 则会导致浏览器重新渲染 - reflow
  // then the new visual effect will show up
  div.style.transform = `translate(${getRandom(-150, 150)}px, ${getRandom(
    -150,
    150,
  )}px)`;
  div.style.opacity = 0;
}
