var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './index.jsx'
  ],
  output: {
    path: __dirname + '/public/javascripts',
    filename: "bundle.js"
  },
  devtool:'source-map',
  devServer: {
    proxy: {
      '/posts/*': 'http://localhost:5000/'
    }
  },
  module: {
     loaders: [
       {
         test: /\.jsx?$/,
         exclude: /(node_modules)/,
         loaders: ['react-hot', 'babel'],
         include: path.join(__dirname, '')
       }
     ]
   },
   resolve: {
     extensions: ['', '.js', '.jsx']
   }
}