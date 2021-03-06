 /*Subscribers*/
  export interface Subscribers {
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
    avatarImgIdStr: string;
    backgroundImgIdStr: string;
    anchor: boolean;
    avatarImgId_str: string;
    
    }
        
 /*Creator*/
  export interface Creator {
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
    avatarImgIdStr: string;
    backgroundImgIdStr: string;
    anchor: boolean;
    avatarImgId_str: string;
    
    }
        

        
 /*Playlists*/
  export interface Playlists {
    name: string;
    id: number;
    trackNumberUpdateTime: number;
    status: number;
    userId: number;
    createTime: number;
    updateTime: number;
    subscribedCount: number;
    trackCount: number;
    cloudTrackCount: number;
    coverImgUrl: string;
    coverImgId: number;
    description: string;
    tags: string[];
    playCount: number;
    trackUpdateTime: number;
    specialType: number;
    totalDuration: number;
    creator: Creator;
    tracks: object;
    subscribers: Subscribers[];
    subscribed: object;
    commentThreadId: string;
    newImported: boolean;
    adType: number;
    highQuality: boolean;
    privacy: number;
    ordered: boolean;
    anonimous: boolean;
    coverStatus: number;
    recommendInfo: object;
    shareCount: number;
    coverImgId_str: string;
    commentCount: number;
    alg: string;
    
    }
        
 /*TopPlayList*/
  export interface TopPlayList {
    playlists: Playlists[];
    total: number;
    code: number;
    more: boolean;
    cat: string;
    
    }