import Vue from 'vue'
import { createApp } from './app'

// global mixin to handle data during navigates
// asyncData called between /foo/1 and /foo/2
// [vue-hackernews-2.0/entry-client.js](https://goo.gl/OsZXCw)
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({ api, route: to }).then(next).catch(next)
    } else {
      next()
    }
  }
})

// create a client-side app
const { app, router, api } = createApp()

// hydrating initial state into global object on client
if (window.__INITIAL_STATE__) {
 // hn.dataCached(window.__INITIAL_STATE__)
}

// [navigation guards](https://goo.gl/Mmgqhj)
router.onReady(() => {
  // handling asyncData. after all in-component guards and
  // async route components are resolved.
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false

    // rotue under same path matched same component
    // handle asyncData in navigation between subpath
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })

    if (!activated.length) {
      return next()
    }

    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({ api, route: to })
      }
    })).then(() => {
      next()
    }).catch(next)
  })

  app.$mount('#app')
})
