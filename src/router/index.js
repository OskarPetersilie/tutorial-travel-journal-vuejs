import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/addjournal',
      name: 'addjournal',
      component: () => import('../views/Addjournal.vue'),
    },
    {
      path: '/readjournal',
      name: 'readjournal',
      component: () => import('../views/Readjournal.vue')
    }
  ]
})

export default router
