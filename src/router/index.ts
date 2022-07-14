import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import checkAuth from '../middleware/checkAuth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: checkAuth,
    component: () => import('../views/Home.vue')
  },
  {
    path: '/recipes/:blogid',
    name: 'Recipe',
    component: () => import('../views/Recipe.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash
      }
    }
    // always scroll to top
    return { top: 0 }
  }
})

export default router
