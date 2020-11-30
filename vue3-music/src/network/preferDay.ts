/*ChargeInfoList*/
export interface ChargeInfoList {
  rate: number
  chargeUrl: object
  chargeMessage: object
  chargeType: number
}

/*FreeTrialPrivilege*/
export interface FreeTrialPrivilege {
  resConsumable: boolean
  userConsumable: boolean
}

/*Privilege*/
export interface Privilege {
  id: number
  fee: number
  payed: number
  st: number
  pl: number
  dl: number
  sp: number
  cp: number
  subp: number
  cs: boolean
  maxbr: number
  fl: number
  toast: boolean
  flag: number
  preSell: boolean
  playMaxbr: number
  downloadMaxbr: number
  freeTrialPrivilege: FreeTrialPrivilege
  chargeInfoList: ChargeInfoList[]
}

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
  company: string
  briefDesc: string
  artist: Artist
  songs: any[]
  alias: any[]
  status: number
  copyrightId: number
  commentThreadId: string
  artists: Artists[]
  subType: object
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

/*DailySongs*/
export interface DailySongs {
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
  ringtone: object
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
  reason: string
  privilege: Privilege
  alg: string
}

/*Data*/
export interface Data {
  dailySongs: DailySongs[]
  orderSongs: any[]
}

/*ChargeInfoList*/
export interface ChargeInfoList {
  rate: number
  chargeUrl: object
  chargeMessage: object
  chargeType: number
}

/*FreeTrialPrivilege*/
export interface FreeTrialPrivilege {
  resConsumable: boolean
  userConsumable: boolean
}

/*Privilege*/
export interface Privilege {
  id: number
  fee: number
  payed: number
  st: number
  pl: number
  dl: number
  sp: number
  cp: number
  subp: number
  cs: boolean
  maxbr: number
  fl: number
  toast: boolean
  flag: number
  preSell: boolean
  playMaxbr: number
  downloadMaxbr: number
  freeTrialPrivilege: FreeTrialPrivilege
  chargeInfoList: ChargeInfoList[]
}

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
  company: string
  briefDesc: string
  artist: Artist
  songs: any[]
  alias: any[]
  status: number
  copyrightId: number
  commentThreadId: string
  artists: Artists[]
  subType: object
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

/*Recommend*/
export interface Recommend {
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
  ringtone: object
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
  reason: string
  privilege: Privilege
  alg: string
}

/*PreferDay*/
export interface PreferDay {
  code: number
  recommend: Recommend[]
  data: Data
}
