const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const isDev = process.env.NODE_ENV === 'development';
const config = {
  entry: {
    'index': ['./demo/index']
  },
  // resolve: {
  //     alias: {}
  // },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[hash].bundle.js',
    publicPath: '/react-timo/build/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      }, {
        test: /\.md$/,
        use: ['babel-loader', 'markdown-it-react-loader']
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff2',
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/octet-stream',
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: ['file-loader']
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/svg+xmm',
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      }, {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader?-autoprefixer', {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  autoprefixer({
                    browsers: ['iOS >= 8', 'Android >= 4.1']
                  }),
                  precss
                ];
              }
            }
          },
          'sass-loader'
        ]
      }, {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'img/[name].[hash].[ext]'
            }
          }
        ]
      }
    ]
    // noParse: []
  },
  plugins: [// new webpack.NoEmitOnErrorsPlugin(),
    new AssetsPlugin({
      filename: 'build/webpack-assets.js',
      processOutput: function(assets) {
        return 'window.WEBPACK_ASSETS = ' + JSON.stringify(assets);
      }
    })]
};
if (!isDev) {
  // 压缩
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}
// // build ++
// const deps = [
//     'react-router/umd/ReactRouter.min.js',
//
//     'redux/dist/redux.min.js',
//     'react-redux/dist/react-redux.min.js',
//
//     'underscore/underscore-min.js',
//     'moment/min/moment.min.js'
// ];
// deps.forEach(function (dep) {
//     config.resolve.alias[dep.split('/')[0]] = dep;
//     config.module.noParse.push(dep);
// });
module.exports = config;
