

const utils = require("./utils");
const htmlWebpackPlugin = require("html-webpack-plugin");
const eslintFrienylyFormate = require("eslint-friendly-formatter");
const config = require("./config");
const webpack = require("webpack");
const manifest= require("../dll-manifest.json");
const svgSpritePlugin = require("svg-sprite-loader/plugin");
const webpackbar = require("webpackbar");
const HappyPack = require("happypack");
const os = require("os");
const threadPool = HappyPack.ThreadPool({size: os.cpus().length});
let svgoLoader = process.env.NODE_ENV === 'production' ? ['svgo-loader']: [];


//  配置多线程loader
let happypackLoaders = [
  new HappyPack({
      id: 'eslint',
      loaders: [
        'cache-loader',
        {
          loader: 'eslint-loader',
          options: {
            formatter: eslintFrienylyFormate
          }
        }
      ],
      threadPool,
      verbose: true
  }),
  new HappyPack({
    id: 'vue',
    loaders: [
      'cache-loader',
      {
        loader: 'vue-loader',
        options: config.vueLoaderOptions            
      }
    ],
    threadPool,
    verbose: true
  }),
  new HappyPack({
    id: 'js',
    loaders: [
      'cache-loader',
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    ],
    threadPool,
    verbose: true
  }) 
];

module.exports = {  
  entry: {
    index: utils.resolve('../src/index')
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|js)$/,
        use: 'happypack/loader?id=eslint',
        include: config.projectInclude
      },
      {
        test: /\.vue$/,
        use: 'happypack/loader?id=vue',
        include: config.projectInclude
      },
      {
        test: /\.js$/,
        use: 'happypack/loader?id=js',
        include: config.projectInclude
      },
      {
        test: /\.(png|gif|jpg|jpeg|webp|svg)$/,
        loader: [
          'cache-loader',
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      //  TODO:解决循环引用问题
      chunksSortMode: 'none',
      template: utils.resolve('../src/index.html'),
      filename: 'index.html',
      inject: true,
      minify: {
        removeComments: process.env.NODE_ENV === 'production',
        collapseWhitespace: process.env.NODE_ENV === 'production',
        removeAttributeQuotes: process.env.NODE_ENV === 'production'
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      vendor: manifest.name + '.js'
    }),
    new webpack.DllReferencePlugin({
      context: utils.resolve("../src"),
      name: 'vendor',
      manifest
    }),
    new svgSpritePlugin(),
    new webpackbar(),
    ...happypackLoaders    
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': utils.resolve("../src"),
      'vue': 'vue/dist/vue.esm.js'
    },
    //  优化项目查找路径
    modules: [
      utils.resolve("../src"),
      utils.resolve("../node_modules")
    ]
  }
};