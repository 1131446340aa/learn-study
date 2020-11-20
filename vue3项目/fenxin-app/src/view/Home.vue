<template>
<div class="con">
  <div class="container">
    <Tabbar></Tabbar>
  </div>
  <div class="main" @click="hiddenSelect">
    <router-view class="app"></router-view>
  </div>
</div>
</template>

<script lang="ts">
import Tabbar from "../components/tabbar.vue"
import {
  useRouter,
  useRoute,
  Router
} from "vue-router"
import myStore from '../mixins/globalvariable'
import {
  reactive,
  toRefs,
  onMounted
} from "vue"
import {
  JieLiu
} from "../util/jieliu"
import {
  GetUserInfo
} from "../network/index"
import {
  AxiosDate
} from "../interface/index"

export default {
  components: {
    Tabbar,
  },
  setup() {
    const {
      store,
      hiddenSelect
    } = myStore
    const state = reactive({
      index: 0,
      router: useRouter(),
      route: useRoute(),
      userInfo: {
        message: "",
        error: -1
      },
    })
    if (state.route.path === "/") {
      state.router.push("/hots")
    }
    const methods = {
      getUserInfo() {
        GetUserInfo((res) => {
          state.userInfo = res
          localStorage.blogUserInfo = JSON.stringify(res)
        })
      },
    }

    onMounted(() => {
      methods.getUserInfo()
    })
    return {
      ...methods,
      ...toRefs(state),
      ...toRefs(store),
      hiddenSelect
    }
  },
}
</script>

<style lang="less" scoped>
.con {
  display: flex;
  min-height: 100vh;
  flex-direction: column;

  .main {
    flex: 1;
    background-color: #f4f5f5;

    .app {
      border-radius: 2px;
      min-height: 80vh;
      box-sizing: border-box;
    }
  }
}
</style>
