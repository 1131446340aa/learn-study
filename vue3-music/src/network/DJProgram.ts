
        
 /*Radio*/
  export interface Radio {
    dj: object;
    category: string;
    buyed: boolean;
    price: number;
    originalPrice: number;
    discountPrice: object;
    purchaseCount: number;
    lastProgramName: object;
    videos: object;
    finished: boolean;
    underShelf: boolean;
    liveInfo: object;
    playCount: number;
    privacy: boolean;
    icon: object;
    radioFeeType: number;
    programCount: number;
    categoryId: number;
    createTime: number;
    feeScope: number;
    picId: number;
    subCount: number;
    lastProgramCreateTime: number;
    lastProgramId: number;
    desc: string;
    picUrl: string;
    name: string;
    id: number;
    
    }
        
 /*Dj*/
  export interface Dj {
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
    anchor: boolean;
    backgroundImgIdStr: string;
    avatarImgIdStr: string;
    avatarImgId_str: string;
    brand: string;
    
    }
        
 /*BMusic*/
  export interface BMusic {
    name: object;
    id: number;
    size: number;
    extension: string;
    sr: number;
    dfsId: number;
    bitrate: number;
    playTime: number;
    volumeDelta: number;
    
    }
        
 /*LMusic*/
  export interface LMusic {
    name: object;
    id: number;
    size: number;
    extension: string;
    sr: number;
    dfsId: number;
    bitrate: number;
    playTime: number;
    volumeDelta: number;
    
    }
        
 /*HMusic*/
  export interface HMusic {
    name: object;
    id: number;
    size: number;
    extension: string;
    sr: number;
    dfsId: number;
    bitrate: number;
    playTime: number;
    volumeDelta: number;
    
    }
        

        

        
 /*Artists*/
  export interface Artists {
    name: string;
    id: number;
    picId: number;
    img1v1Id: number;
    briefDesc: string;
    picUrl: string;
    img1v1Url: string;
    albumSize: number;
    alias: any[];
    trans: string;
    musicSize: number;
    topicPerson: number;
    
    }
        

        

        

        
 /*Artist*/
  export interface Artist {
    name: string;
    id: number;
    picId: number;
    img1v1Id: number;
    briefDesc: string;
    picUrl: string;
    img1v1Url: string;
    albumSize: number;
    alias: any[];
    trans: string;
    musicSize: number;
    topicPerson: number;
    
    }
        
 /*Album*/
  export interface Album {
    name: string;
    id: number;
    type: object;
    size: number;
    picId: number;
    blurPicUrl: object;
    companyId: number;
    pic: number;
    picUrl: string;
    publishTime: number;
    description: string;
    tags: string;
    company: object;
    briefDesc: string;
    artist: Artist;
    songs: any[];
    alias: any[];
    status: number;
    copyrightId: number;
    commentThreadId: string;
    artists: Artists[];
    subType: object;
    transName: object;
    mark: number;
    
    }
        

        
 /*Artists*/
  export interface Artists {
    name: string;
    id: number;
    picId: number;
    img1v1Id: number;
    briefDesc: string;
    picUrl: string;
    img1v1Url: string;
    albumSize: number;
    alias: any[];
    trans: string;
    musicSize: number;
    topicPerson: number;
    
    }
        

        
 /*MainSong*/
  export interface MainSong {
    name: string;
    id: number;
    position: number;
    alias: any[];
    status: number;
    fee: number;
    copyrightId: number;
    disc: string;
    no: number;
    artists: Artists[];
    album: Album;
    starred: boolean;
    popularity: number;
    score: number;
    starredNum: number;
    duration: number;
    playedNum: number;
    dayPlays: number;
    hearTime: number;
    ringtone: string;
    crbt: object;
    audition: object;
    copyFrom: string;
    commentThreadId: string;
    rtUrl: object;
    ftype: number;
    rtUrls: any[];
    copyright: number;
    transName: object;
    sign: object;
    mark: number;
    noCopyrightRcmd: object;
    hMusic: HMusic;
    mMusic: object;
    lMusic: LMusic;
    bMusic: BMusic;
    rtype: number;
    rurl: object;
    mvid: number;
    mp3Url: object;
    
    }
        
 /*Programs*/
  export interface Programs {
    mainSong: MainSong;
    songs: object;
    dj: Dj;
    blurCoverUrl: string;
    radio: Radio;
    duration: number;
    buyed: boolean;
    programDesc: object;
    h5Links: object;
    canReward: boolean;
    auditStatus: number;
    videoInfo: object;
    score: number;
    liveInfo: object;
    alg: object;
    disPlayStatus: object;
    description: string;
    programFeeType: number;
    mainTrackId: number;
    listenerCount: number;
    channels: string[];
    isPublish: boolean;
    coverUrl: string;
    trackCount: number;
    serialNum: number;
    createTime: number;
    feeScope: number;
    pubStatus: number;
    bdAuditStatus: number;
    subscribedCount: number;
    reward: boolean;
    titbitImages: object;
    titbits: object;
    commentThreadId: string;
    smallLanguageAuditStatus: number;
    privacy: boolean;
    name: string;
    id: number;
    shareCount: number;
    subscribed: boolean;
    likedCount: number;
    commentCount: number;
    
    }
        
 /*DJProgram*/
  export interface DJProgram {
    count: number;
    code: number;
    programs: Programs[];
    more: boolean;
    
    }