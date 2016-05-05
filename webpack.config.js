var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './index.jsx'
  ],
  output: {
    path: __dirname + '/public/javascripts',
    publicPath: 'http://localhost:8080/public/javascripts/',
    filename: "bundle.js"
  },
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
   },
   plugins: [
      new webpack.HotModuleReplacementPlugin()
   ]
}