<template>
  <div class="main">
    <BScroll :pullup="true" :height="height" :data="mv">
      <videoItem :allmove="mv"></videoItem>
    </BScroll>
  </div>
</template>

<script lang="ts">
import { getMvAll } from "../../network/index";
import videoItem from "../../components/videoItem/index.vue";
import BScroll from "../../components/scroll/index.vue";
import { reactive, toRefs } from "vue";
import { Data } from "@/network/MV";
export default {
  components: {
    videoItem,
    BScroll,
  },
  setup() {
    const data = reactive({
      offset: 0,
      mv: [] as Data[],
      height: "",
    });
    data.height = window.innerHeight / 10 - 8.8 + "rem";
    const methods = {
      getMv() {
        getMvAll(data.offset * 8, (res) => {
          data.offset++;
          data.mv = [...data.mv, ...res.data];
        });
      },
    };
    methods.getMv();
    return {
      ...methods,
      ...toRefs(data),
    };
  },
};
</script>

<style lang="less" scoped></style>
