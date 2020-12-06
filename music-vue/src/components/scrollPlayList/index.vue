<template>
  <div class="main">
    <div class="scroll">
      <div class="title">
        <div class="icon">
          <i class="iconfont icon-bofang"></i>
        </div>
        <div class="text">播放全部</div>
        <div class="all">(共{{ count }}首)</div>
      </div>
      <div class="wrap">
        <div class="item" v-for="(item, index) in allsong" :key="index" @click="tomusic(index)">
          <songitem :item="item" :index="index"></songitem>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import songitem from "../songItem/index.vue";
import { defineComponent, reactive, toRefs } from "vue";
import Store from "../../store/index";
import { Songs } from "@/network/Search";
import { SongDetail } from "@/network/SongDetail";
export default defineComponent({
  components: {
    songitem,
  },
  props: {
    type: {
      type: String,
      default: "",
    },
    count: {
      type: Number,
      default: 0,
    },
    allsong: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props) {
    const data = reactive({
      router: useRouter(),
    });
    const methods = {
      tomusic(index: number) {
        data.router.push({
          path: "/music",
        });
        Store.methods.changeIndex(index);
        Store.methods.changeSingSheet(props.allsong as SongDetail[]);
      },
    };
    return {
      ...toRefs(data),
      ...methods,
    };
  },
});
</script>

<style lang="less" scoped>
.main {
  background-color: #f2f6fc;
}

.title {
  height: 49px;
  line-height: 49px;
  display: flex;
  margin-left: 10px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  // overflow hidden
  .text {
    font-size: 16px;
  }

  .icon {
    margin-right: 15px;
  }

  .all {
    font-size: 12px;
    color: #606266;
    margin-left: 3px;
  }
}
</style>
