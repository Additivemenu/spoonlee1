var content = require("./assets/index.css"); //! 事实上, css文件不能直接被require为js module, 我们需要通过loader来处理 (这行代码是给webpack看的)
// 这里这么写, 只是为了开发时舒服方便

console.log(content); //css的源码字符串
