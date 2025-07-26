var loaderUtil = require("loader-utils");

/**
 *
 * @param {*} buffer - 图片的二进制源码
 * @returns
 */
function loader(buffer) {
  //给的是buffer
  console.log("文件数据大小：(字节)", buffer.byteLength);
  var { limit = 1000, filename = "[contenthash].[ext]" } =
    loaderUtil.getOptions(this);

  if (buffer.byteLength >= limit) {
    var content = getFilePath.call(this, buffer, filename);
  } else {
    var content = getBase64(buffer);
  }
  return `module.exports = \`${content}\``;
}

loader.raw = true; //!该loader要处理的是原始数据, 这使得webpack给这loader传递的是原始的buffer数据，而不是转换后的字符串
module.exports = loader;

// helper functions -----------------------------------------------------------
/**
 *
 * @param {*} buffer - 图片的二进制源码
 * @returns {string} - 返回base64编码的图片数据, string类型
 */
function getBase64(buffer) {
  return "data:image/png;base64," + buffer.toString("base64");
}

/**
 * 将较大的图片文件保存到输出目录，并返回处理后的文件路径
 * @param {*} buffer - 图片的二进制源码
 * @param {*} name - 文件名模板
 * @returns {string} - 返回处理后的文件路径
 */
function getFilePath(buffer, name) {
  var filename = loaderUtil.interpolateName(this, name, {
    content: buffer,
  });
  this.emitFile(filename, buffer); // 将文件写入输出目录
  return filename;
}
