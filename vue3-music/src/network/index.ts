import { SimiMv } from './SimiMv'
import { MvDetail } from './MvDetail'
import axios from 'axios'
import { Banner } from './Banner'
import { Personalized } from './Personalized'
import { HotSearch } from './HotSearch'
import { Search } from './Search'
import { Lyric } from './Lyric'
import { SongDetail } from './SongDetail'
import { SongUrl } from './SongUrl'
import { Prefer } from './Prefer'
import { DjRecommend } from './djRecommend'
import { MV } from './MV'
import { PlayListDetail } from './PlayListDetail'
import { TopPlayListDetail } from './TopPlayListDetail'
import { TopPlayList } from './TopPlayList'
import { TopList } from './TopList'
import { Notify, Toast } from 'vant'
import { LoginSuc } from './loginSuc'
import { Exist } from './Exist'
import { MvUrl } from './MvUrl'
import { PreferDay } from './preferDay'
import { DJDetail } from './DJDetail'
import { DJProgram } from './DJProgram'
import { LikeList } from './LikeList'
import { StatusLogin } from './StatusLogin'
import { UserPlayList } from './UserPlayList'
axios.defaults.timeout = 5000 // 默认5s超时
// axios.defaults.baseURL = 'http://localhost:3000';
let urls = 'http://localhost:3000'

axios.defaults.withCredentials = true // 请求带上cookie
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

axios.interceptors.response.use(
  res => {
    if (res.data.code === 301) {
      console.log('未登录')
    } else if (res.data.code !== 200) {
      console.log('返回数据不正常')
    }
    return res
  },
  error => {
    console.log('promise error:' + error)
    return Promise.reject(error)
  }
)

export function fetchGet<T extends object, V> (url: string, param?: T) {
  return new Promise<any>((resolve, reject) => {
    axios
      .get(urls + url, {
        params: param
      })
      .then(
        response => {
          resolve(response.data as V)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        // console.log(this);

        reject(error)
      })
  })
}

