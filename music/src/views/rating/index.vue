<template>
  <div class="main">
    <van-nav-bar @click-left="onClickLeft">
      <template #left>
        <i class="iconfont icon-left-arrow"></i>
      </template>
      <template #title>
        <div class="text">排行榜</div>
      </template>
    </van-nav-bar>
    <BScroll :height="height" :data="list">
      <div class="title">榜单汇总</div>
      <singsheet :personalized="list" type="rate"></singsheet>
    </BScroll>
  </div>
</template>

<script lang="ts">
import BScroll from "../../components//scroll/index.vue";
import { getTopListDetail } from "../../network/index";
import singsheet from "../../components/singsheet/index.vue";
import { reactive, toRefs } from "vue";
import { List } from "@/network/TopPlayListDetail";
import { useRouter } from "vue-router";
export default {
  components: {
    BScroll,
    singsheet,
  },
  setup() {
    const data = reactive({
      list: [] as List[],
      height: "",
      router: useRouter(),
    });
    data.height = window.innerHeight / 10 - 4.6 + "rem";
    getTopListDetail((res) => {
      data.list = res.list.slice(0, 25);
      data.list.splice(11, 1);
    });
    function onClickLeft() {
      data.router.go(-1);
    }
    return { ...toRefs(data), onClickLeft };
  },
};
</script>

<style lang="less" scoped>
.title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-left: 1rem;
}
</style>
