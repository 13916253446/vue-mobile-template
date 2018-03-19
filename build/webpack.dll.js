const path = require("path");
const webpack = require("webpack");
const uglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");

let uglifyjs = process.env.NODE_ENV == 'production' ? [new uglifyjsWebpackPlugin({
  parallel: true,
  sourceMap: false
})] : [];
module.exports ={
  entry: {
    vendor: [path.resolve(__dirname, './dll.js')]
  },
  output: {    
    path: path.join(__dirname, '../dist'),
    filename: 'js/dll/[name].dll.[chunkhash:8].js',
    library: '[name]'
  },
  optimization: {
    minimizer: [...uglifyjs]
  }, 
  plugins: [
    new webpack.DllPlugin({
      context: path.resolve(__dirname, "../src"),
      name: 'js/dll/[name].dll.[chunkhash:8]',
      path: path.resolve(__dirname, '../dll-manifest.json')        
    })
  ],
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
};