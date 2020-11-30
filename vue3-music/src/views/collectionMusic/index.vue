<template>
  <div class="main">
    <van-nav-bar @click-left="onClickLeft">
      <template #left>
        <i class="iconfont icon-left-arrow"></i>
      </template>
      <template #title>
        <div class="text">我的收藏</div>
      </template>
    </van-nav-bar>
    <BScroll :bottom="44">
      <scrollplaylist :allsong="allsong"></scrollplaylist>
    </BScroll>
    <controlbar></controlbar>
  </div>
</template>

<script lang="ts">
import scrollplaylist from "../../components/scrollPlayList/index.vue";
import BScroll from "../../components/scroll/index.vue";
import { getSongDetail, getLikeList } from "../../network/index";

import controlbar from "../../components/controlbar/index.vue";
import { reactive } from "@vue/reactivity";
import { SongDetail } from "@/network/SongDetail";
export default {
  components: {
    BScroll,
    scrollplaylist,
    controlbar,
  },
  setup() {
    const data = reactive({
      allsong: [] as SongDetail[],
    });
    getLikeList((res) => {
      res.ids.forEach((id) => {
        getSongDetail(id, (res) => {
          data.allsong.push(res);
        });
      });
    });
  },
};
</script>
