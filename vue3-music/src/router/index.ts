import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import index from '../views/index/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () =>
      import(/* webpackChunkName: "Index" */ '../views/index/index.vue')
    // meta: {
    //   isUseCache: false, // 默认不缓存
    //   keepAlive: true,
    // }
  },
  {
    path: '/search',
    name: 'Search',

    component: () =>
      import(/* webpackChunkName: "search" */ '../views/search/index.vue')
  },
  {
    path: '/searchDetail',
    name: 'SearchDetail',

    component: () =>
      import(
        /* webpackChunkName: "SearchDetail" */ '../views/searchDetail/index.vue'
      )
  },
  {
    path: '/music',
    name: 'Music',

    component: () =>
      import(/* webpackChunkName: "music" */ '../views/music/index.vue')
  },
  {
    path: '/singSheetDetail',
    name: 'singSheetDetail',

    component: () =>
      import(
        /* webpackChunkName: "singSheetDetail" */ '../views/singSheetDetail/index.vue'
      )
  },
  {
    path: '/playlistSquare',
    name: 'playlistSquare',
    component: () =>
      import(
        /* webpackChunkName: "playlistSquare" */ '../views/playlistSquare/index.vue'
      )
  },
  {
    path: '/rating',
    name: 'rating',
    component: () =>
      import(/* webpackChunkName: "rating" */ '../views/rating/index.vue')
  },
  {
    path: '/rateDetail',
    name: 'rateDetail',
    component: () =>
      import(
        /* webpackChunkName: "rateDetail" */ '../views/rateDetail/index.vue'
      )
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/login/index.vue')
  },
  {
    path: '/phoneLogin',
    name: 'phoneLogin',
    component: () =>
      import(
        /* webpackChunkName: "phoneLogin" */ '../views/phoneLogin/index.vue'
      )
  },
  {
    path: '/inputPassword',
    name: 'inputPassword',
    component: () =>
      import(
        /* webpackChunkName: "inputPassword" */ '../views/inputPassword/index.vue'
      )
  },
  {
    path: '/loginPatcha',
    name: 'loginPatcha',
    component: () =>
      import(
        /* webpackChunkName: "loginPatcha" */ '../views/loginPatcha/index.vue'
      )
  },
  {
    path: '/videoPlay',
    name: 'videoPlay',
    component: () =>
      import(
        /* webpackChunkName: "loginPatcha" */ '../views/videoPlay/index.vue'
      )
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () =>
      import(/* webpackChunkName: "recommend" */ '../views/recommend/index.vue')
  },
  {
    path: '/dtdetail',
    name: 'dtdetail',
    component: () =>
      import(/* webpackChunkName: "recommend" */ '../views/dtDetail/index.vue')
  },
  {
    path: '/historyPlay',
    name: 'historyPlay',
    component: () =>
      import(
        /* webpackChunkName: "historyPlay" */ '../views/playHistory/index.vue'
      )
  },
  {
    path: '/collectMusic',
    name: 'collectMusic',
    component: () =>
      import(
        /* webpackChunkName: "collectMusic" */ '../views/collectionMusic/index.vue'
      )
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
index
