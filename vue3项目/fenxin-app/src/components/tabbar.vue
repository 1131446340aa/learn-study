<template>
<div class="container" @click.self="hiddenSelect">
  <div class="left">焚心</div>
  <div class="middle">
    <div class="middle-item" v-for="(item,index) in tabbarInfo" :key="index">
      <a :href="item.to" :class="path === item.to && 'activeTab'">
        {{
          item.name
          }}
      </a>
    </div>
  </div>
  <div class="right">
    <el-input ref="searchRef" placeholder="请输入内容" class="search" @input="(e)=>{inputValue=e}"></el-input>
    <el-button icon="el-icon-search" class="btn" @click="toSearch"></el-button>
    <div class="text">
      <a @click="toWrite">
        <img class="img" src="https://b-gold-cdn.xitu.io/v3/static/img/submit-icon.53f4253.svg" alt="写文章" />
        <span class="write">写文章</span>
      </a>
      <span class="userinfo" v-if="userInfo?.error!==0">
        <a href="/login">
          <span class="login">登录</span>
        </a>
        <a href="/register">
          <span class="register">注册</span>
        </a>
      </span>

      <span class="user" v-if="userInfo?.error===0">
        <a to="/notify">
          <i class="el-icon-bell" :style="{'font-size':'20px'}"></i>
        </a>
        <div class="userSelect">
          <img :src="userInfo?.data && userInfo?.data[0]?.picture" @click="showSelect" />

          <div class="showSelect" v-show="isShowUserSelect" @click="hiddenSelect">
            <div class="showSelectItem" @click="toWrite">
              <i class="iconfont icon-bi icon"></i> 写文章
            </div>
            <div class="showSelectItem">
              <i class="iconfont icon-caogaoxiang-chakanrenlingjilu icon"></i> 草稿
            </div>

            <div class="showSelectItem" @click="toZore('0')">
              <i class="el-icon-user-solid icon"></i> 我的主页
            </div>
            <div class="showSelectItem" @click="toZore('1')">
              <i class="iconfont icon-ziyuan icon"></i> 我赞过的
            </div>
            <div class="showSelectItem" @click="toZore('3')">
              <i class="el-icon-star-on icon"></i> 我的收藏
            </div>
            <div class="showSelectItem" @click="postExit('3')">
              <i class="iconfont icon-tuichu icon"></i> 退出登陆
            </div>
          </div>
        </div>
      </span>
    </div>
  </div>
</div>
<message :visible="visible">{{message}}</message>
</template>

<script lang="ts">
import {
  reactive,
  toRefs,
  toRef,
  ref
} from "vue"
import {
  useRoute,
  useRouter
} from "vue-router"
import {
  AxiosDate
} from "../interface/index"
import processMessage from "../mixins/controllMessage"
import message from "./message.vue"
import {
  JieLiu
} from "../util/jieliu"
import {
  exit
} from '../network/index'
import myStore from "../mixins/globalvariable"

export default {
  components: {
    message
  },
  setup() {
    const {
      messageState,
      changeVisible
    } = processMessage
    let {
      store,
      hiddenSelect,
      showSelect
    } = myStore
    const state = reactive({
      tabbarInfo: [{
          name: "热门",
          to: "/hots"
        },
        {
          name: "前端",
          to: "/fornted"
        },
        {
          name: "后端",
          to: "/backed"
        },
        {
          name: "安卓",
          to: "/android"
        },
        {
          name: "人工智能",
          to: "/ai"
        },
        {
          name: "阅读",
          to: "/read"
        },
        {
          name: "人生",
          to: "/life"
        },
      ],
      userInfo: JSON.parse(localStorage.blogUserInfo),
      path: useRoute().path,
      router: useRouter(),
      inputValue: "",
    })
    let searchRef = ref()
    state.path === "/" && (state.path = "/hots")
    const methods = {
      toSearch: JieLiu(() => {
        if (state.inputValue) {
          state.router.push({
            path: "/search",
            query: {
              keyWord: state.inputValue
            },
          })
          if (location.pathname === "/search") {
            setTimeout(() => {
              location.reload()
            })
          }
          state.inputValue = ""
          searchRef.value.setNativeInputValue("")
        } else {
          changeVisible("请输入搜索内容", 1000)
        }
      }, 300),
      postExit() {
        exit(res => {
          localStorage.blogUserInfo = JSON.stringify(res)
          state.router.push('/hots')
        })
      },
      toWrite: () => {
        methods.toLogin()
        if (state.userInfo.error === 0) {
          state.router.push("/write")
        }
      },
      toLogin: (isShowMessage = true) => {
        if (state.userInfo.error === 10005) {
          isShowMessage || changeVisible("请先登陆", 1000)
          state.router.push("/login")
          return
        }
      },
      toZore(keys, userName) {
        state.router.push({
          path: '/zone',
          query: {
            createdId: state.userInfo?.data[0].id,
            keys,
            userName: state.userInfo?.data[0].userName
          }
        })
      }
    }
    return {
      ...toRefs(state),
      ...toRefs(messageState),
      hiddenSelect,
      showSelect,
      ...toRefs(store),
      ...methods,
      searchRef,
    }
  },
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  height: 60px;
  border-bottom: 1px solid #f1f1f1;
  line-height: 60px;
  box-sizing: border-box;
  padding: 0 120px;
  min-width: 1240px;

  .left {
    color: #007fff;
    font-size: 26px;
    padding-right: 40px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .middle {
    display: flex;
    flex: 1;

    .middle-item {
      text-align: center;
      width: 80px;
      cursor: pointer;

      .activeTab {
        color: #007fff;
      }
    }
  }

  .right {
    width: 500px;
    color: #007fff;
    display: flex;

    .btn {
      border-left: 0px solid #000;
      height: 40px;
      margin-top: 10px;
      border-radius: 0;
    }

    .img {
      position: relative;
      top: 5px;
      margin-left: 50px;
    }

    /deep/ .el-input__inner {
      border-radius: 0px;
      width: 200px;
    }

    .el-input {
      width: 200px;
    }

    .login,
    .write,
    .register {
      color: #007fff;
      margin-right: 20px;
    }
  }
}

.user {
  img {
    width: 30px;
    height: 30px;
    border-radius: 15px;
    position: relative;
    top: 8px;
    margin-left: 30px;
    cursor: pointer;
  }

  .userSelect {
    position: relative;
    display: inline-block;

    .showSelect {
      position: absolute;
      z-index: 3;
      width: 160px;
      background-color: #fff;
      padding: 0 15px;
      padding-top: 20px;
      box-sizing: border-box;
      right: -20px;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(177, 180, 185, 0.45);
      border-radius: 4px;
      font-size: 16px;
      color: #71777c;

      .showSelectItem {
        cursor: pointer;
        line-height: 30px;
        margin: 10px 0px;

        &:hover {
          background-color: #f2f6fc;
        }
      }

      .icon {
        margin-right: 10px;
      }
    }
  }
}
</style>
