<template>
  <div class="main">
    <van-nav-bar @click-left="onClickLeft" @click-right="onClickRight">
      <template #left>
        <i class="iconfont icon-left-arrow"></i>
      </template>
      <template #title>
        <div class="text">
          <div class="van-ellipsis song">
            {{
              (singSheet && singSheet[index]?.name) ||
              singSheet[index]?.songs[0].name
            }}
          </div>
          <div
            class="singer"
            v-if="singSheet && singSheet[index]?.songs?.['0']?.ar"
          >
            {{ singSheet[index]?.songs[0].ar[0].name }}
          </div>

          <div class="singer" v-if="singSheet && singSheet[index]?.radio">
            {{ singSheet[index]?.radio.name }}
          </div>
          <div class="singer" v-if="singSheet && singSheet[index]?.artists">
            {{ singSheet[index]?.artists[0].name }}
          </div>
        </div>
      </template>
      <template #right>
        <div class="slot" @click="iscollect">
          <i v-if="!collect" class="iconfont icon-shoucang"></i>
          <i v-if="collect" class="iconfont icon-favor-active"></i>
        </div>
      </template>
    </van-nav-bar>
    <van-swipe :show-indicators="false">
      <van-swipe-item>
        <div class="swipe-music">
          <div class="big-circle">
            <div
              class="small-circle"
              :style="{ animationPlayState: isPlay ? 'running' : 'paused' }"
            >
              <img v-if="songItem?.al" :src="songItem?.al.picUrl" />
              <img
                v-if="singSheet && singSheet[index]?.radio"
                :src="singSheet[index].radio.picUrl"
              />
            </div>
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="swipe-lrc">
          <BScroll
            :listenScroll="true"
            ref="scroll_lrc"
            height="70vh"
            :data="songLrc"
          >
            <div class="item_lrc" v-for="(item, index) in 6" :key="index"></div>
            <div
              v-show="songLrc.arrText"
              class="item_lrc"
              v-for="(item, index) in songLrc.arrText"
              :key="index"
            >
              <span class="bglrc" ref="lrc">{{ item || '~' }}</span>
              <div class="activeBox">
                <div
                  class="in"
                  ref="inner"
                  :class="currentlrc === index ? 'active_lrc' : ''"
                  :style="{ animationPlayState: isPlay ? 'running' : 'paused' }"
                >
                  {{ item || '~' }}
                </div>
              </div>
            </div>

            <div class="item_lrc" v-show="!songLrc.arrText.length">
              <div class="bglrc">暂无歌词</div>
            </div>
            <div class="item_lrc" v-for="(item, index) in 5" :key="index"></div>
          </BScroll>
        </div>
      </van-swipe-item>
    </van-swipe>

    <div class="control">
      <div class="progress">
        <div class="left">{{ currentTime }}</div>
        <div class="middle">
          <van-slider
            bar-height="4px"
            active-color="#ee0a24"
            v-model="value"
            @change="moving"
            @drag-start="movestart"
            @drag-end="moveend"
            button-size="12"
          >
          </van-slider>
        </div>
        <div class="right">{{ duration }}</div>
      </div>
      <div class="wrapper1">
        <div class="item" @click="rules">
          <i v-show="playRules === 0" class="iconfont icon-shunxu small"></i>
          <i v-show="playRules === 1" class="iconfont icon-suijibofang-"></i>
          <i v-show="playRules === 2" class="iconfont icon-danquxunhuan"></i>
        </div>
        <div class="item" @click="front">
          <i class="iconfont icon-shangyishou"></i>
        </div>
        <div class="item" @click="playing">
          <i v-show="!isPlay" class="iconfont icon-bofang big-font big"></i>
          <i v-show="isPlay" class="iconfont icon-zanting big-font big"></i>
        </div>
        <div class="item" @click="nextOne">
          <i class="iconfont icon-xiayidan"></i>
        </div>
        <div class="item" @click="isShowBox">
          <i class="iconfont icon-gengduo small"></i>
        </div>
      </div>
    </div>
    <div class="background">
      <img v-if="songItem?.al" :src="songItem?.al.picUrl" />
      <img
        v-if="singSheet[index]?.radio"
        :src="singSheet[index].radio.picUrl"
      />
      <div class="mask"></div>
    </div>
    <div @click="hidden">
      <messageBoxMusic
        v-if="isShow"
        @changeMusic="changeMusic"
      ></messageBoxMusic>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'
