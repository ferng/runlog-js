const nodeExternals = require('webpack-node-externals');
module.exports = {
  mode: 'production',
  target: "node",
  node: {
      __dirname: false,
      __filename: false,
  },
  entry: {
    app: ["./server.js"]
  },
  output: {
    path: __dirname,
    filename: "bundle-back.js"
  },
  externals: [nodeExternals()],
};
