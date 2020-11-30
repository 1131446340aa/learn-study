 /*LMusic*/
  export class LMusic {
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
        
 /*MMusic*/
  export class MMusic {
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
  export class HMusic {
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
        
 /*BMusic*/
  export class BMusic {
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
  export class Artists {
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
  export class Artist {
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
  export class Album {
    name: string;
    id: number;
    type: string;
    size: number;
    picId: number;
    blurPicUrl: string;
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
    subType: string;
    transName: object;
    mark: number;
    picId_str: string;
    
    }
        

        
 /*Artists*/
  export class Artists {
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
        

        
 /*Songs*/
  export class Songs {
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
    rtype: number;
    rurl: object;
    bMusic: BMusic;
    mp3Url: object;
    hMusic: HMusic;
    mMusic: MMusic;
    lMusic: LMusic;
    mvid: number;
    
    }
        
 /*RewardToplist*/
  export class RewardToplist {
    coverUrl: string;
    songs: Songs[];
    name: string;
    position: number;
    
    }
        
 /*Artists*/
  export class Artists {
    first: string;
    second: string;
    third: number;
    
    }
        
 /*ArtistToplist*/
  export class ArtistToplist {
    coverUrl: string;
    artists: Artists[];
    name: string;
    upateFrequency: string;
    position: number;
    updateFrequency: string;
    
    }
        

        
 /*Tracks*/
  export class Tracks {
    first: string;
    second: string;
    
    }
        

        
 /*List*/
  export class List {
    subscribers: any[];
    subscribed: object;
    creator: object;
    artists: object;
    tracks: Tracks[];
    updateFrequency: string;
    backgroundCoverId: number;
    backgroundCoverUrl: object;
    titleImage: number;
    titleImageUrl: object;
    englishTitle: object;
    opRecommend: boolean;
    recommendInfo: object;
    trackNumberUpdateTime: number;
    adType: number;
    subscribedCount: number;
    cloudTrackCount: number;
    userId: number;
    createTime: number;
    highQuality: boolean;
    coverImgId: number;
    newImported: boolean;
    anonimous: boolean;
    updateTime: number;
    coverImgUrl: string;
    specialType: number;
    totalDuration: number;
    trackCount: number;
    commentThreadId: string;
    privacy: number;
    trackUpdateTime: number;
    playCount: number;
    description: string;
    tags: any[];
    ordered: boolean;
    status: number;
    name: string;
    id: number;
    coverImgId_str: string;
    ToplistType: string;
    
    }
        
 /*TopPlayList*/
  export class TopPlayList {
    code: number;
    list: List[];
    artistToplist: ArtistToplist;
    rewardToplist: RewardToplist;
    
    }