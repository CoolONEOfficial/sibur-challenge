import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/rating',
      name: 'rating',
      component: () => import('./views/Rating.vue')
    },
    {
      path: '/motivation',
      name: 'motivation',
      component: () => import('./views/Motivation.vue')
    },
  ]
})
