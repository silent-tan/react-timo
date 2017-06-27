const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
module.exports = {
  entry: './src/index',
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
    'moment': 'moment',
    'lodash': 'lodash'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'react-timo.js',
    library: 'ReactTimo',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.css', '.scss']
  },
  plugins: [new ExtractTextPlugin('react-timo.css')],
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader?-autoprefixer'
            }, {
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
        })
      }
    ]
  }
};
