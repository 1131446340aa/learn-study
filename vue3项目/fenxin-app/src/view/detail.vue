<template>
<div class="main">
  <div class="left">
    <div class="icon">
      <el-button circle @click="isApprove">
        <i class="iconfont icon-ziyuan" v-show="!approveKey"></i>
        <i :style="{'color':'#6cbd45'}" class="iconfont icon-ziyuan" v-show="approveKey"></i>
      </el-button>
    </div>
    <div class="icon" @click="isCommit">
      <el-button icon="el-icon-chat-line-round" circle></el-button>
    </div>
    <div class="icon" @click="isCollection">
      <el-button icon="el-icon-star-off" circle :class="collectionkey ? 'iconActivated' : ''"></el-button>
    </div>
  </div>
  <div class="container-main">
    <div class="container" @click.self="toZore(article.userId,article.userName)">
      <div class="user">
        <div class="user-detail">
          <img :src="article.picture" />
          <div class="info">
            <div class="name">{{article.nickName}}</div>
            <div class="dataTime">{{formateDate(Date.parse(article.updatedAt))}} 阅读 {{article.sawCount}}</div>
          </div>
        </div>
        <div class="love" :class="loveKey && 'loveactived'" @click.self="updateLove">关注</div>
      </div>
      <div class="left1">
        <div class="title">{{article.artiName}}</div>
        <div class="content" v-html="compiledMarkdown"></div>
      </div>
      <div class="input-commit" v-if="userInfo.error===0" ref="commit">
        <img :src="userInfo?.data?.picture" />
        <el-input placeholder="请输入内容" class="search" @input="(e)=>{commetValue=e}" ref="commitInput"></el-input>
        <el-button icon="el-icon-chat-square" class="btn" @click="pushCommit(0,commetValue)"></el-button>
      </div>
      <div class="commit" v-for="(commit) in commitData" :key="commit.id">
        <img :src="commit.picture" />
        <div class="content">
          <div class="name">{{commit.nickName}}</div>
          <div>{{commit.content}}</div>
          <div class="bottom">
            <div class="time">{{processDate(commit.updatedAt)}}</div>
            <div class="icon" @click="showReplyInput(commit.id)">
              <i class="el-icon-chat-round"></i>
              回复
            </div>
          </div>
          <div class="reply" v-if="reply===commit.id">
            <el-input @input="(e)=>{commetValue=e}" :placeholder="filiterPleacher(commit.nickName)"></el-input>
            <el-button class="reply-commit" @click="pushCommit(commit.id,commetValue)">评论</el-button>
          </div>
          <div v-if="commit.children">
            <div class="child-commit" v-for="(item,index) in commit.children" :key="index">
              <img :src="item.picture" />
              <div class="child-content">
                <div class="child-name">{{item.nickName}}</div>
                <div :style="{'font-size':'12px'}">
                  <sapn :style="{'font-size':'14px'}" v-if="item.parentId!==commit.id">
                    回复
                    <span :style="{'color':'#406599'}">{{idMapPrent[item.parentId].nickName}}</span>:
                  </sapn>
                  {{item.content}}
                </div>
                <div class="child-bottom">
                  <div class="child-time">{{processDate(item.updatedAt)}}</div>
                  <div class="child-icon" @click="showReplyInput(item.id)">
                    <i class="el-icon-chat-round"></i>
                    回复
                  </div>
                </div>
                <div class="reply" v-if="reply===item.id" @click.self="hiddenInput">
                  <el-input @input="(e)=>{commetValue=e}" :placeholder="filiterPleacher(item.nickName)"></el-input>
                  <el-button class="reply-commit" @click="pushCommit(item.id,commetValue)">评论</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-user">
      <div class="users" @click="toZore(article.userId,article.userName)">
        <div class="about-user">关于作者</div>
        <div class="user-detail">
          <img :src="article.picture" />
          <div class="info">
            <div class="name">{{article.nickName}}</div>
            <div class="dataTime">{{article.city|| '暂无'}}</div>
          </div>
        </div>
        <div class="icon">
          <el-button circle size="small">
            <i class="iconfont icon-ziyuan" :style="{'font-size':'10px'}"></i>
          </el-button>
          <span>获得点赞 {{article.AllapproveCount}}</span>
        </div>
        <div class="icon">
          <el-button icon="el-icon-view" circle size="small"></el-button>
          <span>获得阅读 {{article.allCount}}</span>
        </div>
      </div>
      <div class="like-arti">
        <div class="about-arti">相关文章</div>
        <div class="arti" @click="goDetail(item.id,item.userId)" v-for="(item,index) in allArticle" :key="index">
          {{item.artiName}}
          <div class="icons">
            <el-button circle size="mini">
              <i class="iconfont icon-ziyuan" :style="{'font-size':'10px'}"></i>
            </el-button>
            {{item.approveCount}}
            <el-button icon="el-icon-chat-line-round" circle size="mini"></el-button>
            {{item.commentCount}}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import marked from "marked"
