/*AvatarDetail*/
export interface AvatarDetail {
  userType: number
  identityLevel: object
  identityIconUrl: string
}

/*Dj*/
export interface Dj {
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
  avatarDetail: AvatarDetail
  avatarImgIdStr: string
  backgroundImgIdStr: string
  anchor: boolean
  rewardCount: number
  avatarImgId_str: string
  canReward: boolean
}

/*DjRadio*/
export interface DjRadio {
  id: number
  dj: Dj
  name: string
  picUrl: string
  desc: string
  subCount: number
  programCount: number
  createTime: number
  categoryId: number
  category: string
  radioFeeType: number
  feeScope: number
  buyed: boolean
  videos: object
  finished: boolean
  underShelf: boolean
  purchaseCount: number
  price: number
  originalPrice: number
  discountPrice: object
  lastProgramCreateTime: number
  lastProgramName: object
  lastProgramId: number
  picId: number
  rcmdText: string
  hightQuality: boolean
  whiteList: boolean
  liveInfo: object
  playCount: number
  icon: object
  composeVideo: boolean
  shareCount: number
  subed: boolean
  likedCount: number
  commentDatas: any[]
  commentCount: number
}

/*DJDetail*/
export interface DJDetail {
  djRadio: DjRadio
  picId: string
  code: number
}
