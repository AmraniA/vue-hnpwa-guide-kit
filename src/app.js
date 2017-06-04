import Vue from 'vue'
import hackernews from 'firebase-hackernews'
import App from './views/App'
import Hackernews from './mixins/vue-hn-mixin'
import { createRouter } from './router'

Vue.use(Hackernews)

Vue.config.productionTip = false

export function createApp () {
  const router = createRouter()
  const hn = hackernews()
  const app = new Vue({
    hn,
    router,
    render: h => h(App)
  })

  return { app, router, hn }
}
