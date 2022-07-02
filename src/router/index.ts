import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import checkAuth from '../middleware/checkAuth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: checkAuth,
    component: () => import('../views/Home.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
