<template>
  <div id="app">
    <audio v-show="songUrl && isPlay" :src="songUrl" autoplay="true" :loop="playRules === 2"></audio>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Store from "./store/index";
import { onMounted, reactive, toRef, toRefs, watch } from "vue";
import musicPlay from "./common/musicPlay";
import store from "./store/index";
export default {
  name: "App",

  setup() {
    const methods = {
      ...Store.methods,
    };
    onMounted(() => {
      let audio = document.querySelector("audio");
      audio &&
        (audio.onended = function () {
          methods.changeEnded(true);
        });
      audio &&
        (audio.ontimeupdate = function (e: any) {
          let Duration_m = Math.floor(e.target.duration / 60) + "";

          let Duration_s = Math.floor(e.target.duration % 60) + "";
          let endtimer = Duration_m.padStart(2, "0") + ":" + Duration_s.padStart(2, "0");
          methods.changeDuration(endtimer);

          let currentTime_m = Math.floor(e.target.currentTime / 60) + "";
          let currentTime_s = Math.floor(e.target.currentTime % 60) + "";
          let starttimer = currentTime_m.padStart(2, "0") + ":" + currentTime_s.padStart(2, "0");

          methods.changeCurrentTime(starttimer);
          let progress = (e.target.currentTime / e.target.duration) * 100;
          if (!Store.musicStore.seek) {
            methods.changeValue(progress);
          }

          methods.changeEnded(false);
          if (Store.musicStore.seek) {
            e.target.currentTime = (Store.musicStore.value * e.target.duration) / 100;
            methods.changeSeek(false);
          }
        });
    });
    return {
      ...methods,
      ...toRefs(Store.musicStore),
    };
  },
  watch: {
    isPlay(newparma: boolean) {
      let audio = document.querySelector("audio");
      if (newparma) {
        audio?.play();
      } else {
        audio?.pause();
      }
    },
    ended(newVal: boolean) {
      if (newVal) {
        // this.nextOne()
        musicPlay.methods.nextOne();
      }
    },
  },
};
</script>
