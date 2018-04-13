//  happypack编译loader

const miniCssExtractPlugin = require("mini-css-extract-plugin");
const HappyPack = require("happypack");
const os = require("os");
const threadPool = HappyPack.ThreadPool({size: os.cpus().length});

let defaultCssLoader = [  
  {
    loader: 'css-loader'
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true
    }
  }
]

let createCssLoader = (type = 'css', options = {}) => {
  let { extract, baseStyle } = options;
  let currentLoaders = [];

  //配置的变量文件
  if (baseStyle) {
     if (type === 'stylus' || type === 'styl') {
      currentLoaders = [
        {
          loader:"stylus-loader",
          options: {
            import: baseStyle
          }
        },        
        {
          loader: 'style-resources-loader',
          options: {
            patterns: [baseStyle]
          }
        }
      ]
     }
  } else {
    if (type === 'stylus' || type === 'styl') {
      currentLoaders = [
        'stylus-loader'       
      ]
     }
  }

  if (extract) {
   return [
     'cache-loader',
    miniCssExtractPlugin.loader,
    ...defaultCssLoader,
    ...currentLoaders
   ]
  } else {
    return [
      'cache-loader',
      'style-loader',
      ...defaultCssLoader,
      ...currentLoaders
    ]
  }
};

let createCssPlugin =  (type = 'css', options = {}) => {
 return (new HappyPack({
    id: type,
    loaders: createCssLoader(type, options),
    threadPool,
    verbose: true
  })) 
};

module.exports = {
  createCssPlugin
}