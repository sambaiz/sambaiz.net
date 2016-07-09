var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: './js/server.js',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
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
        loaders: ['isomorphic-style', 'css?modules'],
        include: __dirname
      },
      { test: /\.json$/, loader: "json-loader"}
    ]
  },
  plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ]
}
