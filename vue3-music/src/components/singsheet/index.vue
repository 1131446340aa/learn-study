<template>
  <!-- <img v-lazy="item.picUrl||item.coverImgUrl"> -->
  <div class="main">
    <div
      class="item"
      v-for="(item, index) in personalized"
      :key="index"
      @touchstart="getpos"
      @touchend="
        (e) => {
          todetail(index, e);
        }
      "
    >
      <div class="image">
        <img lazy-load :src="item.picUrl || item.coverImgUrl" />
      </div>
      <div class="text">{{ item.name }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { onMounted, toRefs, defineComponent, reactive, Events } from "vue";
import { Banners } from "../../network/Banner";
import { Result } from "../../network/Personalized";
import { useRouter } from "vue-router";
export default defineComponent({
  props: {
    personalized: {
      type: Array,
      default: [],
    },
    type: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const data = reactive({
      router: useRouter(),
    });

    let e = { x: 0, y: 0 };
    const methods = {
      todetail(index: number, event: any) {
        if (Math.abs(event.changedTouches[0].clientX - e.x) > 10 || Math.abs(event.changedTouches[0].clientX - e.y) > 10) return;

        if (!props.type) {
          data.router.push({
            path: "/singSheetDetail",
            query: { id: (props.personalized as Result[])[index].id },
          });
        }
        if (props.type === "rate") {
          let idx = [3, 0, 2, 1, 23, 24, 25, 26, 27, 22, 28, 29, 30, 5, 6, 21, 7, 8, 10, 9, 20, 31, 32, 19];
          data.router.push({
            path: "/rateDetail",
            query: { idx: idx[index] },
          });
        }
        if (props.type === "dt") {
          data.router.push({
            path: "/dtdetail",
            query: { rid: (props.personalized as Result[])[index].id },
          });
        }
      },
      getpos(event: any) {
        e.x = event.changedTouches[0].pageX;
        e.y = event.changedTouches[0].pageX;
      },
    };
    return {
      ...methods,
      ...toRefs(props),
    };
  },
});
</script>

<style lang="less" scoped>
.main {
  display: flex;
  flex-wrap: wrap;
  margin-left: 10px;

  .item {
    flex: 1;

    .image {
      width: 30vw;
      height: 30vw;
      margin-top: 0.7rem;

      img {
        width: 29vw;
        height: 29vw;
      }
    }

    .text {
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 12px;
      max-width: 29vw;
      color: #303133;
    }
  }
}
</style>
