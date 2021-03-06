const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),

    publicPath: '/',
  },
  plugins: [new MiniCssExtractPlugin({ filename: 'css/[name].css' })],
  devServer: {
    contentBase: './dist',
  },
  devtool: 'source-map',
});
