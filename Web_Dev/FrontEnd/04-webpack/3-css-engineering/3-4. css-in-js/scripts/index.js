import { applyStyles } from "./css/util.js";
import { border, redBg } from "./css/common.js";
const div1 = document.getElementById("div1");
const div2 = document.getElementById("div2");

// css-in-js: express styles as js objects
const styles = {
  width: "400px",
  height: "500px",
  margin: "0 auto",
};

// custom logic to apply css-in-js to dom elements - in any ways however you want
applyStyles(div1, styles, border(), redBg);
applyStyles(div2, styles, border(5, "green"));
