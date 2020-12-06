/*VideoGroup*/
export interface VideoGroup {
  id: number;
  name: string;
  type: number;
}

/*Artists*/
export interface Artists {
  id: number;
  name: string;
  img1v1Url: object;
  followed: boolean;
}

/*Brs*/
export interface Brs {
  size: number;
  br: number;
  point: number;
}

/*Data*/
export interface Data {
  id: number;
  name: string;
  artistId: number;
  artistName: string;
  briefDesc: string;
  desc: object;
  cover: string;
  coverId_str: string;
  coverId: number;
  playCount: number;
  subCount: number;
  shareCount: number;
  commentCount: number;
  duration: number;
  nType: number;
  publishTime: string;
  price: object;
  brs: Brs[];
  artists: Artists[];
  commentThreadId: string;
  videoGroup: VideoGroup[];
}

/*Mp*/
export interface Mp {
  id: number;
  fee: number;
  mvFee: number;
  payed: number;
  pl: number;
  dl: number;
  cp: number;
  sid: number;
  st: number;
  normal: boolean;
  unauthorized: boolean;
  msg: object;
}

/*MvDetail*/
export interface MvDetail {
  loadingPic: string;
  bufferPic: string;
  loadingPicFS: string;
  bufferPicFS: string;
  subed: boolean;
  mp: Mp;
  data: Data;
  code: number;
}
