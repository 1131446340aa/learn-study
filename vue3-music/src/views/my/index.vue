<template>
  <div class="main">
    <BScroll :height="height" :data="collectplay">
      <div>
        <div class="item" @click="tohistoryplay">
          <div class="icon">
            <i class="iconfont icon-zuijinbofang"></i>
          </div>
          <div class="text">最近播放</div>
        </div>
        <div class="item" @click="tocollectmusic">
          <div class="icon">
            <i class="iconfont icon-wodeshoucang"></i>
          </div>
          <div class="text">我的收藏</div>
        </div>
        <div class="item">
          <div class="icon">
            <i class="iconfont icon-wodediantai"></i>
          </div>
          <div class="text">我的电台</div>
        </div>
      </div>
      <van-collapse v-model="activeNames" v-show="flage">
        <van-collapse-item name="1" icon="arrow">
          <template #title>
            <div class="title">
              创建的歌单
              <div class="icon">
                <i class="iconfont icon-wode"></i>
              </div>
            </div>
          </template>

          <div class="items" v-for="(item, index) in createdlist" :key="index" @click="toplaylist(index)">
            <lines :item="item"></lines>
          </div>
        </van-collapse-item>

        <van-collapse-item title="收藏的歌单" name="2" icon="arrow">
          <div class="items" v-for="(item, index) in collectplay" :key="index" @click="tosingsheet(index)">
            <lines :item="item"></lines>
          </div>
        </van-collapse-item>
      </van-collapse>
    </BScroll>
  </div>
</template>

<script lang="ts">
import { loginStatus, userPlaylist } from "../../network/index";

import BScroll from "../../components/scroll/index.vue";
import lines from "../../components/line/index.vue";
import { useRouter } from "vue-router";
import Store from "../../store/index";
import { onMounted, reactive, toRefs } from "vue";
import { Playlist } from "@/network/UserPlayList";
export default {
  components: { lines, BScroll },
  setup() {
    const data = reactive({
      activeNames: [""],
      createdlist: [] as Playlist[],
      router: useRouter(),
      collectplay: [] as Playlist[],
      flage: false,
      height: "",
    });
    data.height = window.innerHeight / 10 - 8.8 + "rem";
    loginStatus(() => {
      data.flage = true;
    });
    const methods = {
      toplaylist(index: number) {
        data.router.push({
          path: "/singsheetdetail",
          query: { id: data.createdlist[index].id },
        });
      },
      tosingsheet(index: number) {
        data.router.push({
          path: "/singsheetdetail",
          query: { id: data.collectplay[index].id },
        });
      },
      tohistoryplay() {
        data.router.push({
          path: "/historyPlay",
        });
      },
      tocollectmusic() {
        loginStatus(() => {
          data.router.push({
            path: "/collectMusic",
          });
        }, true);
      },
    };
    userPlaylist((res) => {
      res.playlist.forEach((item) => {
        item.userId == localStorage.id ? data.createdlist.push(item) : data.collectplay.push(item);
      });
    });
    return {
      ...methods,
      ...toRefs(data),
    };
  },
};
</script>

<style lang="less" scoped>
.item {
  display: flex;
  line-height: 40px;
  height: 40px;
  border-bottom: 1px solid #e4e7ed;

  .icon {
    width: 60px;
    text-align: center;

    .iconfont {
      font-size: 30px;
    }
  }

  .text {
    flex: 1;
    font-size: 14px;
  }
}

.title {
  display: flex;
  justify-content: space-between;

  .icon {
    margin-right: 10px;
  }
}
</style>
