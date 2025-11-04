// common config for both dev and prod
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "scripts/[name]-[hash:5].js",
  },
};