import hljs from "highlight.js"
import {
  useRouter,
  useRoute
} from "vue-router"
import "highlight.js/styles/monokai-sublime.css"
import {
  JieLiu
} from "../util/jieliu"
import dateDiff from "../util/processDate"
import {
  getArticleById,
  addArticleSawCount,
  updateApproveInfo,
  updatecollectionInfo,
  getAllCommet,
  addCommit,
  getAllArticle,
  postUpdateLove,
} from "../network/index"
import {
  reactive,
  toRefs,
  computed,
  onMounted,
  ref,
  Ref
} from "vue"
import ChangeDateFormat from "../util/formateDate"
import processMessage from "../mixins/controllMessage"
export default {
  setup() {
    const renderer = new marked.Renderer()
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
    let commitInput = ref()
    let commit: Ref < HTMLAnchorElement > = ref()
    const {
      messageState,
      changeVisible
    } = processMessage
    const state = reactive({
      loveKey: false,
      approveKey: false,
      collectionkey: false,
      commitKey: false,
      commetValue: "",
      allArticle: [],
      article: {
        content: "",
        type: "",
      },
      idMapPrent: {},
      commitData: [],
      userInfo: JSON.parse(localStorage.blogUserInfo),
      route: useRoute(),
      router: useRouter(),
      reply: -1,
    })
    let compiledMarkdown = computed(function () {
      return marked(state.article.content, {
        sanitize: true
      })
    })
    onMounted(() => {
      methods.getArticleInfo()
      methods.getCommet()
    })
    const methods = {
      isLove() {
        state.loveKey = !state.loveKey
      },
      filiterPleacher(pleacher: string) {
        return `回复 ${pleacher} :`
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
      },
      goDetail(key: string, userId: string) {
        state.router.push({
          path: "/detail",
          query: {
            id: key,
            userId
          }
        })
        setTimeout(() => {
          methods.getArticleInfo()
          methods.getCommet()
        })
      },
      processDate(date: string) {
        return dateDiff(Date.parse(date))
      },
      formateDate(data: number) {
        return ChangeDateFormat(data)
      },
      getArticleInfo() {
        getArticleById(
          (res) => {
            console.log(res);

            if (res.error === 0) {
              window.scrollTo(0, 0)
              state.article = res.data
              state.approveKey = res.data?.isApprove
              state.loveKey = res.data?.isLove
              state.collectionkey = res.data?.isCollection
              getAllArticle(
                (res) => {
                  if (res.error === 0) {
                    state.allArticle = res.data?.result
                      .sort(() => Math.random() - 0.5)
                      .slice(0, 5)
                  }
                }, {
                  isNew: 0,
                  limit: 20,
                  offset: 0,
                  type: state.article.type,
                }
              )
            }
          }, {
            articleId: state.route.query.id,
            targetId: state.route.query.userId,
          }
        )
      },
      isApprove: JieLiu(() => {
        if (JSON.parse(localStorage.blogUserInfo).error === 10005) {
          // state.router.push("/login")
          changeVisible("请先登陆", 1000)
          state.router.push("/login")
          return
        }
        updateApproveInfo(
          (res) => {
            if (res.error === 0) {
              state.approveKey = !state.approveKey
            }
          }, {
            articleId: state.route.query.id,
            isAdd: !state.approveKey,
          }
        )
      }, 500),
      isCollection: JieLiu(() => {
        if (JSON.parse(localStorage.blogUserInfo).error === 10005) {
          state.router.push("/login")
          changeVisible("请先登陆", 1000)
          return
        }
        updatecollectionInfo(
          (res) => {
            if (res.error === 0) {
              state.collectionkey = !state.collectionkey
            }
          }, {
            articleId: state.route.query.id,
            isAdd: !state.collectionkey,
          }
        )
      }, 500),
      updateLove: JieLiu(() => {
        if (JSON.parse(localStorage.blogUserInfo).error === 10005) {
          state.router.push("/login")
          changeVisible("请先登陆", 1000)
          return
        }
        postUpdateLove(
          (res) => {
            if (res.error === 0) {
              state.loveKey = !state.loveKey
            }
          }, {
            articleId: state.route.query.id,
            targetId: state.route.query.userId,
            isAdd: !state.loveKey,
          }
        )
      }, 500),
      isCommit: JieLiu(() => {
        if (JSON.parse(localStorage.blogUserInfo).error === 10005) {
          changeVisible("请先登陆", 1000)
          state.router.push("/login")
          return
        }
        window.scrollTo(0, commit.value.offsetTop)
      }, 500),
      getCommet() {
        getAllCommet(
          (res) => {
            console.log(res);

            if (res.error === 0) {
              let commits = res.data
              let commitObj = {}
              let idMapPrent = {}

              function findRootId(id) {
                let parentId = idMapPrent[String(id)].parentId

                if (Object.keys(commitObj).indexOf(String(parentId)) !== -1) {
                  return parentId
                } else {
                  return findRootId(parentId)
                }
              }
              commits.forEach((commit) => {
                idMapPrent[commit.id] = commit
                if (commit.parentId === 0) {
                  commitObj[commit.id] = commit
                }
              })
              state.idMapPrent = idMapPrent
              commits.forEach((commit) => {
                if (commit.parentId !== 0) {
                  if (
                    Object.keys(commitObj).indexOf(String(commit.parentId)) !==
                    -1
                  ) {
                    if (!commitObj[commit.parentId].children)
                      commitObj[commit.parentId].children = []
                    commitObj[commit.parentId].children.push(commit)
                  } else {
                    if (!commitObj[String(findRootId(commit.id))].children)
                      commitObj[String(findRootId(commit.id))].children = []
                    commitObj[String(findRootId(commit.id))].children.push(
                      commit
                    )
                  }
                }
              })
              state.commitData = Object.values(commitObj).reverse()
            }
          }, {
            articleId: state.route.query.id
          }
        )
      },
      pushCommit: JieLiu((parentId, content, rootId) => {
        if (content) {
          addCommit(
            (res) => {
              if (res.error === 0) {
                commitInput.value.setNativeInputValue("")

                state.commetValue = ""
                state.reply = -1
                methods.getCommet()
              }
            }, {
              articleId: state.route.query.id,
              parentId,
              content,
            }
          )
        } else {
          changeVisible("内容不能为空", 1000)
        }
      }, 300),
      showReplyInput: JieLiu((id: number) => {
        if (JSON.parse(localStorage.blogUserInfo).error === 10005) {
          changeVisible("请先登陆", 1000)
          state.router.push("/login")
          return
        }
        state.commetValue = ""
        state.reply = id
      }, 300),
      hiddenInput() {
        state.reply = -1
      },
    }
    return {
      marked,
      ...toRefs(messageState),
      compiledMarkdown,
      ...methods,
      ...toRefs(state),
      commitInput,
      commit,
    }
  },
}
</script>