import BScroll from '../../components/scroll/index.vue'
import musicPlay from '../../common/musicPlay'
import Store from '../../store/index'
import Vue, { onMounted, reactive, ref, toRef, toRefs, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import messageBoxMusic from '../../components/message-box-music/messafeBoxMusic.vue'
import { Notify } from 'vant'
export default {
  setup() {
    const data = reactive({
      currentlrc: 0,
      activelrc: '',
      isShow: true,
      touching: false,
      route: useRoute(),
      router: useRouter(),
      collect: false,
      ...musicPlay.musicStore,
    })
    data.isShow = false
    const refs = {
      ...musicPlay.refs,
      scroll_lrc: ref<any>(),
      width: ref(data.lrcWidth[data.currentlrc]),
      timer: ref(Store.musicStore.songLrc.arrDataTime[data.currentlrc] + 's'),
    }

    onMounted(() => {
      if (!Object.keys(Store.musicStore.singSheet).length) {
        Notify({ type: 'danger', message: '刷新页面,前往首页' })
        data.router.push('/')
      }
    })

    const methods = {
      ...musicPlay.methods,
      moving(value: string) {
        methods.changeValue(Store.musicStore.value)
        methods.changeSeek(true)
      },
      onClickLeft() {
        data.router.go(-1)
      },
      onClickRight() {},
      movestart() {
        data.touching = true
      },
      moveend() {
        data.touching = false
        methods.changeIsPlay(true)
      },
      changeMusic(index: number) {
        methods.changeIndex(index)
        data.isShow = false
        methods.playMusic()
        methods.changeIsPlay(true)
      },
      isShowBox() {
        data.isShow = true
      },
      hidden() {
        data.isShow = false
      },

      front() {
        if (Store.musicStore.playRules === 0) {
          methods.changeIndex(Math.max(0, Store.musicStore.index - 1))
          methods.playMusic()
          methods.changeIsPlay(true)
        }
        methods.randomOrUtil()
      },
      rules() {
        if (Store.musicStore.playRules < 2) {
          methods.changePlayRules(Store.musicStore.playRules + 1)
        } else {
          methods.changePlayRules(0)
        }
      },
    }
    onMounted(() => {
      if (!data.route.query.isplay) {
        methods.playMusic()
      }
    })
    watch([toRef(Store.musicStore, 'value')], () => {
      if (!data.touching) {
        methods.changeValue(Store.musicStore.value)
      }
    })
    watch([toRef(Store.musicStore, 'currentTime')], () => {
      let timer =
        Number(Store.musicStore.currentTime.slice(0, 2)) * 60 +
        Number(Store.musicStore.currentTime.slice(3, 5)) * 1
      if (timer === 0) {
        refs.scroll_lrc.value.scrollTo()
      }
      let indexs = Array.from(Store.musicStore.songLrc.arrDataTime).indexOf(
        timer
      )

      if (indexs !== -1) {
        while (true) {
          //查找最后一个
          let index2 = Array.from(Store.musicStore.songLrc.arrDataTime).indexOf(
            timer,
            indexs + 1
          )
          if (index2 === -1) {
            break
          } else {
            indexs = index2
          }
        }
        data.currentlrc = indexs

        refs.scroll_lrc.value.scrollTo(0, indexs * -40)

        if (
          data.currentlrc === Store.musicStore.songLrc.arrDataTime.length ||
          timer === 0
        ) {
          data.currentlrc = 0
        }
      }
    })

    watch([toRefs(data).currentlrc], ([index]) => {
      refs.width.value = musicPlay.musicStore.lrcWidth[index]
      Store.musicStore.songLrc.arrDataTime[index + 1] &&
        (refs.timer.value =
          Store.musicStore.songLrc.arrDataTime[index + 1] -
          Store.musicStore.songLrc.arrDataTime[index] +
          's')
    })
    return {
      ...toRefs(data),
      ...methods,
      ...refs,
      ...toRefs(Store.musicStore),
    }
  },

  components: {
    BScroll,
    messageBoxMusic,
  },
}
</script>

<style lang="less" scoped >
@keyframes activate {
  0% {
    width: 0;
  }

  100% {
    width: v-bind(width);
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
.lrcWrapper {
  width: 100vw;
}
.iconfont {
  color: aliceblue;
}

/deep/.van-nav-bar {
  background: transparent;
}
/deep/.van-hairline--bottom::after {
  border-bottom: 1px solid transparent;
}
.slot {
  .iconfont {
    color: red;
  }
}
.song {
  font-size: 14px;
  color: bisque;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70vw;
}
.singer {
  font-size: 10px;
  color: darksalmon;
}
.activeBox {
  margin: 0 auto;
}
.active_lrc {
  position: relative;
  bottom: 4rem;
  color: aquamarine;
  width: 0px;
  overflow: hidden;
  animation: activate 3s linear;
}

.item_lrc {
  color: aliceblue;
  font-size: 14px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  .bglrc {
    width: auto;
  }
}

.activelrc {
  color: aquamarine;
  text-align: center;
  font-size: 1.4rem;
  height: 4rem;
  line-height: 4rem;
  overflow: hidden;
}

.swipe-music {
  //   position: relative;
  height: 80vh;
}

.swipe-lrc {
  height: 80vh;
}

.wrapper1 {
  display: flex;
  height: 3rem;

  .item {
    flex: 1;
    line-height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .iconfont {
      font-size: 2.5rem;
      color: #ffffff;
    }

    .small {
      font-size: 1.5rem;
    }

    .big {
      font-size: 3rem;
    }
  }
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;

  img {
    width: 100vw;
    height: 100%;
    filter: blur(30px);
  }
}

.mask {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  background-color: #000;
  opacity: 0.4;
}

.custom-button {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: #ffffff;
}

.control {
  padding: 0 1rem;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  right: 0;
  height: 15vh;
  bottom: 2vh;

  .progress {
    display: flex;
    height: 2rem;
    margin-bottom: 3rem;

    .left,
    .right {
      font-size: 1rem;
      flex: 1;
      color: #ffffff;
      line-height: 2rem;
    }

    .middle {
      flex: 10;
      margin: 0 1rem;
      position: relative;
      top: 0.7rem;
    }
  }
}

.big-circle {
  position: absolute;
  top: 20%;
  left: 15%;
  width: 70vw;
  height: 70vw;
  background-color: #1e1e20;
  border: 0.4rem solid #34394c;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  .small-circle {
    border-radius: 50%;
    width: 50vw;
    height: 50vw;
    overflow: hidden;
    animation: rotate 27s linear infinite;
    animation-play-state: running;

    img {
      width: 50vw;
      height: 50vw;
    }
  }
}

.main {
  padding: 0.5rem 1rem;
  height: 100vh;
  position: relative;
  box-sizing: border-box;
}
</style>
