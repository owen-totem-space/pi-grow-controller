const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {},
  experiments: {
    topLevelAwait: true,
  },
};
