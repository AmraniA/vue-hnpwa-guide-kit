import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Stories = () => import(/* webpackChunkName: "stories" */'@/views/Stories.vue')
const Users = () => import(/* webpackChunkName: "users" */'@/views/Users.vue')
const Comments = () => import(/* webpackChunkName: "comments" */ '@/views/Comments.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', redirect: '/category/' },
      { path: '/category/:category?', name: 'Stories', component: Stories, props: true },
      { path: '/category/:category?/page/:page', name: 'pagedStories', component: Stories, props: true },
      { path: '/users/:id?', name: 'Users', component: Users },
      { path: '/comments/:id?', name: 'Comments', component: Comments }
    ],
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  })
}
