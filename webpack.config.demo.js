const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const config = {
  entry: {
    'index': ['./demo/index']
  },
  resolve: {
    alias: {
      'react-timo': path.resolve(__dirname, 'src/index.js'),
      'demo-component': path.resolve(__dirname, 'demo/component/Common.js')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production") 
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false,
      drop_console: true
    }),
    new AssetsPlugin({
      filename: 'build/webpack-assets.js',
      processOutput: function(assets) {
        return 'window.WEBPACK_ASSETS = ' + JSON.stringify(assets);
      }
    })
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[hash].bundle.js',
    publicPath: '/build/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
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
  }
};

module.exports = config;