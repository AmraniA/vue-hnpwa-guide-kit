
const create = (config) => {
  const WPAPI = require('wpapi')
  const api = new WPAPI({endpoint: config.endpoint})

  const getPosts = () => {
    return api.posts()
  }
  const getApi = () => api
  return {
    // a list of the API functions from step 2
    // doAuthenticate,
    getPosts,
    // just expose the api
    getApi

  }
}

// let's return back our create method as the default.
export default create
