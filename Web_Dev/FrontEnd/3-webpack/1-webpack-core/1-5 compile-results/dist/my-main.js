// merge two modules:
// ./src/a.js
// ./src/index.js

/**
 * 为了防止合并之后出现全局变量污染,
 * 使用function来模拟module
 *
 * 该modules对象保存了所有的模块, 以及模块对应的代码
 */

//! 立即执行函数,直接传入modules对象, 防止污染全局变量
(function (modules) {
  let moduleExports = {}; // 用于缓存模块的导出结果

  //! require函数本质相当于是运行一个模块， 得到模块的导出结果
  //! 这里是webpack模拟的require函数
  function __webpack_require__(moduleId) {
    // 如果模块的导出结果已经缓存, 直接返回
    if (moduleExports[moduleId]) {
      return moduleExports[moduleId];
    }

    let func = modules[moduleId];
    const module = {
      exports: {},
    };
    func(module, module.exports, __webpack_require__); // 运行模块

    const result = module.exports;
    moduleExports[moduleId] = result; // record the result of the module in cache
    return result; // 返回模块的导出结果
  }

  // 执行入口模块
  __webpack_require__("./src/index.js"); //! require函数本质相当于是运行一个模块， 得到模块的导出结果
})({
  "./src/a.js": function (module, exports) {
    console.log("module a");
    module.exports = "a";
  },
  "./src/index.js": function (module, exports, __webpack_require__) {
    console.log("index module");
    const a = __webpack_require__("./src/a.js");
    console.log(a);
  },
});
