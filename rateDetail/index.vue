<template>
  <div class="main">
    <van-nav-bar @click-left="onClickLeft">
      <template #left>
        <i class="iconfont icon-left-arrow"></i>
      </template>
      <template #title>
        <div class="text">{{ playlists.name }}</div>
      </template>
    </van-nav-bar>

    <BScroll :data="allsong" :pullup="true" @scrollToEnd="scrollToEnd" :height="height">
      <scrollplaylist :allsong="allsong" :count="playlists?.trackIds?.length"></scrollplaylist>
    </BScroll>
  </div>
</template>

<script lang="ts">
import BScroll from "../../components/scroll/index.vue";
import { getSongDetail, getTopList } from "../../network/index";
// import controlbar from "./controlbar";
// import daohang from "./daohang";
import scrollplaylist from "../../components/scrollPlayList/index.vue";
import { reactive, ref, toRefs, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Playlist, TopList } from "@/network/TopList";
import Store from "../../store/index";
import { SongDetail } from "@/network/SongDetail";
import router from "@/router";
export default {
  components: {
    BScroll,
    scrollplaylist,
  },
  setup() {
    const data = reactive({
      playlists: {} as Playlist,
      allsong: [] as SongDetail[],
      route: useRoute(),
      height: "",
      router: useRouter(),
    });
    data.height = window.innerHeight / 10 - 4.6 + "rem";
    let index = 0;
    let timer = Date.parse(String(new Date()));
    const methods = {
      scrollToEnd() {
        data.playlists.trackIds.slice(40 * index, 40 * ++index).forEach((trackId) => {
          getSongDetail(trackId.id, (res) => {
            data.allsong.push(res);
          });
        });
      },
      onClickLeft() {
        data.router.go(-1);
      },
    };
    getTopList(data.route.query.idx as string, (res) => {
      data.playlists = res.playlist;
      data.playlists.trackIds.slice(40 * index, 40 * ++index).forEach((trackId) => {
        getSongDetail(trackId.id, (res) => {
          data.allsong.push(res);
        });
      });
      //   Store.methods.changePlaylist(data.playlists);
    });

    return {
      ...toRefs(data),
      ...methods,
    };
  },
};
</script>
