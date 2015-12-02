var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: '#inline-source-map',
  entry: {
    bundle: path.join(__dirname, 'src'),
  },
  output: {
    path: path.join(__dirname, '.public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|elm.js)/,
        loaders: ['babel']
      },
      {
        test: /\.elm/,
        loaders: ['elm-webpack']
      }
    ]
  },
  debug: true
};
