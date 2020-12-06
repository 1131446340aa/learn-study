<template>
  <div class="main">
    <van-nav-bar @click-left="onClickLeft">
      <template #left>
        <i class="iconfont icon-left-arrow"></i>
      </template>
    </van-nav-bar>
    <BScroll :height="height" :data="allsong">
      <div class="date">
        <div class="day">{{ day }}</div>
        <div class="month">/{{ month }}</div>
      </div>
      <div class="text">历史日推</div>
      <scrollplaylist :allsong="allsong" :count="count"></scrollplaylist>
    </BScroll>

    <div class="bg">
      <div class="image">
        <img src="../../assets//bg5.png" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getRecommendSongs } from "../../network/index";

import BScroll from "../../components/scroll/index.vue";
import scrollplaylist from "../../components/scrollPlayList/index.vue";
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { Recommend } from "@/network/preferDay";
export default {
  components: {
    BScroll,
    scrollplaylist,
  },
  setup() {
    const data = reactive({
      month: "",
      day: "",
      allsong: [] as Recommend[],
      count: 0,
      router: useRouter(),
      height: "",
    });
    data.height = window.innerHeight / 10 - 4.6 + "rem";
    let date = new Date();
    data.month = (date.getMonth() + 1 + "").padStart(2, "0");
    data.day = (date.getDate() + "").padStart(2, "0");
    getRecommendSongs((res) => {
      data.allsong = res.recommend;
      data.count = res.recommend.length;
    });
    const methods = {
      onClickLeft() {
        data.router.go(-1);
      },
    };
    return {
      ...methods,
      ...toRefs(data),
    };
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
.image {
  width: 100px;
  height: 200px;
  font-size: 0;
  position: absolute;
  z-index: -5;
  top: 0;

  img {
    width: 100vw;
    height: 200px;
  }
}

.date {
  display: flex;
  margin-left: 10px;
  height: 40px;
  line-height: 40px;
  padding-top: 30px;

  .day {
    font-size: 26px;
    color: #fff;
  }

  .month {
    color: #fff;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    margin-top: 12px;
    margin-left: 5px;
  }
}

.text {
  margin-left: 10px;
  height: 20px;
  border-radius: 13px;
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 3px 10px;
  line-height: 20px;
  margin-bottom: 20px;
}
</style>
