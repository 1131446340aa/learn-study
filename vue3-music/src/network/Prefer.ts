/*Data*/
export interface Data {
  id: number
  name: string
  rcmdText: string
  radioFeeType: number
  feeScope: number
  picUrl: string
  programCount: number
  subCount: number
  subed: boolean
  playCount: number
  alg: string
  originalPrice: object
  discountPrice: object
  lastProgramName: string
  traceId: object
  icon: object
}

/*Prefer*/
export interface Prefer {
  code: number
  msg: object
  data: Data[]
}
