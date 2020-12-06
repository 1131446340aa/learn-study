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

/*Privileges*/
export interface Privileges {
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

/*TrackIds*/
export interface TrackIds {
  id: number
  v: number
  at: number
  alg: object
}

/*L*/
export interface L {
  br: number
  fid: number
  size: number
  vd: number
}

/*M*/
export interface M {
  br: number
  fid: number
  size: number
  vd: number
}

/*H*/
export interface H {
  br: number
  fid: number
  size: number
  vd: number
}

/*Al*/
export interface Al {
  id: number
  name: string
  picUrl: string
  tns: any[]
  pic_str: string
  pic: number
}

/*Ar*/
export interface Ar {
  id: number
  name: string
  tns: any[]
  alias: any[]
}

/*Tracks*/
export interface Tracks {
  name: string
  id: number
  pst: number
  t: number
  ar: Ar[]
  alia: string[]
  pop: number
  st: number
  rt: object
  fee: number
  v: number
  crbt: object
  cf: string
  al: Al
  dt: number
  h: H
  m: M
  l: L
  a: object
  cd: string
  no: number
  rtUrl: object
  ftype: number
  rtUrls: any[]
  djId: number
  copyright: number
  s_id: number
  mark: number
  originCoverType: number
  noCopyrightRcmd: object
  rtype: number
  rurl: object
  mst: number
  cp: number
  mv: number
  publishTime: number
}

/*Creator*/
export interface Creator {
  defaultAvatar: boolean
  province: number
  authStatus: number
  followed: boolean
  avatarUrl: string
  accountStatus: number
  gender: number
  city: number
  birthday: number
  userId: number
  userType: number
  nickname: string
  signature: string
  description: string
  detailDescription: string
  avatarImgId: number
  backgroundImgId: number
  backgroundUrl: string
  authority: number
  mutual: boolean
  expertTags: object
  experts: object
  djStatus: number
  vipType: number
  remarkName: object
  authenticationTypes: number
  avatarDetail: object
  backgroundImgIdStr: string
  avatarImgIdStr: string
  anchor: boolean
  avatarImgId_str: string
}

/*Subscribers*/
export interface Subscribers {
  defaultAvatar: boolean
  province: number
  authStatus: number
  followed: boolean
  avatarUrl: string
  accountStatus: number
  gender: number
  city: number
  birthday: number
  userId: number
  userType: number
  nickname: string
  signature: string
  description: string
  detailDescription: string
  avatarImgId: number
  backgroundImgId: number
  backgroundUrl: string
  authority: number
  mutual: boolean
  expertTags: object
  experts: object
  djStatus: number
  vipType: number
  remarkName: object
  authenticationTypes: number
  avatarDetail: object
  backgroundImgIdStr: string
  avatarImgIdStr: string
  anchor: boolean
  avatarImgId_str: string
}

/*Playlist*/
export interface Playlist {
  subscribers: Subscribers[]
  subscribed: boolean
  creator: Creator
  tracks: Tracks[]
  videoIds: object
  videos: object
  trackIds: TrackIds[]
  updateFrequency: object
  backgroundCoverId: number
  backgroundCoverUrl: object
  titleImage: number
  titleImageUrl: object
  englishTitle: object
  opRecommend: boolean
  ordered: boolean
  description: string
  status: number
  playCount: number
  trackNumberUpdateTime: number
  specialType: number
  trackCount: number
  privacy: number
  trackUpdateTime: number
  updateTime: number
  commentThreadId: string
  adType: number
  cloudTrackCount: number
  tags: string[]
  coverImgUrl: string
  newImported: boolean
  createTime: number
  highQuality: boolean
  subscribedCount: number
  userId: number
  coverImgId: number
  name: string
  id: number
  shareCount: number
  coverImgId_str: string
  commentCount: number
}

/*PlayListDetail*/
export interface PlayListDetail {
  code: number
  relatedVideos: object
  playlist: Playlist
  urls: object
  privileges: Privileges[]
  reason: string
}
