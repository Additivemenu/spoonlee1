var loaderUtils = require("loader-utils");

module.exports = function (sourceCode) {
  //sourceCode : 变量 a = 1;
  console.log("test-loader运行了");
  var options = loaderUtils.getOptions(this); //! get this loader's options defined in webpack.config.js
  console.log(options);
  var reg = new RegExp(options.changeVar, "g");
  return sourceCode.replace(reg, "var"); //! 将匹配到的字符串changeVar替换为 var
};