/*接口地址 */
// 轮播图
export function getBanner (fn: (value: Banner) => unknown) {
  return fetchGet('/banner').then(fn)
}
//推荐歌单
export function getPersonalized (fn: (value: Personalized) => unknown) {
  return fetchGet('/personalized').then(fn)
}
// 用户歌单
export function userPlaylist (fn:(res: UserPlayList) => unknown) {
  return fetchGet('/user/playlist', {
    uid: localStorage.id
  }).then(fn)
}
// //电台推荐
export function getDjRecommend (fn: (res: DjRecommend) => unknown) {
  return fetchGet('/dj/recommend').then(fn)
}
// //电台今日优选
export function getTodayPrefer (fn: (res: Prefer) => unknown) {
  return fetchGet('/dj/today/perfered').then(fn)
}
//视频
export function getMvAll (offset: number, fn: (res: MV) => unknown) {
  return fetchGet('/mv/all', { limit: 300, offset: offset }).then(fn)
}
//热门搜索
export function getHotSearch (fn: (res: HotSearch) => unknown) {
  return fetchGet('/search/hot/detail').then(fn)
}
//搜索
export function getSearch (
  keywords: string,
  limit: number,
  fn: (res: Search) => unknown,
  offset?: number
) {
  return fetchGet('/search', {
    keywords,
    limit,
    offset
  }).then(fn)
}
//歌曲详情
export function getSongDetail (ids: number, fn: (res: SongDetail) => unknown) {
  return fetchGet('/song/detail', {
    ids: ids
  }).then(fn)
}
//歌曲地址
export function getSongUrl (id: number, fn: (res: SongUrl) => unknown) {
  return fetchGet('/song/url', {
    id: id
  }).then(fn)
}
//歌曲歌词
export function getSongLrc (id: number, fn: (res: Lyric) => unknown) {
  return fetchGet('/lyric', {
    id: id
  }).then(fn)
}
//喜欢歌单
export function getLikeList (fn: (res: LikeList) => unknown) {
  return fetchGet('/likelist', { uid: parseFloat(localStorage.id) }).then(fn)
}
//电台详情
export function djDetail (rid: number, fn: (res: DJDetail) => unknown) {
  return fetchGet('/dj/detail', { rid: rid }).then(fn)
}
//电台详情列表
export function djProgram (
  rid: number,
  offset: number,
  fn: (res: DJProgram) => unknown
) {
  return fetchGet('/dj/program', {
    rid: rid,
    limit: 40,
    offset: offset
  }).then(fn)
}
//手机号登录
export function login_cellphone (
  phone: string,
  password: string,
  fn: (res: LoginSuc) => unknown
) {
  return fetchGet('/login/cellphone', {
    phone: phone,
    password: password
  })
    .then(fn)
    .catch(res => {
      Toast({ message: '密码错误', position: 'bottom' })
    })
}
// //喜欢音乐
// export function like_music(id, like, fn) {
//   return fetchGet("/like", {
//     id: id,
//     like: like
//   })
//     .then(fn).catch(res => {
//       vue.$toast({ message: "您还未登录", position: "bottom" });
//     });
// }
//榜单列表
export function getTopList (idx: string, fn: (res: TopList) => unknown) {
  return fetchGet('/top/list', {
    idx: idx
  }).then(fn)
}
// 榜单列表详情
export function getTopListDetail (fn: (res: TopPlayListDetail) => unknown) {
  return fetchGet('/toplist/detail').then(fn)
}
//歌单详情
export function getPlaylistDetail (
  id: string,
  fn: (res: PlayListDetail) => unknown
) {
  return fetchGet('/playlist/detail', {
    id: id
    // timestamp: timestamp
  }).then(fn)
}
// //收藏歌单
// export function playlist_subscribe(id,t, fn) {
//   return fetchGet("/playlist/subscribe", {
//     id: id,
//     t:t
//   }).then(fn)
// }
// 推荐歌曲
export function getRecommendSongs (fn: (res: PreferDay) => unknown) {
  return fetchGet('/recommend/songs').then(fn)
}
//mv详情
export function mvDetail (mvid: number, fn: (res: MvDetail) => unknown) {
  return fetchGet('/mv/detail', {
    mvid: mvid
  }).then(fn)
}
//相似mv
export function mvSimi (mvid: number, fn: (res: SimiMv) => unknown) {
  return fetchGet('/simi/mv', {
    mvid: mvid
  }).then(fn)
}
export function mvAddress (id: number, fn: (res: MvUrl) => unknown) {
  return fetchGet('/mv/url', {
    id
  }).then(fn)
}
// //歌单类别
export function getTopPlaylist (
  cat: string,
  offset: number,
  fn: (res: TopPlayList) => unknown
) {
  return fetchGet('/top/playlist', {
    cat: cat,
    limit: 21,
    offset: offset
  }).then(fn)
}

export function sentCaptcha (
  phone: string,
  fn?: (res: { message: string }) => unknown
) {
  return fetchGet('/captcha/sent', {
    phone
  }).catch(fn)
}

export function verifyCaptcha (
  phone: string,
  captcha: string,
  fn?: (res: { code: number }) => unknown,
  catchFn?: () => unknown
) {
  return fetchGet('/captcha/verify', {
    phone,
    captcha
  })
    .then(fn)
    .catch(catchFn)
}

export function ExistUser (phone: string, fn: (res: Exist) => unknown) {
  return fetchGet('/cellphone/existence/check', {
    phone
  }).then(fn)
}

export function loginStatus (
  fn: (res: StatusLogin) => unknown,
  isCatch = false
) {
  return fetchGet('/login/status')
    .then(fn)
    .catch(() => {
      console.log(11)
      if (isCatch) {
        Notify({
          type: 'danger',
          message: '您暂时未登陆'
        })
      }
    })
}
