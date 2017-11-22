
const create = (config) => {
  const WPAPI = require('wpapi')
  const api = new WPAPI({endpoint: config.endpoint})
  const perPage = config.per_page

  const getPosts = (category = false, page = 1) => {
    let posts = api.posts().perPage(perPage).page(page).embed()
    if (category) {
      posts = posts.category(category)
    }
    return posts
  }
  const getCategories = () => {
    return api.categories()
  }
  const getMedia = () => {
    return api.media()
  }
  const getApi = () => api
  return {
    // a list of the API functions from step 2
    // doAuthenticate,
    getPosts,
    getCategories,
    getMedia,
    // just expose the api
    getApi
  }
}

// let's return back our create method as the default.
export default create
