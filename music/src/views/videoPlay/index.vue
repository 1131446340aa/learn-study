<template>
  <div class="main">
    <van-nav-bar @click-left="onClickLeft">
      <template #left>
        <i class="iconfont icon-left-arrow"></i>
      </template>
      <template #title>
        <div class="text">{{ videodetail.name }}</div>
      </template>
    </van-nav-bar>
    <div class="wrapper">
      <div class="video">
        <video :poster="videodetail.cover" autoplay="true" controls="controls" v-if="move_url" :src="move_url" ref="video"></video>
      </div>
      <div v-if="height">
        <BScroll :height="height" :data="similiar">
          <div class="detail">
            <div class="title">{{ videodetail.name }}</div>
            <div class="icon">
              <div class="item">
                <i class="iconfont icon-zan"></i>
                <div class="text">{{ videodetail.subCount }}</div>
              </div>
              <div class="item">
                <i class="iconfont icon-add-folder"></i>
                <div class="text">{{ videodetail.likeCount }}</div>
              </div>
              <div class="item">
                <i class="iconfont icon-pinglun"></i>
                <div class="text">{{ videodetail.commentCount }}</div>
              </div>
              <div class="item">
                <i class="iconfont icon-fenxiang"></i>
                <div class="text">{{ videodetail.shareCount }}</div>
              </div>
            </div>
            <div class="text">相关视频</div>
            <div class="mvs-wrapper">
              <div class="mvs-item" v-for="(item, index) in similiar" :key="index" @click="smiliarmv(index)">
                <div class="image">
                  <img :src="item.cover" />
                </div>
                <div class="text">
                  <div class="name">{{ item.name }}</div>
                  <div class="artist">by{{ item.artistName }}</div>
                </div>
              </div>
            </div>
          </div>
        </BScroll>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mvDetail, mvSimi, mvAddress } from "../../network/index";

import BScroll from "../../components/scroll/index.vue";
import { nextTick, onMounted, reactive, ref, toRefs, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Mvs } from "@/network/SimiMv";
import { Data } from "@/network/MvDetail";
export default {
  components: {
    BScroll,
  },
  setup() {
    const data = reactive({
      videodetail: {} as Data,
      height: "",
      similiar: [] as Mvs[],
      id: 0,
      move_url: "",
      route: useRoute(),
      router: useRouter(),
    });
    let video = ref();

    const methods = {
      getmv() {
        let id = data.id !== 0 ? data.id : +(data.route.query.mvid as string);
        mvDetail(id, (res) => {
          data.videodetail = res.data;
        });
        mvAddress(id, (res) => {
          data.move_url = res.data.url;
        });
        mvSimi(id, (res) => {
          data.similiar = res.mvs;
        });
      },
      onClickLeft() {
        data.router.go(-1);
      },
      smiliarmv(index: number) {
        data.id = data.similiar[index].id;
        methods.getmv();
      },
    };
    methods.getmv();
    watch([toRefs(data).similiar], () => {
      nextTick(() => {
        data.height = window.innerHeight / 10 - video.value.offsetHeight / 10 + "rem";
      });
    });
    return { ...methods, ...toRefs(data), video };
  },
};
</script>
<style lang="less" scoped>
.detail {
  margin: 0 10px;
}

.mvs-item {
  display: flex;
  margin: 7px 0px;

  .image {
    width: 30vw;
    border-radius: 5px;
    overflow: hidden;
    font-size: 0;

    img {
      width: 30vw;
    }
  }

  .text {
    flex: 1;
    margin: 0 10px;

    .name {
      font-size: 14px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      max-width: 60vw;
    }

    .artist {
      font-size: 10px;
      color: #606266;
    }
  }
}
.text {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
}

.wrapper {
  video {
    width: 100%;
  }
}

.title {
  font-size: 16px;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon {
  display: flex;
  height: 45px;
  line-height: 30px;

  .item {
    flex: 1;
    text-align: center;

    .text {
      font-size: 10px;
      height: 15px;
      line-height: 15px;
      color: #606266;
    }
  }
}
</style>
