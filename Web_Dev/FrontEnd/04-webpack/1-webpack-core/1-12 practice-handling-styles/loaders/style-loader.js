/**
 * 自定义的style-loader
 * 将检测到的CSS内容插入到页面的style标签中
 * @param {string} sourceCode - CSS源代码
 * @returns {string} - 返回一个JavaScript代码字符串，用于在浏览器中执行; 也就是说, 源代码中的这个css文件内容会被loader替换为如下的js代码
 */
module.exports = function (sourceCode) {
  //! 注意这里只是转化sourceCode string, 并不是去跑源代码!
  var code = `var style = document.createElement("style");

    style.innerHTML = \`${sourceCode}\`;
    document.head.appendChild(style);
    module.exports = \`${sourceCode}\``;
  return code;
};
