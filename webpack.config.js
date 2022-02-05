const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    popup: './popup_ui/src/popup.jsx',
    content: './content_scripts/js/content.js'
  },
  output: {
    publicPath: '',
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }]
            ],
            plugins: ['@babel/transform-runtime']
          }
        }
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './popup_ui/public/index.html',
      filename: 'index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: './assets' },
        { from: './manifest.json' },
        { from: './content_scripts/css', to: 'css' }
      ]
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ],
  devtool: 'cheap-module-source-map',
  devServer: {
    devMiddleware: {
      writeToDisk: true
    },
    static: {
      directory: path.resolve(__filename, 'manifest.json'),
      watch: false
    },
    compress: true,
    port: 9000
  },
  experiments: {
    topLevelAwait: true
  }
};
