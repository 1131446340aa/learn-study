 /*Dj*/
  export class Dj {
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
    
    }
        
 /*DjRadios*/
  export class DjRadios {
    id: number;
    name: string;
    picUrl: string;
    programCount: number;
    subCount: number;
    createTime: number;
    categoryId: number;
    category: string;
    rcmdtext: string;
    radioFeeType: number;
    feeScope: number;
    playCount: number;
    dj: Dj;
    copywriter: string;
    
    }
        
 /*DjRecommend*/
  export class DjRecommend {
    djRadios: DjRadios[];
    name: string;
    code: number;
    
    }