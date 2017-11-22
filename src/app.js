import Vue from 'vue'
import App from './views/App'
import { createRouter } from './router'
import wp from './wordpress-api'
import wpmixin from './mixins/vue-wp-mixin'

Vue.use(wpmixin)

Vue.config.productionTip = false
export function createApp () {
  const router = createRouter()
  const api = wp({endpoint: 'http://wasfa.ywaaw.com/wp-json'})
  const app = new Vue({
    api,
    router,
    render: h => h(App)
  })
  return { app, router, api }
}
