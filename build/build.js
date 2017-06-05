require('./check-versions')()

var ora = require('ora')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackServerConfig = require('./webpack.server.conf')
var webpackClientConfig = require('./webpack.client.conf')

function build(webpackConfig, greeting) {
  return new Promise((resolve, reject) => {
    var spinner = ora(greeting)
    spinner.start()

    webpack(webpackConfig, function (err, stats) {
      spinner.stop()

      if (err) {
        reject(err)
      }
      
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      console.log(chalk.cyan('  Build complete.\n'))
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ))

      resolve()
    })
  })
}

build(webpackClientConfig, 'building for client production...')
  .then(() => {
    build(webpackServerConfig, 'building for server production...')
  })
  .catch(err => {
    console.log(err)
  })