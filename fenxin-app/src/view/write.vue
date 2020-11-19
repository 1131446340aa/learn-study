<template>
  <div class="container" @click.capture.prevent="PublishLeave">
    <div class="header">
      <input class="left" placeholder="请输入完整标题" v-model="title" />
      <div class="right">
        <span class="caogao">文章保存至</span>
        <span class="caogao button" @click="saveCaoGao">草稿</span>
        <a @click="IsShowPublish">发布</a>
        <div class="pop" v-show="isShow">
          <div>分类</div>
          <el-button
            v-for="(item,index) in artiType"
            :key="index"
            size="mini"
            @click.capture.prevent="selectType(index)"
          >{{item}}</el-button>
          <div class="publish">
            <el-button size="mini" @click="publish">发布</el-button>
          </div>
        </div>

        <img :src="userInfo.data[0].picture" alt="头像" />
      </div>
    </div>
    <div class="main">
      <div class="left">
        <textarea class="textarea" @input="handleInput"></textarea>
      </div>
      <div class="right" v-html="compiledMarkdown"></div>
    </div>
    <message :visible="isCaoGao" :type="type">{{$message}}</message>
  </div>
</template>

<script lang="ts">
import marked from "marked"
import message from "../components/message.vue"
import hljs from "highlight.js"
import "highlight.js/styles/monokai-sublime.css"
import { Debounce } from "../util/debounce"
import { PostPublish } from "../network"
import { JieLiu } from "../util/jieliu"
import { reactive, toRefs, ref, computed } from "vue"
import { useRouter } from "vue-router"
export default {
  components: { message },
  setup() {
    const renderer = new marked.Renderer()

    // console.log(JSON.parse(localStorage.blogUserInfo));

    marked.setOptions({
      renderer: renderer,
      gfm: true,
      pedantic: false,
      sanitize: false,
      // tables: true,
      breaks: false,
      smartLists: true,
      smartypants: false,

      highlight: function (code: string) {
        return hljs.highlightAuto(code).value
      },
    })
    const state = reactive({
      title: "",
      articleContent: "",
      userInfo: JSON.parse(localStorage.blogUserInfo),
      isCaoGao: false,
      router: useRouter(),
      type: "success",
      $message: "",
      isShow: false,
      artiType: ["前端", "后端", "人工智能", "生活", "安卓", "阅读"],
      Type: "",
    })
    let compiledMarkdown = computed(function () {
      return marked(state.articleContent, { sanitize: true })
    })
    const DebouncehandleInput = Debounce(function (e: string) {
      state.articleContent = e
    }, 300)

    const methods = {
      selectType(key: number) {
        state.isShow = true
        state.Type = state.artiType[key]
      },
      publish: JieLiu(() => {
        state.isShow = false
        if (state.title && state.articleContent && state.Type) {
          PostPublish(
            {
              content: state.articleContent,
              artiName: state.title,
              isSave: 1,
              type: state.Type,
            },
            (res) => {
              // state.router.push("/hots")
            }
          )
        } else {
          state.isCaoGao = true
          state.$message = "请输入内容和标题和选择类型"
          state.type = "warning"
          setTimeout(() => {
            state.isCaoGao = false
          }, 2000)
        }
      }, 300),
      IsShowPublish() {
        state.isShow = true
      },
      PublishLeave() {
        state.isShow = false
      },
      handleInput(e) {
        DebouncehandleInput(e.currentTarget.value as string)
        // console.log(articleContent);
      },
      saveCaoGao() {
        if (state.articleContent || state.title) {
          PostPublish(
            {
              content: state.articleContent,
              artiName: state.title,
              isSave: 0,
              type: "null",
            },
            (res) => {
              if (res.error === 0) {
                state.isCaoGao = true
                state.$message = "已保存至草稿"
                setTimeout(() => {
                  state.isCaoGao = false
                }, 2000)
              }
            }
          )
        } else {
          state.isCaoGao = true
          state.$message = "先写点什么吧"
          state.type = "warning"
          setTimeout(() => {
            state.isCaoGao = false
          }, 2000)
        }
      },
    }

    return {
      marked,
      compiledMarkdown,
      ...methods,
      ...toRefs(state),
    }
  },
}
</script>
<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  font-size: 16px;
  .header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding: 0 30px;
    box-sizing: border-box;
    height: 60px;
    line-height: 60px;
    img {
      position: relative;
      top: 10px;
      cursor: pointer;
    }
    .left {
      font-size: 28px;
      outline: none;
      border: none;
      font-weight: 700;
      color: rgb(59, 59, 59);
    }
    .el-input {
      width: 30vw;
    }
    .right {
      margin-right: 70px;
      position: relative;
      .caogao {
        color: #ddd;
        font-size: 14px;
      }
      .button {
        border: 1px solid currentColor;
        padding: 0 4px;
        box-sizing: border-box;
        margin-left: 7px;
        margin-right: 20px;
        cursor: pointer;
        &:hover {
          color: #1890ff;
        }
      }
      a {
        color: #007fff;
      }
      img {
        height: 28px;
        width: 28px;
        border-radius: 14px;
        margin-left: 20px;
      }
    }
  }

  .main {
    flex: 1;
    display: flex;

    .left {
      flex: 1;
      background-color: rgba(222, 222, 222, 0.3);
      border-right: 1px solid #ddd;
    }

    .right {
      flex: 1;
      border-color: #000;
      padding: 20px 40px;
      box-sizing: border-box;
      /deep/ pre {
        background-color: #f8f8f8 !important;
        /* margin:20px 40px; */
        padding: 10px 10px;
      }
      /deep/ p {
        line-height: 40px;
      }
      /deep/ h2 {
        line-height: 60px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;
      }
      /deep/ h1 {
        line-height: 80px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;
      }
      pre > code {
        border: 0px !important;
      }

      code {
        background-color: #fff5f5;
        border-radius: 3px;
        font-size: 12px;
        /* padding: 2px 10px; */
        /* color:#0086b3; */
      }
    }
  }
  .textarea {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    overflow: auto;
    color: #0086b3;
    line-height: 20px;
  }
}
.pop {
  position: absolute;
  width: 240px;
  top: 60px;
  line-height: 40px;
  right: -50px;
  color: #909090;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 2px;
  box-shadow: 0 1px 2px #f1f1f1;
  padding: 15px;
  .publish {
    text-align: center;
    margin-top: 30px;
  }
}
</style>