// const conf = require('./package.json')

module.exports = function (env = {}) {
  const webpack = require('webpack'),
    path = require('path'),
    fs = require('fs')

  const proxyPort = 9091,
    plugins = [],
    jsLoaders = []

  let externals = {}

  if(env.production) {
    // compress js in production environment

    plugins.push(new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false, // remove all comments
      },
      compress: {
        warnings: false,
        drop_console: false,
      },
    }))
  }

  const output = {
    filename: 'sprite-core.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/js/',
    library: 'spritejs',
    libraryTarget: 'umd',
  }

  if(env.production) {
    output.filename = 'sprite-core.min.js'
  } else if(env.module) {
    output.filename = 'sprite-core.module.js'
    output.libraryTarget = 'commonjs2'
    externals = [/^babel-runtime/, 'babel-decorators-runtime']
  }

  if(fs.existsSync('./.babelrc')) {
    // use babel
    const babelConf = JSON.parse(fs.readFileSync('.babelrc'))
    jsLoaders.push({
      loader: 'babel-loader',
      options: babelConf,
    })
  }

  return {
    entry: './src/index.js',
    output,

    plugins,

    module: {
      rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: jsLoaders,
      }],
    },
    externals,

    devServer: {
      open: true,
      proxy: {
        '*': `http://127.0.0.1:${proxyPort}`,
      },
    },
    // devtool: 'inline-source-map',
  }
}
