var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
var VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

var config = require('../config')
var utils = require('./utils')

var isProd = process.env.NODE_ENV === 'production'

var webpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: './src/entry-client.js'
  },
  resolve: {
    alias: {
      'firebase-hackernews': 'firebase-hackernews/es'
    }
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config[isProd ? 'build' : 'dev'].productionSourceMap,
      extract: true
    })
  },
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: 'common',
      minChunks: 1
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // // copy custom static assets
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../static'),
    //     to: config.build.assetsSubDirectory,
    //     ignore: ['.*']
    //   }
    // ]),
    new VueSSRClientPlugin()
  ]
})

if (isProd) {
  webpackConfig.plugins.push(
    // service worker caching
    new SWPrecacheWebpackPlugin({
      cacheId: 'vue-hn-pwa-guide',
      filename: 'service-worker.js',
      // staticFileGlobs: ['dist/**/*.{js,html,css,png,svg,json}'],
      dontCacheBustUrlsMatching: /./,
      minify: true,
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
      runtimeCaching: [{
        urlPattern: '/',
        handler: 'networkFirst'
      }, {
        urlPattern: /\/(top|new|show|ask|jobs)/,
        handler: 'networkFirst'
      }, {
        urlPattern: '/item/:id',
        handler: 'networkFirst'
      }, {
        urlPattern: '/user/:id',
        handler: 'networkFirst'
      }]
    })
  )
}

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
