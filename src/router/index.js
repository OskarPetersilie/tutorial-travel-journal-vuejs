import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: () => import('../views/Home.vue')
    // },
    {
      path: '/events',
      name: 'readjournal',
      component: () => import('../views/Events.vue')
    },
  // {
  //   path: '/events/:slug',
  //   name: 'EventDetail',
  //   component: () => import('../views/EventDetail.vue')
  // },
  //   {
  //     // Dynamic route for all other pages based on slug
  //     path: '/:slug',
  //     name: 'Page',
  //     component: () => import('../views/Page.vue'),
  //     props: true
  //   },
    {
      // 404 page
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')	
    }
  ]
})

export default router
