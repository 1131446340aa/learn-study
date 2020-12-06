<template>
  <div class="main">
    <div class="wrapper">
      <div class="image">
        <img :src="result.coverImgUrl" />
      </div>
      <div class="detail">
        <div class="name">{{ result.name }}</div>
        <div class="user">
          <div class="userimg" v-if="result.creator">
            <img :src="result.creator.avatarUrl" />
          </div>
          <div class="username" v-if="result.creator">{{ result.creator.nickname }}</div>
        </div>
        <div class="van-multi-ellipsis--l2 introduce">{{ result.description }}</div>
      </div>
    </div>
    <div class="bg">
      <img :src="result.coverImgUrl" />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
import { getPlaylistDetail } from "../../network/index";
import { useRoute } from "vue-router";
import Store from "../../store/index";
import { Playlist } from "@/network/PlayListDetail";
export default {
  setup() {
    const data = reactive({ result: {} as Playlist, route: useRoute() });
    const methods = {
      getPlaylist() {
        getPlaylistDetail(data.route.query.id as string, (res) => {
          data.result = res.playlist;
          Store.methods.changePlaylist(res.playlist);
        });
      },
    };
    methods.getPlaylist();
    return { ...methods, ...toRefs(data) };
  },
};
</script>

<style lang="less" scoped>
.main {
  position: relative;
  padding-top: 3rem;
}

.bg {
  position: absolute;
  left: 0;
  right: 0;
  height: 30vw;
  z-index: -1;
  top: -0px;

  img {
    width: 100vw;
    height: 40vh;
    filter: blur(30px);
  }
}

.wrapper {
  margin: 20px 0 20px 10px;
  display: flex;

  .image {
    width: 30vw;
    height: 30vw;
    border-radius: 5px;
    overflow: hidden;

    img {
      width: 30vw;
      height: 30v;
    }
  }

  .detail {
    height: 30vw;
    flex: 1;
    margin-left: 15px;

    .name {
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 7vw;
      line-height: 7vw;
      max-width: 65vw;
      color: #ffffff;
    }

    .user {
      display: flex;
      height: 7vw;
      line-height: 7vw;

      .userimg {
        width: 5vw;
        height: 5vw;
        margin-top: 1vw;
        margin-right: 10px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 5vw;
          height: 5vw;
        }
      }

      .username {
        font-size: 12px;
        color: #e4e7ed;
      }
    }

    .introduce {
      margin-top: 8vw;
      font-size: 10px;
      color: #c0c4cc;
    }
  }
}
</style>
