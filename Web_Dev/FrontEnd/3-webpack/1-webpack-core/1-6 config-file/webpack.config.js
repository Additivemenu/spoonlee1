// write node.js code here

// In webpack config file, you can only use commonJS to export. Why?
// because during bundling process, webpack.config.js file will be run in node.js environment, and node.js uses commonJS by default
module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
  },
};
