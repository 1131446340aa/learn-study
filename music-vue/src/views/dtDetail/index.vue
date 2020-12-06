<template>
  <div class="main">
    <van-nav-bar @click-left="onClickLeft">
      <template #left>
        <i class="iconfont icon-left-arrow"></i>
      </template>
      <template #title>
        <div class="text">电台</div>
      </template>
    </van-nav-bar>

    <BScroll :height="height" :pullup="true" @scrollToEnd="update" :data="djitem">
      <div class="name">{{ djRadio.name }}</div>
      <div class="number">{{ djRadio.subCount }}人已订阅</div>
      <radioscroll :allsong="djitem" :count="count" type="dt"></radioscroll>
    </BScroll>

    <div class="bg" v-if="djitem[0]">
      <img :src="djitem[0].radio.picUrl" alt />
    </div>
  </div>
</template>

<script lang="ts">
import BScroll from "../../components/scroll/index.vue";
import { djDetail, djProgram } from "../../network/index";
import { useRoute } from "vue-router";
import radioscroll from "../../components/scrollPlayList/index.vue";
import { reactive, toRefs } from "vue";
import { Programs } from "@/network/DJProgram";
import { DJDetail, DjRadio } from "@/network/DJDetail";
import { DjRadios } from "@/network/djRecommend";
export default {
  components: { BScroll, radioscroll },
  setup() {
    const data = reactive({
      djRadio: {} as DjRadio,
      offset: 0,
      djitem: [] as Programs[],
      count: 0,
      route: useRoute(),
      height: "",
    });
    data.height = window.innerHeight / 10 - 4.6 + "rem";
    const methods = {
      update() {
        if (data.offset > 0 && data.offset * 40 < data.count) {
          methods.getdj();
        }
      },
      getdj() {
        djProgram(Number(data.route.query.rid), data.offset * 40, (res) => {
          data.offset++;
          data.djitem = [...data.djitem, ...res.programs];
          data.count = res.count;
        });
      },
    };
    djDetail(+(data.route.query.rid as string), (res) => {
      data.djRadio = res.djRadio;
    });
    methods.getdj();
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
.bg {
  position: absolute;
  z-index: -3;
  top: 0;

  img {
    width: 100%;
    height: 230px;
  }
}

.name {
  color: #fff;
  padding-top: 120px;
  margin-left: 10px;
  font-size: 16px;
}

.number {
  color: #ebeef5;
  margin-left: 10px;
  font-size: 12px;
  margin-top: 5px;
}
</style>
