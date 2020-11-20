<template>
  <div class="container">
    <div class="second-menu">
      <span @click="change(0)" :class="index===0 && 'activated'" class="hots menu">热门</span>
      <span @click="change(1)" :class="index===1 && 'activated'" class="new menu">最新</span>
    </div>
    <div
      class="art-item"
      v-for="(item,index) in allArticle"
      :key="index"
      @click.self="toDetail(item.id,item.userId)"
    >
      <div class="left">
        <div class="user">
          <a class="name" @click.self="toZore(item.userId,item.userName)">{{item.nickName}}</a>
          <div class="time">{{processDate(item.updatedAt)}}</div>
          <a class="type" @click.self="toType(item.type)">{{item.type}}</a>
        </div>
        <div class="title" @click.self="toDetail(item.id,item.userId)">{{item.artiName}}</div>
        <div class="icon" @click.self="toDetail(item.id,item.userId)">
          <el-button>
            <i class="iconfont icon-ziyuan" :style="{'margin-right':'6px' , 'font-size':'12px'}"></i>
            {{item.approveCount}}
          </el-button>
          <el-button>
            <i class="el-icon-chat-square" :style="{'margin-right':'10px'}"></i>
            {{item.commentCount}}
          </el-button>
        </div>
      </div>
      <div class="right">
        <img
          src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2732275615,3209658337&fm=26&gp=0.jpg"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, ref, computed, onMounted, onUnmounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import { getAllArticle } from "../network/index"
import dateDiff from "../util/processDate"
import processMessage from "../mixins/controllMessage"
// import 'momunt/locale/zh-cn'
import ScrollBottom from "../util/scrollEnd"
export default {
  props: {
    articleDate: {
      default: () => ({ type: "", isNew: 0, createdId: "-1" }),
      type: Object,
    },
  },
  setup(props) {
    const state = reactive({
      router: useRouter(),
      index: 0,
      offset: 0,
      allArticle: [],
      route: useRoute(),
    })
    const { messageState, changeVisible } = processMessage
    const methods = {
      toDetail(id: string, userId: string) {
        state.router.push({ path: "/detail", query: { id, userId } })
      },
      change(key: number) {
        state.index = key
        props.articleDate.isNew = key
        ;(state.offset = 0), (state.allArticle = [])
        methods.getArticle()
      },
      toZore(id,userName) {
        if (state.route.path === "/zone") {
          location.reload()
        }
        state.router.push({
          path: "/zone",
          query: {
            createdId: id,
            keys: 0,
            userName
          },
        })
      },
      getArticle() {
        let options = {
          isNew: props.articleDate.isNew,
          limit: 5,
          offset: state.offset,
          type: props.articleDate.type,
          keyWord: "",
          createdId: "",
          collections: "",
          approve: "",
        }
        if (
          state.route.query.keyWord &&
          typeof state.route.query.keyWord === "string"
        ) {
          options.keyWord = state.route.query.keyWord
        }
        if (props.articleDate.createId !== "-1") {
          options.createdId = props.articleDate.createdId
        }
        if (props.articleDate.collections) {
          options.collections = props.articleDate.collections
        }
        if (props.articleDate.approve) {
          options.approve = props.articleDate.approve
        }
        getAllArticle((res) => {
          console.log(res);
          
          if (res.error === 0) {
            if (state.allArticle.length < res.data.allCount) {
              state.allArticle = [...state.allArticle, ...res.data?.result]
              state.offset += 5
            } else {
              // changeVisible('已加载完所有数据',2000)
            }
          }
        }, options)
      },
      toType(type:string) {
        let obj = {
          热门: "/hots",
          前端: "/fornted",
          后端: "/backed",
          安卓: "/android",
          阅读: "/read",
          生活: "/life",
        }

       if(obj[type]===location.pathname){
         location.reload()
         return 
       }
        state.router.push(obj[type])
      },
      processDate(date: string) {
        return dateDiff(Date.parse(date))
      },
    }
    let handleScroll = ScrollBottom(() => {
      methods.getArticle()
    })
    onMounted(() => {
      methods.getArticle()
    })
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll)
    })
    return {
      ...methods,
      ...toRefs(state),
      props,
      ...toRefs(messageState),
    }
  },
}
</script>

<style lang="less" scoped>
.art-item {
  width: 900px;
  margin: 0 auto;
  display: flex;
  background-color: #fff;
  justify-content: space-between;
  border-bottom: 1px solid #f1f1f1;
  padding: 0 30px;
  box-sizing: border-box;
  .left {
    .user {
      display: flex;
      margin-top: 15px;
      .time,
      .type {
        margin-left: 12px;
        font-size: 14px;
        cursor: pointer;
      }
      .name {
        font-size: 14px;
      }
    }
    .title {
      color: #2e3135;
      margin-top: 10px;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
    }
    .icon {
      margin-top: 10px;
      margin-bottom: 20px;
      .el-button {
        border-radius: 0;
        padding: 8px;
      }
      img {
        width: 12px;
        height: 12px;
        margin-right: 8px;
        border-top: 6px;
        box-sizing: border-box;
      }
      .el-button + .el-button {
        margin-left: 0px;
        border-left: 0 solid #000;
      }
    }
  }
  &:hover {
    opacity: 0.6;
  }
  &:visited {
    opacity: 0.7;
  }
  .right {
    img {
      height: 60px;
      width: 60px;
      margin-top: 30px;
      margin-right: 30px;
    }
  }
}
.second-menu {
  width: 900px;
  margin: 0 auto;
  border-radius: 2px;
  background-color: #fff;
  margin-top: 20px;
  display: flex;
  cursor: pointer;
  height: 60px;
  border: 1px solid #f1f1f1;
  box-sizing: border-box;
  .menu {
    height: 20px;
    padding: 0 15px;
    box-sizing: border-box;
    margin-top: 20px;
  }
  .activated {
    color: #007fff;
  }
  span:nth-child(1) {
    border-right: 1px solid #f1f1f1;
  }
  &:hover {
    color: #1890ff;
  }
}
</style>