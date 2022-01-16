const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        popup: './popup_ui/src/popup.jsx',
        content: './content_scripts/js/content.js',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
    module: {
        rules: [{
             test: /\.(js|jsx)$/,
             exclude: /node_modules/,
             use: {
                 loader: 'babel-loader',
                 options: {
                     presets: [
                         '@babel/preset-env',
                         '@babel/preset-react'
                     ]
                 }
             }
        },
        {
            test: /\.(css)$/,
            use: ['css-loader']
        }
    ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './popup_ui/public/index.html',
            filename: 'index.html'
        }),
        new CopyPlugin({
            patterns:[
                {from: './assets'},
                {from: './build.manifest.json', to: 'manifest.json'},
                {from: './content_scripts/css', to: 'css'}
            ]
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
          })
    ]
}