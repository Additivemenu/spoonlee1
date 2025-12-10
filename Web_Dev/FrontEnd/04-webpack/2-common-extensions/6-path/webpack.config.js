const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  output: {
    filename: "scripts/[name].[chunkhash:5].js",
    publicPath: "/", // 一些loader, plugin 会使用这种这个webpack config, 作为生成的资源路径前缀 - '/' 就代表一个绝对路径了
  },
  module: {
    rules: [
      {
        test: /\.(png)|(gif)|(jpg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "imgs/[name].[hash:5].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "html/index.html",
    }),
  ],
  devServer: {
    open: true,
    openPage: "html/index.html",
  },
  stats: {
    modules: false,
    colors: true,
  },
};
