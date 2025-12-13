//开发环境 特有的配置
module.exports = {
  mode: "development",
  devServer: {
    open: true, // 自动打开浏览器
    openPage: "list.html", // 打开的页面
    proxy: {
      // 代理配置 - 解决dev env跨域问题
      "/api": {
        target: "http://yuanjin.tech:5100/",
        changeOrigin: true,
      },
    },
  },
};
