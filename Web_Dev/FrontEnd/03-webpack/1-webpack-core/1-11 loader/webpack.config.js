module.exports = {
  mode: "development",
  module: {
    //!模块的匹配规则
    rules: [
      { 
        test: /index\.js$/, //regex, 匹配模块的路径
        use: ["./loaders/loader1", "./loaders/loader2"], //匹配到了之后，使用哪些loaders, 形成pipeline
      },
      {
        test: /\.js$/, //regex, 匹配模块的路径
        use: ["./loaders/loader3", "./loaders/loader4"], //匹配到了之后，使用哪些loaders, 形成pipeline
      },
    ],
  },
};
