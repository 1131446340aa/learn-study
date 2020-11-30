/*Tlyric*/
export interface Tlyric {
  version: number
  lyric: string
}

/*Klyric*/
export interface Klyric {
  version: number
  lyric: string
}

/*Lrc*/
export interface Lrc {
  version: number
  lyric: string
}

/*Lyric*/
export interface Lyric {
  sgc: boolean
  sfy: boolean
  qfy: boolean
  lrc: Lrc
  klyric: Klyric
  tlyric: Tlyric
  code: number
}
