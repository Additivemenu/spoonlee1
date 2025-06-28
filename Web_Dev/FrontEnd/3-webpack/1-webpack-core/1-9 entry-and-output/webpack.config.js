var path = require("path")

// https://webpack.js.org/concepts/
module.exports = {
    mode: "production",
    entry: {
        main: "./src/index.js", //名为main的chunk:  属性名：chunk的名称 --> 属性值：入口模块（启动模块）
        a: ["./src/a.js", "./src/index.js"] //名为a的chunk:  启动模块有两个 -- 不过感觉不常见
    },
    output: {
        path: path.resolve(__dirname, "target"), //!必须配置一个绝对路径，表示资源放置的文件夹，默认是dist
        filename: "[name].[chunkhash:5].js" //! 配置的合并过后的js文件的规则, 因为我们有多个chunk, 所以需要动态的文件名 - chunkhash用来解决缓存的问题
    },
    devtool: "source-map"
}
