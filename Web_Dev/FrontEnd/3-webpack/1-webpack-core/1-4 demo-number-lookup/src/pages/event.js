import NumberTimer from "../utils/number";
import appendNumber from "./appendNumber";

const numberTimer = new NumberTimer(200);
numberTimer.onNumberCreated = function (number) {
  appendNumber(number);
};

// dedicated for registering event listeners
let isStart = false;

window.onclick = function (e) {
  if (isStart) {
    isStart = false;
    numberTimer.stop();
  } else {
    isStart = true;
    numberTimer.start();
  }
};
