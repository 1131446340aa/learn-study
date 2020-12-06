/*LMusic*/
export interface LMusic {
  name: object
  id: number
  size: number
  extension: string
  sr: number
  dfsId: number
  bitrate: number
  playTime: number
  volumeDelta: number
}

/*MMusic*/
export interface MMusic {
  name: object
  id: number
  size: number
  extension: string
  sr: number
  dfsId: number
  bitrate: number
  playTime: number
  volumeDelta: number
}

/*HMusic*/
export interface HMusic {
  name: object
  id: number
  size: number
  extension: string
  sr: number
  dfsId: number
  bitrate: number
  playTime: number
  volumeDelta: number
}

/*BMusic*/
export interface BMusic {
  name: object
  id: number
  size: number
  extension: string
  sr: number
  dfsId: number
  bitrate: number
  playTime: number
  volumeDelta: number
}

/*Artists*/
export interface Artists {
  name: string
  id: number
  picId: number
  img1v1Id: number
  briefDesc: string
  picUrl: string
  img1v1Url: string
  albumSize: number
  alias: any[]
  trans: string
  musicSize: number
  topicPerson: number
}

/*Artist*/
export interface Artist {
  name: string
  id: number
  picId: number
  img1v1Id: number
  briefDesc: string
  picUrl: string
  img1v1Url: string
  albumSize: number
  alias: any[]
  trans: string
  musicSize: number
  topicPerson: number
}

/*Album*/
export interface Album {
  name: string
  id: number
  type: string
  size: number
  picId: number
  blurPicUrl: string
  companyId: number
  pic: number
  picUrl: string
  publishTime: number
  description: string
  tags: string
  company: object
  briefDesc: string
  artist: Artist
  songs: any[]
  alias: any[]
  status: number
  copyrightId: number
  commentThreadId: string
  artists: Artists[]
  subType: string
  transName: object
  mark: number
  picId_str: string
}

/*Artists*/
export interface Artists {
  name: string
  id: number
  picId: number
  img1v1Id: number
  briefDesc: string
  picUrl: string
  img1v1Url: string
  albumSize: number
  alias: any[]
  trans: string
  musicSize: number
  topicPerson: number
}

/*Songs*/
export interface Songs {
  name: string
  id: number
  position: number
  alias: any[]
  status: number
  fee: number
  copyrightId: number
  disc: string
  no: number
  artists: Artists[]
  album: Album
  starred: boolean
  popularity: number
  score: number
  starredNum: number
  duration: number
  playedNum: number
  dayPlays: number
  hearTime: number
  ringtone: string
  crbt: object
  audition: object
  copyFrom: string
  commentThreadId: string
  rtUrl: object
  ftype: number
  rtUrls: any[]
  copyright: number
  transName: object
  sign: object
  mark: number
  noCopyrightRcmd: object
  rtype: number
  rurl: object
  mvid: number
  bMusic: BMusic
  mp3Url: object
  hMusic: HMusic
  mMusic: MMusic
  lMusic: LMusic
}

/*RewardToplist*/
export interface RewardToplist {
  coverUrl: string
  songs: Songs[]
  name: string
  position: number
}

/*Artists*/
export interface Artists {
  first: string
  second: string
  third: number
}

/*ArtistToplist*/
export interface ArtistToplist {
  coverUrl: string
  artists: Artists[]
  name: string
  upateFrequency: string
  position: number
  updateFrequency: string
}

/*Tracks*/
export interface Tracks {
  first: string
  second: string
}

/*List*/
export interface List {
  subscribers: any[]
  subscribed: object
  creator: object
  artists: object
  tracks: Tracks[]
  updateFrequency: string
  backgroundCoverId: number
  backgroundCoverUrl: object
  titleImage: number
  titleImageUrl: object
  englishTitle: object
  opRecommend: boolean
  recommendInfo: object
  adType: number
  trackNumberUpdateTime: number
  subscribedCount: number
  userId: number
  cloudTrackCount: number
  createTime: number
  highQuality: boolean
  coverImgId: number
  newImported: boolean
  anonimous: boolean
  updateTime: number
  totalDuration: number
  trackCount: number
  coverImgUrl: string
  specialType: number
  commentThreadId: string
  privacy: number
  trackUpdateTime: number
  playCount: number
  ordered: boolean
  tags: any[]
  description: string
  status: number
  name: string
  id: number
  coverImgId_str: string
  ToplistType: string
}

/*TopPlayList*/
export interface TopPlayListDetail {
  code: number
  list: List[]
  artistToplist: ArtistToplist
  rewardToplist: RewardToplist
}
