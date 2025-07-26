var MyPlugin = require("./plugins/MyPlugin");

module.exports = {
  mode: "development",
  watch: true, // webpack 监控文件变化, 如果设置为true, 则会在文件变化时自动重新编译
  plugins: [
    new MyPlugin(), //! 注册插件到webpack配置中
  ],
};
