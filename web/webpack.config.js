var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './js/main.jsx',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css$/,
        loader:  ExtractTextPlugin.extract('style', 'css?modules', 'postcss'),
        include: __dirname
      }
    ]
  },
  postcss: function () {
    return [autoprefixer];
  },
  plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      new ExtractTextPlugin("styles.css")
    ]
}
