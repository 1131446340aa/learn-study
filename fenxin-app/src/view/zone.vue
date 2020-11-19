<template>
<div class="contaoner">
  <div class="header">
    <img :src="userInfo?.picture" />
    <div class="user">
      <div class="name">{{userInfo?.nickName || '暂未填写'}}</div>
      <div class="work">{{userInfo?.work || '暂未填写'}}</div>
      <div class="intro">{{userInfo?.des || '暂未填写'}}</div>
    </div>
    <div class="bianji" v-show="isowner" @click="toProfile">
      <el-button plain>编辑个人资料</el-button>
    </div>
  </div>
  <div class="tabbar">
    <div class="tabbar-item" v-for="(item,index) in tabbar" :key="index" @click="changeKey(String(index))" :class="index==keys ? 'activeTabbar' : ''">{{item}}</div>
  </div>
  <Article :articleDate="articleDate" class="article" v-if="keys==='0'"></Article>
  <Article :articleDate="articleDate" class="article" v-if="keys==='1'"></Article>
  <div class="guanzhu-container" v-if="keys==='2'">
    <div class="guanzhu" v-for="(item,index) in loves" :key="index" @click="toZore(item.userId,item.userName)">
      <img :src="item?.picture" />
      <div class="user">
        <div class="name">{{item.nickName}}</div>
        <div class="work">{{item.work}}</div>
      </div>
      <div v-if="isowner" class="love" :class="loveKey && 'loveactived'" @click="updateLove(item.id)">{{desc}}</div>
    </div>
  </div>
  <Article :articleDate="articleDate" class="article" v-if="keys==='3'"></Article>
</div>
</template>

<script lang="ts">
import {
  reactive,
  toRefs,
  onMounted
} from "vue"
import {
  useRoute,
  useRouter
} from "vue-router"
import Article from "../components/article.vue"
import {
  JieLiu
} from "../util/jieliu"
import {
  allLoves,
  postUpdateLove,
  GetUserInfo
} from "../network/index"
export default {
  components: {
    Article,
  },
  setup() {
    let state = reactive({
      userInfo: {
        id: "",
      },
      tabbar: ["文章", "赞", "关注", "收藏"],
      keys: "-1",
      articleDate: {
        type: "",
        isNew: 0,
        createdId: "-1",
        collections: "",
        approve: "",
      },
      loves: {
        count: 0,
        rows: [],
      },
      loveKey: true,
      route: useRoute(),
      router: useRouter(),
      desc: "已关注",
      isowner: false,
    })

    let methods = {
      changeKey(index) {
        if (index === "0") {
          state.route.query.keys = "0"
          state.articleDate.collections = ""
          state.articleDate.approve = ""
        }
        if (index === "3") {
          state.route.query.keys = "3"
          state.articleDate.collections = "1"
          state.articleDate.approve = ""
        }
        if (index === "2") {
          state.articleDate.collections = ""
          state.route.query.keys = "2"
          state.articleDate.approve = ""
          allLoves(
            (res) => {
              if (res.error === 0) {
                state.loves = res.data
              }
            }, {
              userId: state.userInfo.id,
            }
          )
        }
        if (index === "1") {
          state.route.query.keys = "1"
          state.articleDate.collections = ""
          state.articleDate.approve = "1"
        }
        state.keys = index
        state.articleDate.createdId = state.userInfo.id
      },
      updateLove: JieLiu((targetId) => {
        postUpdateLove(
          (res) => {
            if (res.error === 0) {
              if (state.desc === "已关注") {
                state.desc = "关注"
              } else {
                state.desc = "已关注"
              }
              state.loveKey = !state.loveKey
            }
          }, {
            targetId,
            isAdd: !state.loveKey,
          }
        )
      }, 500),
      toProfile() {
        state.router.push("/profile")
      },
      toZore(id, userName) {
        state.router.push({
          path: "/zone",
          query: {
            createdId: id,
            keys: 0,
            userName,
          },
        })
        setTimeout(() => {
          location.reload()
        })
      },
    }

    onMounted(() => {
      methods.changeKey(state.route.query.keys)
      GetUserInfo(
        (res) => {
          console.log(JSON.parse(localStorage.blogUserInfo));

          state.userInfo = res.data[0]
          if (
            state.userInfo.id ===
            JSON.parse(localStorage.blogUserInfo)?.data[0]?.id
          ) {
            state.isowner = true
          }
        }, {
          userName: state.route.query.userName
        }
      )
    })

    return {
      ...toRefs(state),
      ...methods,
    }
  },
}
</script>

<style lang="less" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

.guanzhu {
  padding: 10px 20px;
  box-sizing: border-box;
  width: 900px;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
}

.contaoner {
  width: 900px;
  margin: 0 auto;

  .header {
    display: flex;
    padding: 20px;
    background-color: #fff;
    margin-top: 20px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    text-rendering: optimizeLegibility;
    color: #333;

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-right: 40px;

      &:hover {
        animation: 0.3s rotate linear infinite;
      }
    }

    .name {
      color: #000;
      font-weight: 600;
      font-size: 28px;
      line-height: 40px;
    }

    .work,
    .intro {
      line-height: 30px;
      color: #72777b;
    }

    .bianji {
      flex: 1;
      text-align: right;
      padding-top: 50px;
      box-sizing: border-box;
    }
  }

  .tabbar {
    position: relative;
    z-index: 0;
    top: 20px;
    display: flex;
    padding-left: 20px;
    padding-right: 400px;
    box-sizing: border-box;
    background-color: #fff;
    color: #909090;
    line-height: 50px;

    align-items: center;

    .tabbar-item {
      flex: 1;
      cursor: pointer;
      padding-left: 40px;
      box-sizing: border-box;
    }
  }

  .activeTabbar {
    border-bottom: 1px solid #9e9e9e;
    box-shadow: inset 0 -2px 0 #3780f7;
    color: #3780f7;
  }

  .article {
    margin-top: 0;
  }

  .guanzhu-container {
    margin-top: 20px;

    .guanzhu {
      box-sizing: border-box;
      padding: 20px;
      padding-bottom: 10px;
      display: flex;
      background-color: #fff;
      border-top: 1px solid #f1f1f1;

      .love {
        margin: 0 0 0 auto;
        padding: 0;
        width: 55px;
        height: 26px;
        line-height: 26px;
        margin-top: 27px;
        font-size: 13px;
        border: 1px solid #6cbd45;
        color: #6cbd45;
        text-align: center;
        background-color: #fff;
        cursor: pointer;
        border-radius: 2px;
        transition: background-color 0.3s, color 0.3s;

        &:hover {
          background-color: -internal-light-dark(rgb(239, 239, 239),
              rgb(74, 74, 74));
          opacity: 0.8;
        }
      }

      .loveactived {
        color: #fff;
        border-color: #6cbd45;
        background-color: #6cbd45;
      }

      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin-right: 20px;
      }

      .user {
        line-height: 25px;
      }
    }
  }
}
</style>
