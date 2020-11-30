/*Bindings*/
export interface Bindings {
  expiresIn: number
  expired: boolean
  tokenJsonStr: string
  refreshTime: number
  id: number
  type: number
  userId: number
  bindingTime: number
  url: string
}

/*Profile*/
export interface Profile {
  userId: number
  nickname: string
  avatarUrl: string
  birthday: string
  userType: number
  djStatus: number
}

/*StausLogin*/
export interface StatusLogin {
  code: number
  profile: Profile
  bindings: Bindings[]
}
