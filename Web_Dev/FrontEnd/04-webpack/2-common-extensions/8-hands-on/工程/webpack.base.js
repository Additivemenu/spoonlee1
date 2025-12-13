//公共配置
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: {
    // 多页面app, 我们想要有多个入口
    // chunk name: entry file path
    list: "./src/list/index.js",
    detail: "./src/detail/index.js",
  },
  output: {
    filename: "scripts/[name].[chunkhash:5].js",
  },
  resolve: {
    // 配置路径别名 - 方便引用
    // e.g. import { getProvinces } from "@/util/areaService"
    // @ 就是 src 目录的别名
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  stats: {
    modules: false,
    colors: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/list.html",
      filename: "list.html",
      chunks: ["list"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/detail.html",
      filename: "detail.html", 
      chunks: ["detail"],
    }),
    // copy public folder to dist - a bit like docker COPY command
    new CopyWebpackPlugin([{ from: "./public", to: "./" }]),
  ],
};
