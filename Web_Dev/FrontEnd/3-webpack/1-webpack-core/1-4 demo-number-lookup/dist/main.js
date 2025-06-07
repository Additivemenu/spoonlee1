/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pages_event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/event */ \"./src/pages/event.js\");\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/pages/appendNumber.js":
/*!***********************************!*\
  !*** ./src/pages/appendNumber.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return appendNumber; });\n/* harmony import */ var _utils_isPrime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/isPrime */ \"./src/utils/isPrime.js\");\n/* harmony import */ var _utils_radColor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/radColor */ \"./src/utils/radColor.js\");\n\n\n\nlet divContainer = document.getElementById(\"divContainer\");\nlet divCenter = document.getElementById(\"divCenter\");\n\n/**\n * dedicated for page element manipulation\n * @param {*} number\n */\nfunction appendNumber(number) {\n  const isPrimeNumber = Object(_utils_isPrime__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(number);\n\n  const span = document.createElement(\"span\");\n  if (isPrimeNumber) {\n    const randomColor = Object(_utils_radColor__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n    span.style.color = randomColor;\n    createCenterPrimeNumber(number, randomColor);\n  }\n  span.innerText = number;\n\n  divContainer.appendChild(span);\n\n  createCenterNumber(number);\n}\n\nfunction createCenterNumber(number) {\n  divCenter.innerText = number;\n}\n\n/**\n * show special effect on prime number\n * @param {*} number\n */\nfunction createCenterPrimeNumber(number, color) {\n  const div = document.createElement(\"div\");\n  div.className = \"center\";\n  div.style.color = color;\n  div.innerText = number;\n  document.body.appendChild(div);\n\n  // 加入div之后, 强制重新渲染页面\n  getComputedStyle(div).left; //!只要读取某个位置的位置或尺寸信息, 则会导致浏览器重新渲染 - reflow\n  // then the new visual effect will show up\n  div.style.transform = `translate(${Object(_utils_radColor__WEBPACK_IMPORTED_MODULE_1__[\"getRandom\"])(-150, 150)}px, ${Object(_utils_radColor__WEBPACK_IMPORTED_MODULE_1__[\"getRandom\"])(\n    -150,\n    150,\n  )}px)`;\n  div.style.opacity = 0;\n}\n\n\n//# sourceURL=webpack:///./src/pages/appendNumber.js?");

/***/ }),

/***/ "./src/pages/event.js":
/*!****************************!*\
  !*** ./src/pages/event.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/number */ \"./src/utils/number.js\");\n/* harmony import */ var _appendNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./appendNumber */ \"./src/pages/appendNumber.js\");\n\n\n\nconst numberTimer = new _utils_number__WEBPACK_IMPORTED_MODULE_0__[\"default\"](200);\nnumberTimer.onNumberCreated = function (number) {\n  Object(_appendNumber__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(number);\n};\n\n// dedicated for registering event listeners\nlet isStart = false;\n\nwindow.onclick = function (e) {\n  if (isStart) {\n    isStart = false;\n    numberTimer.stop();\n  } else {\n    isStart = true;\n    numberTimer.start();\n  }\n};\n\n\n//# sourceURL=webpack:///./src/pages/event.js?");

/***/ }),

/***/ "./src/utils/isPrime.js":
/*!******************************!*\
  !*** ./src/utils/isPrime.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return isPrime; });\nfunction isPrime(num) {\n  if (num <= 1) return false;\n\n  for (let i = 2; i <= num - 1; i++) {\n    if (num % i === 0) return false;\n  }\n\n  return true;\n}\n\n\n//# sourceURL=webpack:///./src/utils/isPrime.js?");

/***/ }),

/***/ "./src/utils/number.js":
/*!*****************************!*\
  !*** ./src/utils/number.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return NumberTimer; });\nclass NumberTimer {\n  constructor(duration = 500) {\n    this.duration = duration;\n    this.number = 1; // current number\n    this.onNumberCreated = null; // !triggered when a new number is created\n    this.timerId = null;\n  }\n\n  start() {\n    if (this.timerId) return;\n\n    this.timerId = setInterval(() => {\n      this.onNumberCreated &&\n        this.onNumberCreated(this.number);\n\n      this.number++;\n    }, this.duration);\n  }\n\n  stop() {\n    clearInterval(this.timerId);\n    this.timerId = null;\n  }\n}\n\n\n//# sourceURL=webpack:///./src/utils/number.js?");

/***/ }),

/***/ "./src/utils/radColor.js":
/*!*******************************!*\
  !*** ./src/utils/radColor.js ***!
  \*******************************/
/*! exports provided: getRandom, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getRandom\", function() { return getRandom; });\nconst colors = [\n  \"#f26395\",\n  \"#62efab\",\n  \"#ef7658\",\n  \"#ffe868\",\n  \"#80e3f7\",\n  \"#d781f9\",\n];\nfunction getRandom(min, max) {\n  return Math.floor(Math.random() * (max - min) + min);\n}\n/**\n * 返回一个随机的颜色\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  const index = getRandom(0, colors.length);\n  return colors[index];\n});\n\n\n//# sourceURL=webpack:///./src/utils/radColor.js?");

/***/ })

/******/ });