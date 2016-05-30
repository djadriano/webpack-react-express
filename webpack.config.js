var path = require('path');
var webpack = require('webpack');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');
var postcssImport = require('postcss-import');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var rucksack = require('rucksack-css');
var stylelint = require("stylelint");
var rootPath = path.resolve( __dirname );

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './client/source/javascripts/index.jsx'
  ],
  output: {
    path: path.resolve(rootPath, 'public'),
    filename: "bundle.js"
  },
  devServer: {
    proxy: {
      '/posts': {
        target: 'http://localhost:5000',
        secure: false
      }
    }
  },
  module: {
     loaders: [
       {
         test: /\.jsx?$/,
         exclude: /(node_modules)/,
         loaders: ['react-hot', 'babel']
       },
       {
          test: /\.scss$/,
          loaders: ['style', 'css', 'postcss', 'sass']
       }
     ]
   },
   resolve: {
     extensions: ['', '.js', '.jsx', '.scss']
   },
   postcss: function (webpack) {
      return [
        precss,
        autoprefixer,
        rucksack,
        stylelint(),
        postcssImport({
          addDependencyTo: webpack
        })
      ];
   },
   plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: './client/layouts/index.html'
      })
   ]
}
