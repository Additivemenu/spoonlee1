// import a from "./a.js"

// console.log("index")

// !node.js env - 可以在本地读取文件
var fs = require("fs"); //内置模块fs，文件处理
var path = require("path");

var abPath = path.resolve(__dirname, "./test.txt");

var content = fs.readFileSync(abPath, {
  encoding: "utf-8",
});

console.log(content);
