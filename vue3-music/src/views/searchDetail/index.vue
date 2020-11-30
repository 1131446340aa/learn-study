<template>
  <div>
    <div class="search">
      <div class="left" @click="goback">
        <i class="iconfont icon-left-arrow"></i>
      </div>
      <div class="middle">
        <van-search shape="round" v-model="value" autofocus="true" placeholder="请输入搜索关键词" @input="search" />
      </div>
    </div>
    <BScroll :pullup="true" @scrollToEnd="pullup" :height="height" :data="songs">
      <div class="item" v-for="(item, index) in songs" :key="item.index" @click="tomusic($event, index)">
        <div class="left">
          <div class="songname">{{ item.name }}</div>
          <div class="singername">{{ item.artists[0].name }}-{{ item.name }}</div>
        </div>
        <div class="right"></div>
      </div>
    </BScroll>
  </div>
</template>

<script lang="ts">
import { getSearch } from "../../network/index";
import BScroll from "../../components/scroll/index.vue";
import { mapActions, mapMutations } from "vuex";
import { reactive, onMounted, toRefs, Events } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Songs } from "../../network/Search";
import Store from "../../store/index";
// import controlbar from './controlbar'
export default {
  components: {
    BScroll,
    // controlbar,
  },

  setup() {
    const data = reactive({
      value: "",
      searchs: () => {},
      songs: [] as Songs[],
      offset: 0,
      newvalue: "",
      route: useRoute(),
      height: "",
      router: useRouter(),
    });
    data.height = window.innerHeight / 10 - 5.4 + "rem";
    onMounted(() => {
      data.value = data.route.query.value as string;
      data.newvalue = data.value;
      data.searchs = methods.debounce(() => {
        methods.getMusic();
      }, 400);
      methods.getMusic();
    });
    const methods = {
      // ...mapMutations(["saveSingsheet"]),
      search() {
        data.searchs();
      },
      pullup() {
        methods.getMusic();
      },
      tomusic(e: Events, index: number) {
        data.router.push({
          path: "/music",
        });

        if (!localStorage.keys) {
          localStorage.keys = JSON.stringify([data.songs[index].name]);
        } else {
          let arr = JSON.parse(localStorage.keys);
          arr = [...new Set([data.songs[index].name, ...arr])];
          localStorage.keys = JSON.stringify(arr);
        }
        Store.methods.changeIndex(index);
        Store.methods.changeSingSheet(data.songs);
      },
      debounce(func: Function, wait: number) {
        let timeout = 0;
        return function () {
          if (timeout) {
            clearTimeout(timeout);
          }

          timeout = setTimeout(() => {
            func(arguments);
          }, wait);
        };
      },
      goback() {
        data.router.go(-1);
      },
      getMusic() {
        if (data.value) {
          getSearch(
            data.value,
            30,
            (res) => {
              if ((data.value, data.value === data.newvalue)) {
                data.newvalue = data.value;
                data.offset = data.offset + 1;
                data.songs = [...data.songs, ...res.result.songs];
              } else {
                data.offset = 0;
                data.songs = [];
                data.newvalue = data.value;
                methods.getMusic();
              }
            },
            data.offset * 30
          );
        }
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
.search {
  height: 5.4rem;
  display: flex;

  .middle {
    flex: 1;
  }

  .left {
    margin: 0.5rem 1rem 0 1rem;
    line-height: 49px;
  }
}

.item {
  margin: 0 1rem;

  .songname {
    margin-top: 2rem;
    margin-bottom: 0.3rem;
    color: #0d22aa;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .singername {
    font-size: 1rem;
    color: #6e6e6e;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 70vw;
  }
}
</style>
