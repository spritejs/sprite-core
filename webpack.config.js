const path = require('path');
const fs = require('fs');

module.exports = function (env = {}) {
  let babelConf;

  const babelRC = (env.esnext || env.dev) ? './.es6.babelrc' : './.babelrc';
  if(fs.existsSync(babelRC)) {
    babelConf = JSON.parse(fs.readFileSync(babelRC));
    babelConf.babelrc = false;
  }

  const externals = {};
  const aliasFields = ['browser', 'esnext'];
  const output = {
    path: path.resolve(__dirname, 'dist'),
    filename: env.esnext ? '[name].es6' : '[name]',
    publicPath: '/js/',
    library: 'spritejs',
    libraryTarget: env.esnext ? 'commonjs2' : 'umd',
  };

  if(env.production) {
    output.filename += '.min.js';
  } else {
    output.filename += '.js';
  }

  return {
    mode: env.production ? 'production' : 'none', // production | development | none
    entry: {
      'sprite-core': './src/index',
      'sprite-core-basic': './src/index.basic',
      'sprite-core-dom': './src/index.dom',
    },
    output,

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!(sprite-[\w-]+)\/|svg-path-to-canvas).*/,
          use: {
            loader: 'babel-loader',
            options: babelConf,
          },
        },
      ],

      /* Advanced module configuration (click to show) */
    },
    resolve: {
      aliasFields,
      alias: {
        'sprite-math': 'sprite-math/src/index',
        'svg-path-to-canvas': 'svg-path-to-canvas/src/index',
        'sprite-animator': 'sprite-animator/src/index',
        'sprite-flex-layout': 'sprite-flex-layout/src/index',
        'sprite-timeline': 'sprite-timeline/src/index',
      },
    },
    externals,
    // Don't follow/bundle these modules, but request them at runtime from the environment

    stats: 'errors-only',
    // lets you precisely control what bundle information gets displayed

    devServer: {
      contentBase: path.join(__dirname, env.server || 'example'),
      compress: true,
      port: 9090,
      // ...
    },

    plugins: [
      // ...
    ],
    // list of additional plugins


    /* Advanced configuration (click to show) */
  };
};
