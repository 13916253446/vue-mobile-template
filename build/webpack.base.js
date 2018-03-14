

const utils = require("./utils");
const htmlWebpackPlugin = require("html-webpack-plugin");
const eslintFrienylyFormate = require("eslint-friendly-formatter");
const config = require("./config");
const webpack = require("webpack");
const manifest= require("../dll-manifest.json");


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
      inject: true,
      vendor: manifest.name + '.js'
    }),
    new webpack.DllReferencePlugin({
      context: utils.resolve("../src"),
      name: 'vendor',
      manifest
    }),    
  ],
  resolve: {
    alias: {
      '@': utils.resolve("../src"),
      'vue': 'vue/dist/vue.esm.js'
    }
  }
};