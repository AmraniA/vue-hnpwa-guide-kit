import Vue from 'vue'
import Router from 'vue-router'
import Stories from '@/views/Stories'
import Users from '@/views/Users'
import Comments from '@/views/Comments'

Vue.use(Router)

function createStory (type) {
  return {
    name: `${type}-stories-view`,
    render (ce) {
      return ce(Stories, { props: { type } })
    }
  }
}

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', name: 'Main', component: createStory('top') },
      { path: '/top/:page?', name: 'Top', component: createStory('top') },
      { path: '/new/:page?', name: 'New', component: createStory('new') },
      { path: '/best/:page?', name: 'Best', component: createStory('best') },
      { path: '/ask/:page?', name: 'Ask', component: createStory('ask') },
      { path: '/show/:page?', name: 'Show', component: createStory('show') },
      { path: '/job/:page?', name: 'Job', component: createStory('job') },
      { path: '/users/:id?', name: 'Users', component: Users },
      { path: '/comments/:id?', name: 'Comments', component: Comments }
    ],
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  })
}
