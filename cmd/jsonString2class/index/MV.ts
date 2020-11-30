
        

        
 /*Artists*/
  export class Artists {
    id: number;
    name: string;
    alias: any[];
    transNames: string[];
    
    }
        
 /*Data*/
  export class Data {
    id: number;
    cover: string;
    name: string;
    playCount: number;
    briefDesc: object;
    desc: object;
    artistName: string;
    artistId: number;
    duration: number;
    mark: number;
    subed: boolean;
    artists: Artists[];
    
    }
        
 /*MV*/
  export class MV {
    hasMore: boolean;
    data: Data[];
    code: number;
    
    }