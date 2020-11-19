import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    name: 'login',
    path: '/login',
    component: () => import('../view/login.vue'),
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('../view/register.vue'),
  },
  {
    name: "home",
    path: "/",
    component: () => import('../view/Home.vue'),
    children: [
      {
      name: 'hots',
      path: '/hots',
      component:()=>import('../view/Hots.vue')
      },
      {
        name: 'fornted',
        path: '/fornted',
        component: () => import('../view/fornted.vue')
      },
      {
        name: 'profile',
        path: '/profile',
        component: () => import('../view/profile.vue')
      },
      {
        name: 'search',
        path: '/search',
        component: () => import('../view/search.vue')
      },
      {
        name: 'ai',
        path: '/ai',
        component: () => import('../view/ai.vue')
      },
      {
        name: 'backed',
        path: '/backed',
        component: () => import('../view/backed.vue')
      },
      {
        name: 'android',
        path: '/android',
        component: () => import('../view/android.vue')
      },
      {
        name: 'life',
        path: '/life',
        component: () => import('../view/life.vue')
      },
      {
        name: 'read',
        path: '/read',
        component: () => import('../view/read.vue')
      },
      {
        name: 'detail',
        path: '/detail',
        component:()=>import('../view/detail.vue')
      }, {
        name: 'zone',
        path: "/zone",
        component:()=>import('../view/zone.vue')
      }
    ]  
  },
  {
    name: 'write',
    path: '/write',
    component: () => import('../view/write.vue')
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router