<style lang="less" scoped>
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

/deep/ p {
  line-height: 40px;
}

.users {
  padding-bottom: 20px;
  border-bottom: 1px solid hsla(0, 0%, 58.8%, 0.1);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.icons {
  margin-top: 10px;
  font-size: 12px;
  color: #909090;

  .el-button {
    border: 0px solid #000;
  }
}

.arti {
  padding: 10px;
  line-height: 24px;
  cursor: pointer;
  color: #333;

  &:hover {
    opacity: 0.6;
  }
}

.container-main {
  display: flex;
  flex: 1;
  margin-left: 30px;

  .input-commit {
    display: flex;
    padding: 15px 10px;
    background-color: #fafbfc;

    img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      margin-right: 20px;
    }

    .btn {
      border-left: 0px solid #000;
      height: 40px;
      border-radius: 0;
    }

    /deep/ .el-input__inner {
      border-radius: 0px;
    }
  }

  .commit,
  .child-commit {
    display: flex;
    margin-left: 60px;
    margin-top: 20px;
    padding: 15px;
    border-bottom: 1px solid hsla(0, 0%, 58.8%, 0.1);
    padding-bottom: 20px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    img {
      width: 30px;
      height: 30px;
      border-radius: 15px;
    }

    .content,
    .child-content {
      flex: 1;
      margin-left: 10px;
      background-color: rgba(250, 251, 252, 0.3);

      .name,
      .child-name {
        font-size: 14px;
        vertical-align: top;
        color: #333;
        margin-bottom: 10px;
      }

      .bottom,
      .child-bottom {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #8a9aa9;

        .icon:hover,
        .child-icon:hover {
          color: red;
        }
      }

      .reply {
        /deep/.el-button {
          color: #fff;
          background-color: #027fff;
          border-radius: 2px;
          margin-top: 40px;
          margin-right: 20px;
        }

        text-align: right;
        margin-top: 20px;
        color: #17181a;
        background-color: #fff;
        border: 1px solid #f1f1f2;
        padding: 20px;
        box-sizing: border-box;
      }
    }
  }

  .child-commit {
    margin-left: 0px;
    border-bottom: 0px solid #000;
    border-top: 1px solid hsla(0, 0%, 58.8%, 0.1);
  }
}

