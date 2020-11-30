<template>
  <BScroll :height="height" :data="personalized">
    <div class="swiper">
      <div class="van">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="item in banners" :key="item.index">
            <div class="img">
              <img :src="item.imageUrl" />
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="middlebar">
        <div class="item" @touchstart="getpos" @touchend="toRecommend">
          <div class="image">
            <img src="../../assets/Recommend.png" />
          </div>
          <div class="text">每日推荐</div>
        </div>
        <div class="item" @touchstart="getpos" @touchend="toPlaylist">
          <div class="image">
            <img src="../../assets/sing.png" />
          </div>
          <div class="text">歌单</div>
        </div>
        <div class="item" @touchstart="getpos" @touchend="toRating">
          <div class="image">
            <img src="../../assets/Ranking.png" />
          </div>
          <div class="text">排行榜</div>
        </div>
        <div class="item">
          <div class="image">
            <img src="../../assets/radio-station.png" />
          </div>
          <div class="text" @touchstart="getpos" @touchend="toDianTai">电台</div>
        </div>
      </div>
      <div class="fz-18">推荐歌单</div>
      <Singsheet :personalized="personalized"></Singsheet>
    </div>
  </BScroll>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, reactive, ref, toRefs } from "vue";
import BScroll from "../../components/scroll/index.vue";
import Singsheet from "../../components/singsheet/index.vue";
import { getBanner, getPersonalized } from "../../network/index";
import { Banners } from "../../network/Banner";
import { Result } from "../../network/Personalized";
import { Router, useRouter } from "vue-router";

export default defineComponent({
  components: {
    BScroll,
    Singsheet,
  },

  setup(props, { emit }) {
    const data = reactive({
      height: "0 px",
      banners: [] as Banners[],
      personalized: [] as Result[],
      router: useRouter(),
    });
    let e = { x: 0, y: 0 };
    const methods = {
      toPlaylist(event: any) {
        if (Math.abs(event.changedTouches[0].clientX - e.x) > 10 || Math.abs(event.changedTouches[0].clientX - e.y) > 10) return;

        data.router.push({ path: "/playlistSquare" });
      },
      getpos(event: any) {
        e.x = event.changedTouches[0].pageX;
        e.y = event.changedTouches[0].pageX;
      },
      toRating(event: any) {
        if (Math.abs(event.changedTouches[0].clientX - e.x) > 10 || Math.abs(event.changedTouches[0].clientX - e.y) > 10) return;

        data.router.push({ path: "/rating" });
      },
      toRecommend(event: any) {
        if (Math.abs(event.changedTouches[0].clientX - e.x) > 10 || Math.abs(event.changedTouches[0].clientX - e.y) > 10) return;

        data.router.push({ path: "/recommend" });
      },
      toDianTai(event: any) {
        if (Math.abs(event.changedTouches[0].clientX - e.x) > 10 || Math.abs(event.changedTouches[0].clientX - e.y) > 10) return;

        emit("toDianTai");
      },
    };
    data.height = window.innerHeight / 10 - 8.8 + "rem";

    onMounted(() => {
      getBanner((res) => {
        data.banners = res.banners;
      });
      getPersonalized((res) => {
        data.personalized = res.result.slice(0, 12);
      });
    });

    return {
      ...toRefs(data),
      ...methods,
    };
  },
});
</script>

<style lang="less" scoped>
.van {
  margin: 0 1rem;
}

.fz-18 {
  font-size: 1.8rem;
  margin-left: 1rem;
}

.img {
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  font-size: 0;

  img {
    width: 100%;
    height: 100%;
  }
}

.swiper {
  border-radius: 0.5rem;
  overflow: hidden;
  // margin 0 10px
  font-size: 1rem;
}

.middlebar {
  display: flex;
  margin-top: 1rem;
  margin-left: 1rem;

  .item {
    flex: 1;

    .image {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      margin: 0 auto;

      img {
        width: 3.5rem;
        height: 3.5rem;
      }
    }

    .text {
      font-size: 1.2rem;
      margin-top: 0.4rem;
      text-align: center;
      margin-bottom: 1.5rem;
    }
  }
}
</style>
