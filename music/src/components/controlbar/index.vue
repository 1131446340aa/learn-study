<template>
  <div class="main" @click.stop="toplay">
    <div class="left">
      <div class="image">
        <img v-if="songitem.al" :src="songitem.al.picUrl" />
        <img v-if="!songitem.al" src="https://p1.music.126.net/srjmIxgdjRlCXSjZtl2aaw==/109951163825045428.jpg" />
      </div>
      <div class="title">
        <div class="songname">{{ songitem.name || "暂无歌曲" }}</div>
        <div class="singername" v-if="songitem.ar">
          {{ songitem.ar[0].name }}
        </div>
        <div class="singername" v-if="!songitem.ar && !songitem.radio">暂无歌手</div>
        <div class="singername" v-if="songitem.radio">
          {{ songitem.radio.name }}
        </div>
      </div>
    </div>
    <div class="right">
      <div class="icon_play" @click.stop="isPlaying">
        <i v-show="!isPlay" class="iconfont icon-bofang"></i>
        <i v-show="isPlay" class="iconfont icon-zanting"></i>
      </div>
      <div class="icon_more" @click.stop.prevent="show">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </div>
    <div v-if="isshow" @click="hidden">
      <messageBoxMusic @changeMusic="currentplay"></messageBoxMusic>
    </div>
  </div>
</template>

<script lang="ts">
import messageBoxMusic from "../../components/message-box-music/messafeBoxMusic.vue";
import Store from "../../store/index";
import { reactive, toRefs } from "vue";
import playMusic from "../../common/musicPlay";
import { useRouter } from "vue-router";
import { Notify } from "vant";
export default {
  components: { messageBoxMusic },
  setup() {
    const data = reactive({
      isshow: false,
      router: useRouter(),
      isPlay: Store.musicStore.isPlay,
    });
    let songitem = Store.musicStore.songItem;

    const methods = {
      show() {
        if (!Object.keys(songitem).length) {
          Notify({ type: "danger", message: "暂未选择播放音乐" });
          return;
        }
        data.isshow = true;
      },
      hidden() {
        data.isshow = false;
      },
      isPlaying() {
        if (!Object.keys(songitem).length) {
          Notify({ type: "danger", message: "暂未选择播放音乐" });
          return;
        }
        data.isPlay = !data.isPlay;
        Store.methods.changeIsPlay(!Store.musicStore.isPlay);
      },
      currentplay(index: number) {
        Store.methods.changeIndex(index);
        Store.methods.changeIsPlay(true);
        playMusic.methods.playMusic();
      },
      toplay() {
        if (!Object.keys(songitem).length) {
          Notify({ type: "danger", message: "暂未选择播放音乐" });
          return;
        }
        data.router.push({
          path: "/music",
          query: {
            isPlay: "true",
          },
        });
      },
    };
    return {
      ...methods,
      ...toRefs(data),
      songitem,
    };
  },
};
</script>
<style lang="less" scoped>
.main {
  height: 4.4rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  line-height: 3.9rem;

  .left {
    display: flex;

    .image {
      width: 3.4rem;
      height: 3.4rem;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 0.5rem;
      margin-top: 0.3rem;
      line-height: 3.9rem;

      img {
        width: 3.4rem;
        height: 3.4rem;
      }
    }

    .title {
      margin-left: 5px;

      .songname {
        font-size: 1.4rem;
        line-height: 2.4rem;
        max-width: 55vw;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .singername {
        font-size: 1rem;
        line-height: 2rem;
        color: #909399;
      }
    }
  }

  .right {
    display: flex;

    .icon_more {
      margin-right: 1.3rem;
    }

    .icon_play {
      margin-right: 1.3rem;

      .iconfont {
        font-size: 2.5rem;
      }
    }
  }
}
</style>
