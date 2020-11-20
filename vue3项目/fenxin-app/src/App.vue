<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script >
import { useRouter, useRoute } from 'vue-router'
import { reactive, onMounted, toRefs } from 'vue'
import { routes } from './router/index.js'
export default {
  name: 'App',
  setup() {
    let state = {
      route: useRoute(),
      router: useRouter()
    }
    let flag = false
    routes.forEach(router => {
      if (router.children) {
        for (let i = 1; i < router.children.length; i++) {
          if (location.pathname === router.children[i].path) {
            flag = true
            break;
          }
        }
      } else {
        if (location.pathname === router.path) {
          flag = true
        }
      }
    })
    if (!flag) {
      state.router.push('/hots')
    }
    return {
      ...toRefs(state)
    }
  }
}
</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
}
a {
  color: black;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: #1890ff;
  }
}
</style>
