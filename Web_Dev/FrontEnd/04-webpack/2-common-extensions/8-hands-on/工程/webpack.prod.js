//生产环境 特有的配置
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
module.exports = {
    mode: "production",
    plugins: [
        new CleanWebpackPlugin(),
    ]
}
