

const utils = require("./utils");
const htmlWebpackPlugin = require("html-webpack-plugin");
const eslintFrienylyFormate = require("eslint-friendly-formatter");
const config = require("./config");

module.exports = {
  entry: {
    index: utils.resolve('../src/index')
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|js)$/,
        loader: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: eslintFrienylyFormate
            }
          }
        ],
        include: config.projectInclude
      },
      {
        test: /\.vue$/,
        loader: [
          {
            loader: 'vue-loader',
            options: config.vueLoaderOptions
          }
        ],
        include: config.projectInclude
      },
      {
        test: /\.js$/,
        loader: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        include: config.projectInclude
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: utils.resolve('../src/index.html'),
      filename: 'index.html',
      inject: true
    })
  ]
};