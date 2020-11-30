/*Bindings*/
export class Bindings {
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
export class Profile {
  userId: number
  nickname: string
  avatarUrl: string
  birthday: string
  userType: number
  djStatus: number
}

/*StausLogin.ts*/
export class StausLogin {
  code: number
  profile: Profile
  bindings: Bindings[]
}
