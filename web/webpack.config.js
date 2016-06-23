var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: './js/main.jsx',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
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
        loaders: [ 'style', 'css?modules', 'postcss' ],
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
      })
    ]
}
