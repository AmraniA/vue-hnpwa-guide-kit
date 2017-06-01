var webpack = require('webpack')
var merge = require('webpack-merge')
var VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
var nodeExternals = require('webpack-node-externals')
var utils = require('./utils')
var base = require('./webpack.base.conf')

module.exports = merge(base, {
  target: 'node',
  devtool: '#source-map',
  entry: './src/entry-server.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  // https://webpack.js.org/configuration/externals/#externals
  // https://github.com/liady/webpack-node-externals
  externals: nodeExternals({
    // `vue-server-renderer-webpack-plugin` recommended to externalize 
    // dependencies in the server build for better build performan
    whitelist: /\.css$/
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin()
  ]
})