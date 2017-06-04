import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function createStory (type) {
  return {
    name: `${type}-stories-view`,
    // custom static method for target components
    // can be accessed at $options
    asyncData ({ hn, route }) {
      return hn.stories(type, {
        page: Number(route.params.page || 1)
      })
    },
    render (ce) {
      return ce(Stories, { props: { type } })
    }
  }
}

const Stories = () => import(/* webpackChunkName: "stories" */'@/views/Stories.vue')
const Users = () => import(/* webpackChunkName: "users" */'@/views/Users.vue')
const Comments = () => import(/* webpackChunkName: "comments" */ '@/views/Comments.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', name: 'Main', component: createStory('top') },
      { path: '/top/:page(\\d+)?', name: 'Top', component: createStory('top') },
      { path: '/new/:page(\\d+)?', name: 'New', component: createStory('new') },
      { path: '/best/:page(\\d+)?', name: 'Best', component: createStory('best') },
      { path: '/ask/:page(\\d+)?', name: 'Ask', component: createStory('ask') },
      { path: '/show/:page(\\d+)?', name: 'Show', component: createStory('show') },
      { path: '/job/:page(\\d+)?', name: 'Job', component: createStory('job') },
      { path: '/users/:id?', name: 'Users', component: Users },
      { path: '/comments/:id?', name: 'Comments', component: Comments }
    ],
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  })
}
