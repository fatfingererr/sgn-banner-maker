import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/index')
  },
  {
    path: '/components',
    name: 'components',
    component: () => import('../views/components')
  },
  {
    path: '*',
    component: () => import('../views/page-error')
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router
