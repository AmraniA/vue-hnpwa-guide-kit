import { createApp } from './app'

// the context called repeatedly for each render
// [Source Code Structure · GitBook](https://goo.gl/UKYgvr)
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, api } = createApp()

    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      // manage a server route error
      if (!matchedComponents.length) {
        reject({ code: 404 })
      }

      // request data asynchronously in matched component
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({ api, route: router.currentRoute })
        }
      })).then(() => {
        // flush init state to hydrate a client
        // context.state = api.dataCached()
        resolve(app)
      })
    }, reject)
  })
}
