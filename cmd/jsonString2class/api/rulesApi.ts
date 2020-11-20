
        

        
 /*Artist*/
  export class Artist {
    id: number;
    name: string;
    picUrl: object;
    alias: any[];
    albumSize: number;
    picId: number;
    img1v1Url: string;
    img1v1: number;
    trans: object;
    
    }
        
 /*Album*/
  export class Album {
    id: number;
    name: string;
    artist: Artist;
    publishTime: number;
    size: number;
    copyrightId: number;
    status: number;
    picId: number;
    mark: number;
    
    }
        

        
 /*Artists*/
  export class Artists {
    id: number;
    name: string;
    picUrl: object;
    alias: any[];
    albumSize: number;
    picId: number;
    img1v1Url: string;
    img1v1: number;
    trans: object;
    
    }
        
 /*Songs*/
  export class Songs {
    id: number;
    name: string;
    artists: Artists[];
    album: Album;
    duration: number;
    copyrightId: number;
    status: number;
    alias: any[];
    rtype: number;
    ftype: number;
    mvid: number;
    fee: number;
    rUrl: object;
    mark: number;
    
    }
        
 /*Result*/
  export class Result {
    songs: Songs[];
    hasMore: boolean;
    songCount: number;
    
    }
        
 /*RulesAPi*/
  export class RulesAPi {
    result: Result;
    code: number;
    
    }