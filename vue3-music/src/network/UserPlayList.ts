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

/*Playlist*/
export interface Playlist {
  subscribers: any[]
  subscribed: boolean
  creator: Creator
  artists: object
  tracks: object
  updateFrequency: object
  backgroundCoverId: number
  backgroundCoverUrl: object
  titleImage: number
  titleImageUrl: object
  englishTitle: object
  opRecommend: boolean
  recommendInfo: object
  ordered: boolean
  trackUpdateTime: number
  trackNumberUpdateTime: number
  createTime: number
  highQuality: boolean
  description: string
  specialType: number
  updateTime: number
  adType: number
  totalDuration: number
  trackCount: number
  newImported: boolean
  coverImgId: number
  anonimous: boolean
  coverImgUrl: string
  playCount: number
  commentThreadId: string
  privacy: number
  status: number
  tags: string[]
  userId: number
  subscribedCount: number
  cloudTrackCount: number
  name: string
  id: number
  coverImgId_str: string
}

/*UserPlayList*/
export interface UserPlayList {
  version: string
  more: boolean
  playlist: Playlist[]
  code: number
}
