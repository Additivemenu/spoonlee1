module.exports = {
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(png)|(jpg)|(gif)$/, // 匹配图片文件
        use: [
          {
            loader: "./loaders/img-loader.js",
            options: {
              //! 作为loader function的参数:
              limit: 3000, //3000字节以上使用图片，3000字节以内使用base64 string
              filename: "img-[contenthash:5].[ext]", // 输出的图片文件名模板
              // [contenthash:5] - 生成5位的内容哈希值
              // [ext] - 保留原始文件的扩展名
              // 例如：img-abcde.png  这将生成一个类似于 img-abcde.png 的文件名在输出目录中
            },
          },
        ],
      },
    ],
  },
};
