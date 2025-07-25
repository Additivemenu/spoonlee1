// 未知数 a = 1;
// 未知数 b = 3
require("./a");

// webpack 打包本index.js时, 打印顺序
// loader4 -> index.js匹配的loader
// loader3 -> index.js
// loader2 -> index.js
// loader1 -> index.js
// loader4 -> a.js匹配的loader
// loader3 -> a.js
