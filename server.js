const fs = require('fs')
const path = require('path')
const express = require('express')
const compression = require('compression')
const { createBundleRenderer } = require('vue-server-renderer')

const argv = require('minimist')(process.argv.slice(2))
const port = argv.port || 8080
const pkg = require('./package.json')
const isProd = process.env.NODE_ENV === 'production'
const resolve = file => path.resolve(__dirname, file)
const template = fs.readFileSync(resolve('./index.html'), 'utf-8')
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const app = express()

let renderer
let readyPromise

const createRenderer = (bundle, opts) => {
  return createBundleRenderer(bundle, Object.assign({
    template,
    basedir: resolve('./dist'),
    runInNewContext: false
  }, opts))
}

// create a renderer by environment condition. while you in development
// you will be backed in HMR supporting. more details in `./build/dev-server`
// which script came from [vuejs/vue-hackernews-2.0](https://goo.gl/YEoQ6b)
if (isProd) {
  renderer = createRenderer(require('./dist/vue-ssr-server-bundle.json'), {
    clientManifest: require('./dist/vue-ssr-client-manifest.json')
  })
} else {
  readyPromise = require('./build/dev-server')(app, (bundle, opts) => {
    renderer = createRenderer(bundle, opts)
  })
}

// serving static file with max-age
const serve = (path, cache) => express.static(resolve(path), {
   maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

// server-side renderer
const render = (req, res) => {
  const context = {
    title: pkg.description,
    url: req.url
  }

  res.setHeader("Content-Type", "text/html")
  res.setHeader("Server", serverInfo)

  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found')
      } else {
        res.status(500).end('Internal Server Error')
      }
    } else {
      res.end(html)
    }
  })
}

app.use(compression({ threshold: 0 }))
app.use('/dist', serve('./dist', true))
if (isProd) {
  app.use('/service-worker.js', serve('./dist/service-worker.js'))
}

app.get('*', isProd ? 
  render :
  (req, res) => readyPromise.then(() => render(req, res))
)

app.listen(port, err => {
  if (err) {
    throw err
  }

  console.log(`Ready on http://localhost:${port}`)
})
