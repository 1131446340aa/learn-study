 /*ChargeInfoList*/
  export class ChargeInfoList {
    rate: number;
    chargeUrl: object;
    chargeMessage: object;
    chargeType: number;
    
    }
        
 /*FreeTrialPrivilege*/
  export class FreeTrialPrivilege {
    resConsumable: boolean;
    userConsumable: boolean;
    
    }
        
 /*Privileges*/
  export class Privileges {
    id: number;
    fee: number;
    payed: number;
    st: number;
    pl: number;
    dl: number;
    sp: number;
    cp: number;
    subp: number;
    cs: boolean;
    maxbr: number;
    fl: number;
    toast: boolean;
    flag: number;
    preSell: boolean;
    playMaxbr: number;
    downloadMaxbr: number;
    freeTrialPrivilege: FreeTrialPrivilege;
    chargeInfoList: ChargeInfoList[];
    
    }
        

        
 /*TrackIds*/
  export class TrackIds {
    id: number;
    v: number;
    at: number;
    alg: object;
    
    }
        

        
 /*L*/
  export class L {
    br: number;
    fid: number;
    size: number;
    vd: number;
    
    }
        
 /*M*/
  export class M {
    br: number;
    fid: number;
    size: number;
    vd: number;
    
    }
        
 /*H*/
  export class H {
    br: number;
    fid: number;
    size: number;
    vd: number;
    
    }
        

        
 /*Al*/
  export class Al {
    id: number;
    name: string;
    picUrl: string;
    tns: any[];
    pic_str: string;
    pic: number;
    
    }
        

        

        

        
 /*Ar*/
  export class Ar {
    id: number;
    name: string;
    tns: any[];
    alias: any[];
    
    }
        
 /*Tracks*/
  export class Tracks {
    name: string;
    id: number;
    pst: number;
    t: number;
    ar: Ar[];
    alia: string[];
    pop: number;
    st: number;
    rt: object;
    fee: number;
    v: number;
    crbt: object;
    cf: string;
    al: Al;
    dt: number;
    h: H;
    m: M;
    l: L;
    a: object;
    cd: string;
    no: number;
    rtUrl: object;
    ftype: number;
    rtUrls: any[];
    djId: number;
    copyright: number;
    s_id: number;
    mark: number;
    originCoverType: number;
    noCopyrightRcmd: object;
    rtype: number;
    rurl: object;
    mst: number;
    cp: number;
    mv: number;
    publishTime: number;
    
    }
        
 /*Creator*/
  export class Creator {
    defaultAvatar: boolean;
    province: number;
    authStatus: number;
    followed: boolean;
    avatarUrl: string;
    accountStatus: number;
    gender: number;
    city: number;
    birthday: number;
    userId: number;
    userType: number;
    nickname: string;
    signature: string;
    description: string;
    detailDescription: string;
    avatarImgId: number;
    backgroundImgId: number;
    backgroundUrl: string;
    authority: number;
    mutual: boolean;
    expertTags: object;
    experts: object;
    djStatus: number;
    vipType: number;
    remarkName: object;
    authenticationTypes: number;
    avatarDetail: object;
    backgroundImgIdStr: string;
    avatarImgIdStr: string;
    anchor: boolean;
    avatarImgId_str: string;
    
    }
        
 /*Subscribers*/
  export class Subscribers {
    defaultAvatar: boolean;
    province: number;
    authStatus: number;
    followed: boolean;
    avatarUrl: string;
    accountStatus: number;
    gender: number;
    city: number;
    birthday: number;
    userId: number;
    userType: number;
    nickname: string;
    signature: string;
    description: string;
    detailDescription: string;
    avatarImgId: number;
    backgroundImgId: number;
    backgroundUrl: string;
    authority: number;
    mutual: boolean;
    expertTags: object;
    experts: object;
    djStatus: number;
    vipType: number;
    remarkName: object;
    authenticationTypes: number;
    avatarDetail: object;
    backgroundImgIdStr: string;
    avatarImgIdStr: string;
    anchor: boolean;
    avatarImgId_str: string;
    
    }
        
 /*Playlist*/
  export class Playlist {
    subscribers: Subscribers[];
    subscribed: boolean;
    creator: Creator;
    tracks: Tracks[];
    videoIds: object;
    videos: object;
    trackIds: TrackIds[];
    updateFrequency: object;
    backgroundCoverId: number;
    backgroundCoverUrl: object;
    titleImage: number;
    titleImageUrl: object;
    englishTitle: object;
    opRecommend: boolean;
    ordered: boolean;
    description: string;
    status: number;
    playCount: number;
    trackNumberUpdateTime: number;
    specialType: number;
    trackCount: number;
    privacy: number;
    trackUpdateTime: number;
    updateTime: number;
    commentThreadId: string;
    adType: number;
    cloudTrackCount: number;
    tags: string[];
    coverImgUrl: string;
    newImported: boolean;
    createTime: number;
    highQuality: boolean;
    subscribedCount: number;
    userId: number;
    coverImgId: number;
    name: string;
    id: number;
    shareCount: number;
    coverImgId_str: string;
    commentCount: number;
    
    }
        
 /*PlayListDetail*/
  export class PlayListDetail {
    code: number;
    relatedVideos: object;
    playlist: Playlist;
    urls: object;
    privileges: Privileges[];
    reason: string;
    
    }