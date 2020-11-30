import { Playlist } from '@/network/PlayListDetail'
import { Songs } from '@/network/Search'
import { Privileges, SongDetail } from '@/network/SongDetail'
import { reactive } from 'vue'

const musicStore = reactive({
  singSheet: [] as Songs[] | SongDetail[],
  playRules: 0,
  isPlay: false,
  songUrl: '',
  index: 0,
  currentTime: '00:00',
  duration: '00:00',
  value: 0,
  ended: false,
  seek: false, //进度条点击
  songItem: {} as Privileges,
  songLrc: {
    arrText: [] as string[],
    arrDataTime: [] as number[]
  },
  playlist: {} as Playlist | Privileges, //虚化背景图
  id: 0,
  pageIndex: 1
})

const methods = {
  changeSingSheet (singSheet: Songs[] | SongDetail[]) {
    musicStore.singSheet = singSheet
  },
  changeIndex (index: number) {
    musicStore.index = index
  },
  changePlayRules (rules: number) {
    musicStore.playRules = rules
  },

  changeIsPlay (isPLay: boolean) {
    musicStore.isPlay = isPLay
  },
  changeSongUrl (songUrl: string) {
    musicStore.songUrl = songUrl
  },

  changeCurrentTime (currentTime: string) {
    musicStore.currentTime = currentTime
  },
  changePageIndex (pageIndex: number) {
    musicStore.pageIndex = pageIndex
  },
  changeDuration (duration: string) {
    musicStore.duration = duration
  },
  changeValue (value: number) {
    musicStore.value = value
  },
  changeEnded (ended: boolean) {
    musicStore.ended = ended
  },
  changeSeek (seek: boolean) {
    musicStore.seek = seek
  },
  changeSongItem (songItem: Privileges) {
    musicStore.songItem = songItem
  },
  changeSongLrc (songLrc: { arrText: string[]; arrDataTime: number[] }) {
    musicStore.songLrc = songLrc
  },
  changePlaylist (playlist: Playlist | Privileges) {
    musicStore.playlist = playlist
  },
  changeId (id: number) {
    musicStore.id = id
  }
}

export default {
  methods,
  musicStore
}
