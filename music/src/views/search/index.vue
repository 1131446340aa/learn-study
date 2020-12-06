<template>
  <div>
    <div class="search">
      <div class="left" @click="goback">
        <i class="iconfont icon-left-arrow"></i>
      </div>
      <div class="middle">
        <van-search v-model="value" shape="round" @search="tosearchdetail" autofocus="true" placeholder="请输入搜索关键词" @input="search" />
      </div>
      <div class="right">
        <i class="iconfont icon-lianxiren"></i>
      </div>
    </div>
    <BSroll :height="height" :data="hots">
      <div class="main" v-show="!value">
        <div class="histoty-wrapper" v-show="history">
          <div class="history">
            <div class="left">历史记录</div>
            <div class="right" @click="deletehistory">
              <i class="iconfont icon-shanchu"></i>
            </div>
            <div class="open" @click="open" v-show="isshou">
              <i class="iconfont icon-shouqi"></i>
            </div>
          </div>
          <div class="history-list" :class="{ shou: isshou }">
            <div class="history-item" @click="tosearchdetail(item)" v-for="item in history" :key="item">{{ item }}</div>
            <div class="shouqi" v-show="!isshou" @click="shou">
              <i class="iconfont icon-shouqi1"></i>
            </div>
            <div class="history-item-line-wrap"></div>
          </div>
        </div>
        <div class="history-wrapper"></div>
        <div class="hot-title">热搜榜</div>
        <div class="hot-wrapper" v-for="(item, index) in hots" :key="index">
          <div class="left">
            <div class="number">{{ index + 1 }}</div>
            <div class="text" @click="tosearchdetail(item.searchWord)">{{ item.searchWord }}</div>
          </div>
          <div class="right"></div>
        </div>
      </div>
      <div class="search-wrapprt" v-show="value">
        <div class="search-item" v-for="item in songs" :key="item.index" @click="tosearchdetail(item.name)">
          <div class="icon">
            <i class="iconfont icon-sousuo"></i>
          </div>
          <div class="text">{{ item.name }}</div>
        </div>
      </div>
    </BSroll>
  </div>
</template>

<script lang="ts">
import { getHotSearch, getSearch } from "../../network/index";
import BSroll from "../../components/scroll/index.vue";
import { onMounted, reactive, toRefs } from "vue";
import { Data } from "../../network/HotSearch";
import { Songs } from "../../network//Search";
import { useRouter } from "vue-router";
// import controlbar from "./controlbar";
export default {
  components: {
    BSroll,
    // controlbar,
  },
  setup() {
    const data = reactive({
      hots: [] as Data[],
      value: "",
      searchs: () => {},
      songs: [] as Songs[],
      history: "",
      isshou: true,
      height: "",
      router: useRouter(),
    });

    data.height = window.innerHeight / 10 - 5.4 + "rem";
    onMounted(() => {
      getHotSearch((res) => {
        data.hots = res.data;
      });
    });
    const methods = {
      shou() {
        data.isshou = true;
      },
      deletehistory() {
        localStorage.keys = "";
        data.history = localStorage.keys;
      },
      tosearch() {},
      open() {
        data.isshou = false;
      },
      goback() {
        data.router.go(-1);
      },
      debounce(func: Function, wait: number) {
        let timeout = 0;
        return function () {
          if (timeout) {
            clearTimeout(timeout);
          }
          timeout = setTimeout(() => {
            func.apply(data, arguments);
          }, wait);
        };
        this;
      },
      tosearchdetail(value: string, a: string) {
        data.value = value;
        data.router.push({
          path: "./searchdetail",
          query: { value: data.value },
        });
      },
      search() {
        data.searchs();
      },
    };
    if (localStorage.keys) {
      data.history = JSON.parse(localStorage.keys);
    }
    data.searchs = methods.debounce(() => {
      if (data.value) {
        getSearch(data.value, 15, (res) => {
          data.songs = res.result.songs;
        });
      }
    }, 400);
    return {
      ...toRefs(data),
      ...methods,
    };
  },
};
</script>
<style lang="less" scoped>
.open {
  position: absolute;
  top: 2.2rem;
  right: 0;
  height: 2rem;
  width: 2rem;
  border-radius: 1rem;
  background-color: rgba(242, 246, 252, 0.5);
  text-align: center;
}

.history-list {
  width: 85vw;
}

.shou {
  height: 2.6rem;
  overflow: hidden;
}

.history-item,
.shouqi {
  font-size: 1.2rem;
  display: inline-block;
  height: 2rem;
  border-radius: 1rem;
  background-color: rgba(242, 246, 252, 0.5);
  margin: 0.5rem 1rem 0.5rem 0;
  padding: 0 1rem;
  max-width: 75vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.shouqi {
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  padding: 0;
  text-align: center;

  .iconfont {
    font-size: 0.5rem;
  }
}

.search-item {
  display: flex;
  margin: 1.5rem 1rem;

  .icon {
    margin-right: 0.7rem;
  }

  .text {
    font-size: 1.4rem;
  }
}

.hot-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;

  .right {
    color: #f2f6fc;
    font-size: 1.2rem;
  }

  .left {
    display: flex;

    .number {
      font-size: 1.4rem;
      color: #6e6e6e;
      margin-right: 1.8rem;
      height: 1.6rem;
      line-height: 1.6rem;
    }

    .text {
      color: #000;
      font-size: 1.6rem;
      line-height: 1.6rem;
    }
  }
}

.hot-title {
  font-size: 1.4rem;
  margin-top: 1.5rem;
  font-weight: 700;
}

.main {
  margin: 0 1rem;
}

.search {
  display: flex;
  height: 5.4rem;

  .left {
    flex: 1;
    text-align: center;
    line-height: 5.4rem;
  }

  .middle {
    flex: 8;
  }

  .right {
    flex: 1;
    text-align: center;
    line-height: 5.4rem;

    .iconfont {
      font-size: 2.5rem;
    }
  }
}

.history {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  position: relative;

  .left {
    font-size: 1.4rem;
    font-weight: 700;
    height: 2rem;
    line-height: 2rem;
  }
}
</style>
