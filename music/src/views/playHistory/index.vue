<template>
  <div class="main">
    <van-nav-bar @click-left="goBack">
      <template #left>
        <i class="iconfont icon-left-arrow"></i>
      </template>
      <template #title>
        <div class="text">最近播放</div>
      </template>
    </van-nav-bar>
    <BScroll :height="heoght" :data="allsong">
      <scrollplaylist :allsong="allsong"></scrollplaylist>
    </BScroll>
    <controlbar></controlbar>
  </div>
</template>

<script lang="ts">
import scrollplaylist from "../../components/scrollPlayList/index.vue";
import BScroll from "../../components/scroll/index.vue";
import controlbar from "../../components/controlbar/index.vue";
import { reactive, toRefs } from "vue";
// import { useRouter } from "vue-router";
import { useRouter } from "vue-router";
export default {
  components: {
    BScroll,
    scrollplaylist,
    controlbar,
  },
  setup() {
    const data = reactive({
      allsong: [],
      height: "",
      router: useRouter(),
    });
    const methods = {
      goBack: () => {
        data.router.go(-1);
      },
    };
    data.allsong = JSON.parse(localStorage.songitem);
    data.height = window.innerHeight / 10 - 8.8 + "rem";
    return {
      ...methods,
      ...toRefs(data),
    };
  },
};
</script>
