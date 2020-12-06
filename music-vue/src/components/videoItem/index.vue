<template>
  <div class="main">
    <div
      class="item"
      v-for="(item, key) in allmove"
      :key="key"
      @touchstart="getpos"
      @touchend="
        (e) => {
          tovideoplay(key, e);
        }
      "
    >
      <div class="videonew">
        <div class="video">
          <img v-if="item" lazy-loa :src="item.cover" />
          <div class="playicon">
            <i class="iconfont icon-bofang1"></i>
          </div>
        </div>
        <div class="title" v-if="item">{{ item.name }}</div>
        <div class="bottom">
          <div class="icon">
            <i class="iconfont icon-pause"></i>
          </div>
          <div class="number" v-if="item">{{ item.playCount }}</div>
        </div>
      </div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import Store from "../../store/index";
import { Data } from "@/network/MV";
export default defineComponent({
  props: {
    allmove: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
    const data = reactive({ router: useRouter() });
    let e = { x: 0, y: 0 };
    const methods = {
      tovideoplay(index: number, event: any) {
        if (Math.abs(event.changedTouches[0].clientX - e.x) > 10 || Math.abs(event.changedTouches[0].clientX - e.y) > 10) return;
        data.router.push({
          path: "./videoPlay",
          query: {
            mvid: (props.allmove as Data[])[index].id,
          },
        });
        Store.methods.changeIsPlay(false);
      },
    };
    return {
      ...toRefs(data),
      ...methods,
      ...toRefs(props),
    };
  },
});
</script>

<style lang="less" scoped>
.videonew {
  margin: 15px 10px 0 10px;
}

.video {
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
  font-size: 0;
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }
}

.title {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  background-color: #f2f6fc;
  padding-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.bottom {
  height: 40px;
  line-height: 40px;
  display: flex;

  .icon {
    margin-right: 3px;
  }

  .number {
    font-size: 10px;
    color: #909399;
  }
}

.line {
  height: 6px;
  background-color: #efefef;
  width: 100vw;
}

.playicon {
  font-size: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .iconfont {
    font-size: 35px;
    color: rgba(255, 255, 255, 0.6);
  }
}
</style>
