module.exports = {
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/, // 匹配所有的css文件
        use: ["./loaders/style-loader"], // 使用自定义的style-loader来处理css文件
      },
    ],
  },
};