.main {
  display: flex;
  width: 1200px;
  margin: 0 auto;
}

.right-user {
  width: 260px;
  margin-top: 20px;
  border-radius: 2px;

  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  .users {
    cursor: pointer;
    background-color: #fff;

    .about-user {
      padding: 10px 13px;
      font-size: 16px;
      color: #333;
      border-bottom: 1px solid hsla(0, 0%, 58.8%, 0.1);
    }
  }

  .like-arti {
    margin-top: 40px;
    background-color: #fff;

    .about-arti {
      padding: 10px 13px;
      font-size: 16px;
      color: #333;
      border-bottom: 1px solid hsla(0, 0%, 58.8%, 0.1);
    }
  }

  .user-detail {
    display: flex;
    margin-top: 20px;
    margin-left: 20px;

    img {
      width: 60px;
      height: 60px;
      border-radius: 30px;
    }

    .info {
      margin-left: 15px;

      .name {
        font-weight: 700;
        line-height: 40px;
      }

      .dataTime {
        font-size: 16px;
        line-height: 30px;
        color: #909090;
      }
    }
  }

  .icon {
    margin-top: 20px;
    margin-left: 20px;

    .el-button {
      margin-right: 20px;
    }
  }
}

.container {
  flex: 1;
  margin-top: 20px;
  background-color: #fff;
  padding: 0 30px;
  margin-right: 30px;
  cursor: pointer;
}

.user {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  height: 60px;

  .user-detail {
    display: flex;
    margin-top: 20px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
    }

    .info {
      margin-left: 30px;

      .name {
        font-weight: 700;
        line-height: 20px;
      }

      .dataTime {
        font-size: 12px;
        line-height: 30px;
        color: #909090;
      }
    }
  }

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
}

.title {
  height: 80px;
  line-height: 60px;
  font-size: 28px;
  font-weight: 700;
}

/deep/code {
  color: #3e3e3e;
  line-height: 30px;
}

.left {
  margin-top: 100px;

  .icon {
    margin-top: 15px;

    /deep/.iconActivated {
      color: #6cbd45;
    }
  }
}

.left1 {
  margin-top: 10px;
  padding-bottom: 30px;

  /deep/pre {
    background: #f8f8f8;
    display: block;
    border-radius: 10px;
    padding: 15px;
  }
}
</style>
