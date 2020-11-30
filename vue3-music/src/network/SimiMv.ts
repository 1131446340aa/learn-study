
        
 /*Artists*/
  export interface Artists {
    id: number;
    name: string;
    alias: any[];
    transNames: object;
    
    }
        
 /*Mvs*/
  export interface Mvs {
    id: number;
    cover: string;
    name: string;
    playCount: number;
    briefDesc: string;
    desc: object;
    artistName: string;
    artistId: number;
    duration: number;
    mark: number;
    artists: Artists[];
    alg: string;
    
    }
        
 /*SimiMv*/
  export interface SimiMv {
    mvs: Mvs[];
    code: number;
    
    }