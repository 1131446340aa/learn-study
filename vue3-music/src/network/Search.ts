/*Artist*/
export interface Artist {
  id: number
  name: string
  picUrl: object
  alias: any[]
  albumSize: number
  picId: number
  img1v1Url: string
  img1v1: number
  trans: object
}

/*Album*/
export interface Album {
  id: number
  name: string
  artist: Artist
  publishTime: number
  size: number
  copyrightId: number
  status: number
  picId: number
  mark: number
}

/*Artists*/
export interface Artists {
  id: number
  name: string
  picUrl: object
  alias: any[]
  albumSize: number
  picId: number
  img1v1Url: string
  img1v1: number
  trans: object
}

/*Songs*/
export interface Songs {
  id: number
  name: string
  artists: Artists[]
  album: Album
  duration: number
  copyrightId: number
  status: number
  alias: any[]
  rtype: number
  ftype: number
  mvid: number
  fee: number
  rUrl: object
  mark: number
}

/*Result*/
export interface Result {
  songs: Songs[]
  hasMore: boolean
  songCount: number
}

/*Search*/
export interface Search {
  result: Result
  code: number
}
