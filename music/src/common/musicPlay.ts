import { Songs } from '@/network/Search'
import { getSongDetail, getSongLrc, getSongUrl } from '../network/index'
import { Notify } from 'vant'
import split_lrc from './split_lrc'
import { reactive, ref } from 'vue'
import Store from '../store/index'
import { Privileges, SongDetail } from '@/network/SongDetail'

const musicStore = reactive({
  songs: [],
  currentIndex: 0,
  lrcWidth: [] as string[]
})

const refs = {
  inner: ref<HTMLElement[]>(),
  lrc: ref<HTMLElement[]>(),
  active_lrc: ref<HTMLElement[]>()
}
const methods = {
  ...Store.methods,
  lrcWidth () {
    musicStore.lrcWidth = []

    setTimeout(() => {
      let bglrc = document.querySelectorAll('.bglrc')
      let activeBox = document.querySelectorAll('.activeBox')
      bglrc &&
        bglrc.forEach(item => {
          musicStore.lrcWidth.push((item as any).offsetWidth + 'px')
        })

      activeBox &&
        activeBox.forEach((item, key) => {
          ;(item as any).style.width = musicStore.lrcWidth[key]
        })
      //   refs.active_lrc.value &&
      //     refs.active_lrc.value.forEach((item, key) => {

      //     })
    })
  },
  nextOne () {
    if (Store.musicStore.playRules === 0) {
      if (Store.musicStore.index + 1 === Store.musicStore.singSheet.length) {
        methods.changeIndex(0)
      } else {
        methods.changeIndex(Store.musicStore.index + 1)
      }
      methods.playMusic()
      methods.changeIsPlay(true)
    }
    methods.randomOrUtil()
  },

  playing () {
    methods.changeIsPlay(!Store.musicStore.isPlay)
  },
  randomOrUtil () {
    if (Store.musicStore.playRules === 1) {
      methods.changeIndex(
        Math.floor(Math.random() * Store.musicStore.singSheet.length)
      )
      methods.playMusic()
      methods.changeIsPlay(true)
    }
    if (Store.musicStore.playRules === 2) {
      // musicStore.currentIndex = musicStore.index;
      musicStore.currentIndex = Store.musicStore.index
      musicStore.currentIndex++
      methods.playMusic()
      methods.changeIsPlay(true)
    }
  },
  music () {
    if (localStorage.songitem) {
      let arr = JSON.parse(localStorage.songitem) as Privileges[]
      arr.forEach((item, index) => {
        if (item.id === Store.musicStore.songItem.id) {
          arr.splice(index, 1)
          arr = [Store.musicStore.songItem, ...arr]
        } else {
          if (index === arr.length - 1) {
            arr = [Store.musicStore.songItem, ...arr]
          }
        }
      })
      localStorage.songitem = JSON.stringify(arr)
    } else {
      localStorage.songitem = JSON.stringify([Store.musicStore.songItem])
    }
  },
  playMusic () {
    if (!Store.musicStore.singSheet[0]) return
    let id = (Store.musicStore.singSheet[Store.musicStore.index] as SongDetail)
      .songs
      ? (Store.musicStore.singSheet[Store.musicStore.index] as SongDetail)
          .songs[0].id
      : (Store.musicStore.singSheet[Store.musicStore.index] as Songs).id
    getSongDetail(id, res => {
      if (res.songs[0]) {
        //歌曲
        musicStore.songs = res.songs[0]
        methods.changeSongItem(res.songs[0])
        getSongUrl(id, res => {
          if (!res.data[0].url) {
            Notify({
              type: 'danger',
              message: '付费音乐，播放下一首',
              duration: 1000
            })
            setTimeout(methods.nextOne, 1500)
          } else {
            methods.music()
            methods.changeIsPlay(true)
            methods.changeSongUrl(res.data[0].url)

            getSongLrc(id, res => {
              if (res.lrc) {
                methods.changeSongLrc(split_lrc(res.lrc.lyric))
              } else {
                methods.changeSongLrc(split_lrc(''))
              }

              methods.lrcWidth()
            })
          }
        })
      } else {
        // 电台
        // getSongUrl(musicStore.singSheet[musicStore.index].mainSong.id, res => {
        //   musicStore.songs = musicStore.singsheet[musicStore.index]
        //   musicStore.Songitem(musicStore.singsheet[musicStore.index])
        //   // console.log(res.data[0].url);
        //   if (!res.data[0].url) {
        //     musicStore.$notify({
        //       type: 'danger',
        //       message: '付费电台，播放下一首',
        //       duration: 1000
        //     })
        //     setTimeout(musicStore.nextone, 1500)
        //   } else {
        //     musicStore.music()
        //     musicStore.Playing()
        //     musicStore.songurl(res.data[0].url)
        //     song_lrc(
        //       musicStore.singsheet[musicStore.index].mainSong.id,
        //       res => {
        //         if (res.lrc) {
        //           musicStore.SongLrc(split_lrc(res.lrc.lyric))
        //         } else {
        //           musicStore.SongLrc(split_lrc(''))
        //         }
        //       }
        //     )
        //   }
        // })
      }
    })
  }
}

export default {
  refs,
  methods,
  musicStore
}
