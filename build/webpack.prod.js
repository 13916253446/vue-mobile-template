
const webpackMerge = require("webpack-merge");
const webpackCommon = require("./webpack.base");
const utils = require("./utils");
const config = require("./config");
const loader = require("./loader");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

let cssLoader = ['css', 'styl'].map(item => {
  return {
    test: new RegExp(`\.${item}$`),
    loader: loader.createCssLoader(item, {
      baseStyle: utils.resolve('../src/styles/var.styl'),
      extract: true
    }),
    include: config.projectInclude   
  }
});

module.exports =webpackMerge(webpackCommon, {
  output: {
    path: utils.resolve('../dist'),
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/async/[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      ...cssLoader
    ]
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: 'css/common.[chunkhash:8].css',
      chunkFilename: 'css/async/common.[chunkhash:8].css'
    })
  ]
});