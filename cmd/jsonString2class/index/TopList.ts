 /*Bindings*/
  export class Bindings {
    bindingTime: number;
    tokenJsonStr: string;
    expiresIn: number;
    expired: boolean;
    refreshTime: number;
    userId: number;
    url: string;
    id: number;
    type: number;
    
    }
        

        
 /*Profile*/
  export class Profile {
    avatarImgIdStr: string;
    backgroundImgIdStr: string;
    userType: number;
    gender: number;
    accountStatus: number;
    vipType: number;
    avatarImgId: number;
    nickname: string;
    birthday: number;
    city: number;
    backgroundImgId: number;
    avatarUrl: string;
    province: number;
    defaultAvatar: boolean;
    djStatus: number;
    mutual: boolean;
    experts: ;
    remarkName: object;
    expertTags: object;
    authStatus: number;
    followed: boolean;
    backgroundUrl: string;
    detailDescription: string;
    description: string;
    userId: number;
    signature: string;
    authority: number;
    avatarImgId_str: string;
    followeds: number;
    follows: number;
    eventCount: number;
    avatarDetail: object;
    playlistCount: number;
    playlistBeSubscribedCount: number;
    
    }
        
 /*Account*/
  export class Account {
    id: number;
    userName: string;
    type: number;
    status: number;
    whitelistAuthority: number;
    createTime: number;
    salt: string;
    tokenVersion: number;
    ban: number;
    baoyueVersion: number;
    donateVersion: number;
    vipType: number;
    viptypeVersion: number;
    anonimousUser: boolean;
    
    }
        
 /*TopList*/
  export class TopList {
    loginType: number;
    code: number;
    account: Account;
    token: string;
    profile: Profile;
    bindings: Bindings[];
    
    }