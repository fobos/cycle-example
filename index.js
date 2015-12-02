/* eslint-disable */

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var path = require('path');

var devServer = new WebpackDevServer(webpack(config), {
  contentBase: path.join(__dirname, '.public'),
  publicPath: '/public/',
  historyApiFallback: true
});

devServer.listen(3000, 'localhost', function () {
  console.log('Listening at http://%s:%s', 'localhost', 3000);
});
