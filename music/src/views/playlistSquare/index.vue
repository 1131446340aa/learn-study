<template>
  <div class="main">
    <van-nav-bar @click-left="onClickLeft">
      <template #left>
        <i class="iconfont icon-left-arrow"></i>
      </template>
      <template #title>
        <div class="text">歌单广场</div>
      </template>
    </van-nav-bar>

    <van-tabs :swipeable="true" line-width="20" title-inactive-color="#909399" title-active-color="red" :scrollspy="true">
      <van-tab title="华语">
        <BScroll :data="playlist_huayu" :height="height" :pullup="true" @scrollToEnd="playlisthuayu"> <singsheet :personalized="playlist_huayu"></singsheet> </BScroll
      ></van-tab>
      <van-tab title="古风">
        <BScroll :data="playlist_gufeng" :height="height" :pullup="true" @scrollToEnd="playlistgufeng"> <singsheet :personalized="playlist_gufeng"></singsheet> </BScroll
      ></van-tab>
      <van-tab title="欧美"
        ><BScroll :data="playlist_oumei" :height="height" :pullup="true" @scrollToEnd="playlistoumei"> <singsheet :personalized="playlist_oumei"></singsheet> </BScroll
      ></van-tab>
      <van-tab title="流行"
        ><BScroll :data="playlist_liuxing" :height="height" :pullup="true" @scrollToEnd="playlistliuxing"> <singsheet :personalized="playlist_liuxing"></singsheet> </BScroll
      ></van-tab>
      <van-tab title="古典">
        <BScroll :data="playlist_gudian" :height="height" :pullup="true" @scrollToEnd="playlistgudian">
          <singsheet :personalized="playlist_gudian"></singsheet>
        </BScroll>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs } from "vue";
import BScroll from "../../components/scroll/index.vue";
import { getTopPlaylist } from "../../network/index";

import singsheet from "../../components/singsheet/index.vue";
import { Playlists } from "@/network/TopPlayList";
import { useRouter } from "vue-router";
export default {
  components: { BScroll, singsheet },
  setup() {
    const data = reactive({
      index: 0,
      playlist_huayu: [] as Playlists[],
      playlist_gufeng: [] as Playlists[],
      playlist_oumei: [] as Playlists[],
      playlist_gudian: [] as Playlists[],
      playlist_liuxing: [] as Playlists[],
      playlist_huayu_offset: 0,
      playlist_gufeng_offset: 0,
      playlist_oumei_offset: 0,
      playlist_gudian_offset: 0,
      playlist_liuxing_offset: 0,
      height: "",
      router: useRouter(),
    });
    data.height = window.innerHeight / 10 - 9 + "rem";
    const methods = {
      playlistgudian() {
        methods.getgudian();
      },
      playlisthuayu() {
        methods.gethuayu();
      },
      playlistoumei() {
        methods.getoumei();
      },
      playlistgufeng() {
        methods.getgfeng();
      },
      onClickLeft() {
        data.router.go(-1);
      },
      playlistliuxing() {
        methods.getliuxing();
      },
      gethuayu() {
        getTopPlaylist("华语", data.playlist_huayu_offset * 21, (res) => {
          data.playlist_huayu_offset++;
          data.playlist_huayu = [...data.playlist_huayu, ...res.playlists];
        });
      },
      getgfeng() {
        getTopPlaylist("古风", data.playlist_gufeng_offset * 21, (res) => {
          data.playlist_gufeng_offset++;
          data.playlist_gufeng = [...data.playlist_gufeng, ...res.playlists];
        });
      },
      getliuxing() {
        getTopPlaylist("流行", data.playlist_oumei_offset * 21, (res) => {
          data.playlist_oumei_offset++;
          data.playlist_liuxing = [...data.playlist_liuxing, ...res.playlists];
        });
      },
      getgudian() {
        getTopPlaylist("古典", data.playlist_gudian_offset * 21, (res) => {
          data.playlist_gudian_offset++;
          data.playlist_gudian = [...data.playlist_gudian, ...res.playlists];
        });
      },
      getoumei() {
        getTopPlaylist("欧美", data.playlist_liuxing_offset * 21, (res) => {
          data.playlist_liuxing_offset++;
          data.playlist_oumei = [...data.playlist_oumei, ...res.playlists];
        });
      },
    };
    methods.gethuayu();
    methods.getgfeng();
    methods.getliuxing();
    methods.getgudian();
    methods.getoumei();
    return {
      ...methods,
      ...toRefs(data),
    };
  },
};
</script>
