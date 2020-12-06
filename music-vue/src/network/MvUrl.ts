/*Data*/
export interface Data {
  id: number
  url: string
  r: number
  size: number
  md5: string
  code: number
  expi: number
  fee: number
  mvFee: number
  st: number
  promotionVo: object
  msg: string
}

/*MvUrl*/
export interface MvUrl {
  code: number
  data: Data
}
