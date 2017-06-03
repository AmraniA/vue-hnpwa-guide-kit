// DISCLAIMER, the source came from vue-hackernews-2.0/server.js
// https://goo.gl/7oHLbh, and customized
const fs = require('fs')
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')

// create render function with bundle renderer
module.exports = function createRenderer (bundle, opts) {
  const renderer = createBundleRenderer(bundle, Object.assign({
    template: fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8'),
    basedir: path.resolve(__dirname, './dist'),
    runInNewContext: false
  }, opts))

  renderer.render = function (context, done) {
    renderer.renderToString(context, (err, html) => {
      let code = 200

      if (err) {
        code = err.code === 404 ? err.code : 500
        html = err.code === 404 ? 'Page not found' : 'Internal server error'
      }

      done(code, html)
    })
  }

  return renderer
}