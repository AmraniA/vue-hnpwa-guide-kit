const fs = require('fs')
const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')
const compression = require('compression')
const hackernews = require('firebase-hackernews')

const setupDevServer = require('./build/setup-dev-server')
const createRenderer = require('./build/create-renderer')

const isProd = process.env.NODE_ENV === 'production'

const argv = require('minimist')(process.argv.slice(2))
const port = argv.port || 8080
const watch = argv.watch || false
const app = express()
let renderer

var serviceWorker = fs.readFileSync(
  path.join(__dirname, `./build/service-worker-${isProd ? 'prod' : 'dev'}.js`),
  'utf-8')

// setup server side renderer
if (process.env.NODE_ENV === 'production') {
  bundle = require('./dist/vue-ssr-server-bundle.json')
  clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, { clientManifest })
} else {
  setupDevServer(app).on('ready', ({ bundle, clientManifest }) => {
    renderer = createRenderer(bundle, { clientManifest })
  })
}

app.use(compression({ threshold: 0 }))
app.use('/dist', express.static('./dist'))
app.use('/static', express.static('./static'))
app.use('/manifest.json', express.static('./static/manifest.json'))
app.use('/service-worker.js', express.static('./dist/service-worker.js'))
app.use(favicon('./src/assets/logo-32x32.png'))
app.get('*', (req, res) => {
  const context = {
    title: 'HNPWA with Vue.js',
    url: req.url,
    serviceWorker: serviceWorker
  }

  renderer && renderer.render(context, (code, html) => {
    res.status(code).end(html)
  })
})

// watch mode support realtime updates via firebase apis
Promise.resolve(watch && hackernews().watch()).then(() => {
  app.listen(port, err => {
    if (err) {
      throw err
    }

    console.log(`Ready on http://localhost:${port} watching: ${watch}`)
  })
})