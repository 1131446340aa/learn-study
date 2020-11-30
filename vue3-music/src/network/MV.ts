/*Artists*/
export interface Artists {
  id: number
  name: string
  alias: any[]
  transNames: string[]
}

/*Data*/
export interface Data {
  id: number
  cover: string
  name: string
  playCount: number
  briefDesc: object
  desc: object
  artistName: string
  artistId: number
  duration: number
  mark: number
  subed: boolean
  artists: Artists[]
}

/*MV*/
export interface MV {
  hasMore: boolean
  data: Data[]
  code: number
}
