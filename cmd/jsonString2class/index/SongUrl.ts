 /*FreeTrialPrivilege*/
  export class FreeTrialPrivilege {
    resConsumable: boolean;
    userConsumable: boolean;
    
    }
        
 /*Data*/
  export class Data {
    id: number;
    url: object;
    br: number;
    size: number;
    md5: object;
    code: number;
    expi: number;
    type: object;
    gain: number;
    fee: number;
    uf: object;
    payed: number;
    flag: number;
    canExtend: boolean;
    freeTrialInfo: object;
    level: object;
    encodeType: object;
    freeTrialPrivilege: FreeTrialPrivilege;
    urlSource: number;
    
    }
        
 /*SongUrl*/
  export class SongUrl {
    data: Data[];
    code: number;
    
    }