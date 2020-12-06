<template>
  <div class="singsheet-wrapper">
    <div class="more">
      <div class="title" v-show="playRules === 0">
        <div class="icon">
          <i class="iconfont icon-shunxu"></i>
        </div>
        <div class="text">列表循环</div>
      </div>
      <div class="title" v-show="playRules === 1">
        <div class="icon">
          <i class="iconfont icon-suijibofang-"></i>
        </div>
        <div class="text">随机播放</div>
      </div>
      <i class="title" v-show="playRules === 2">
        <i class="icon">
          <i class="iconfont icon-danquxunhuan"></i>
        </i>
        <div class="text">单曲循环</div>
      </i>
      <BScroll height="28vh" :data="singSheet">
        <div class="song-item" v-for="(item, key) in singSheet" :key="item.index" @click="send(key)">
          <div class="text">{{ item.name || item.songs[0].name }}</div>
          <div v-if="item.artists" class="smalltext">-{{ item.artists[0].name }}</div>
          <div v-if="item.songs" class="smalltext">-{{ item.songs[0].ar[0].name }}</div>
        </div>
      </BScroll>
    </div>
  </div>
</template>

<script lang="ts">
import BScroll from "../scroll/index.vue";
import Store from "../../store/index";
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  components: {
    BScroll,
  },
  setup(props, { emit }) {
    const methods = {
      send(index: number) {
        emit("changeMusic", index);
      },
    };
    return {
      ...methods,
      ...toRefs(Store.musicStore),
    };
  },
});
</script>

<style lang="less" scoped>
.singsheet-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(101, 103, 109, 0.2);
  z-index: 5;
}

.more {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 65vh;
  background-color: #fff;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;

  .title {
    line-height: 4.9rem;
    height: 4.9rem;
    margin: 0 1rem;
    font-size: 1.4rem;
    color: #3e3e3e;
    display: flex;

    .iconfont {
      color: #3e3e3e;
      font-size: 1.5rem;
    }

    .text {
      font-size: 1.4rem;
      margin-left: 2rem;
    }
  }
}

.song-item {
  height: 3rem;
  line-height: 3rem;
  display: flex;

  .text {
    font-size: 1.4rem;
    margin-left: 1rem;
    max-width: 70vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .smalltext {
    font-size: 1rem;
    color: #606266;
    line-height: 3.2rem;
  }
}
</style>
