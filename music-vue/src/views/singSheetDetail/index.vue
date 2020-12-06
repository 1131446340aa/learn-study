<template>
  <div class="singsheetdetail">
    <van-nav-bar @click-left="goback" @click-right="iscollect">
      <template #left>
        <i class="iconfont icon-left-arrow"></i>
      </template>
      <template #title>
        <div class="text">歌单</div>
      </template>
      <template #right>
        <div class="slot">
          <i v-if="!collect" class="iconfont icon-shoucang"></i>
          <i v-if="collect" class="iconfont icon-favor-active"></i>
        </div>
      </template>
    </van-nav-bar>
    <div class="content">
      <BScroll height="100vh" :pullup="true" @scrollToEnd="scrollToEnd" ref="scroll">
        <playListInterdouce></playListInterdouce>
        <div>
          <scrollPlayList :allsong="playlists" :count="trackIds.length"></scrollPlayList>
        </div>
      </BScroll>
      <div class="bg">
        <img v-if="cover" :src="cover" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getPlaylistDetail, getSongDetail } from "../../network/index";
import BScroll from "../../components/scroll/index.vue";
import playListInterdouce from "../../components/playListInterdouce/index.vue";
import scrollPlayList from "../../components/scrollPlayList/index.vue";
import { reactive, ref, toRefs, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Playlist, TrackIds } from "@/network/PlayListDetail";
import Store from "../../store/index";
import { SongDetail } from "@/network/SongDetail";
// import controlbar from "./controlbar";
export default {
  components: {
    playListInterdouce,
    BScroll,
    scrollPlayList,
  },
  setup() {
    const data = reactive({
      playlists: [] as SongDetail[],
      collect: false,
      like: 1,
      router: useRouter(),
      route: useRoute(),
      cover: "",
      trackIds: [] as TrackIds[],
    });
    let timer = Date.parse(String(new Date()));
    let index = 0;
    let scroll = ref();
    const methods = {
      iscollect() {
        data.like = data.collect ? 2 : 1;

        // playlist_subscribe(this.$route.query.id, this.like, (res) => {
        //   data.collect = !data.collect;
        // });
      },
      scrollToEnd() {
        data.trackIds.slice(40 * index, 40 * ++index).forEach((trackId) => {
          getSongDetail(trackId.id, (res) => {
            data.playlists.push(res);
          });
        });
      },
      goback() {
        data.router.go(-1);
      },
    };
    let timestamp = Date.now();
    watch([data.playlists], () => {
      if (Date.parse(String(new Date())) - timer > 200) {
        timer = Date.parse(String(new Date()));
        setTimeout(() => {
          scroll.value.refresh();
        }, 200);
      }
    });
    getPlaylistDetail(data.route.query.id as string, (res) => {
      data.cover = res.playlist.coverImgUrl;
      data.trackIds = res.playlist.trackIds;
      res.playlist.trackIds.slice(40 * index, 40 * ++index).forEach((trackId) => {
        getSongDetail(trackId.id, (res) => {
          data.playlists.push(res);
        });
      });
    });
    return { ...methods, ...toRefs(data), scroll };
  },
};
</script>

<style lang="less" scoped>
/deep/.van-nav-bar {
  background: transparent;
}

/deep/.van-hairline--bottom::after {
  border-bottom: 1px solid transparent;
}
.content {
  position: fixed;
  top: 0;
}
.bg {
  position: absolute;
  left: 0;
  right: 0;
  height: 49px;
  z-index: 3;
  top: 0;

  img {
    width: 100vw;
    height: 4rem;
    filter: blur(20px);
  }
}
.singsheetdetail {
  position: relative;
}
</style>
