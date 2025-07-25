const path = require("path");

// resolve relative path to absolute path: 
const res = path.resolve(__dirname, "./pathtest.js"); // 绝对路径
console.log("res:", res); 

const res2 = path.resolve('./', '233', 'wow')  // './' 代表node的运行目录 
console.log("res2:", res2); // 绝对路径