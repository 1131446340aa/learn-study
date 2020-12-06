<template>
  <div class="main">
    <van-tabs
      ref="tabs"
      v-model:active="active"
      :swipeable="true"
      line-width="0"
      title-inactive-color="#6e6e6e"
      title-active-color="#000000"
      :scrollspy="true"
    >
      <template #nav-left>
        <div @click="toLogin" class="tab-icon">
          <van-icon name="wap-nav" size="25" />
        </div>
      </template>

      <van-tab title="我的"><my></my></van-tab>
      <van-tab title="发现"><found @toDianTai="toDianTai"></found></van-tab>
      <van-tab title="电台" name="diantai"><diantai></diantai></van-tab>
      <van-tab title="视频"><Video></Video></van-tab>
      <template #nav-right>
        <div class="tab-icon" @click="tosearch">
          <van-icon name="search" size="25" />
        </div>
      </template>
    </van-tabs>
    <controlbar></controlbar>
  </div>
</template>

<script lang="ts">
import found from '../found/index.vue'
import diantai from '../diantai/index.vue'
import my from '../my/index.vue'
import Video from '../video/index.vue'
import controlbar from '../../components/controlbar/index.vue'
import { reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    found,
    diantai,
    my,
    Video,
    controlbar,
  },
  setup() {
    const data = reactive({
      active: 1,
      router: useRouter(),
    })
    // Object.defineProperty
    let tabs = ref()
    const methods = {
      tosearch() {
        data.router.push({ path: '/search' })
      },
      toLogin() {
        data.router.push('login')
      },
      toDianTai() {
        tabs.value.scrollTo('diantai')
      },
    }
    return {
      ...toRefs(data),
      ...methods,
      tabs,
    }
  },
}
</script>

<style lang="less" scoped>
.tab-icon {
  height: 4.4rem;
  line-height: 5.8rem;
  vertical-align: middle;
  text-align: center;
  width: 5rem;
}
</style>
