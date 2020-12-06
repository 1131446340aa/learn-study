/*Data*/
export interface Data {
  searchWord: string
  score: number
  content: string
  source: number
  iconType: number
  iconUrl: string
  url: string
  alg: string
}

/*HotSearch*/
export interface HotSearch {
  code: number
  data: Data[]
  message: string
}
