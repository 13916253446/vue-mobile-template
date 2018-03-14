
const webpackMerge = require("webpack-merge");
const webpackCommon = require("./webpack.base");
const utils = require("./utils");
const config = require("./config");
const loader = require("./loader");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const uglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

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
  optimization: {
    'minimizer': [
      new uglifyjsWebpackPlugin({
        parallel: true,
        sourceMap: false
      })
    ],
    "noEmitOnErrors": true,     
    'runtimeChunk': {
      name: 'runtime'
    },
    'splitChunks': {
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'all',
          minSize: 1024*10,
          minChunks: 2,
          enforce: true,
        },
        vendor: {
          chunks: 'initial',
          name: 'node',
          priority: -10,
          test: /node_modules\/(.*)\.js/
        }
      },
    }
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: 'css/common.[chunkhash:8].css',
      chunkFilename: 'css/async/common.[chunkhash:8].css'
    }), 
    new BundleAnalyzerPlugin({
      analyzerPort: 8880,
      openAnalyzer: true
    })   
  ]
});