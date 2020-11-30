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
    chargeInfoList: object;
    
    }
        

        
 /*SongDetail*/
  export class SongDetail {
    songs: any[];
    privileges: Privileges[];
    code: number;
    
    }