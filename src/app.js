import Vue from 'vue'
import App from './views/App'
import { createRouter } from './router'

Vue.config.productionTip = false

export function createApp () {
  const router = createRouter()
  const app = new Vue({
    router,
    render: h => h(App)
  })

  return { app, router }
}
