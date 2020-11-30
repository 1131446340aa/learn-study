 /*Tlyric*/
  export class Tlyric {
    version: number;
    lyric: string;
    
    }
        
 /*Klyric*/
  export class Klyric {
    version: number;
    lyric: string;
    
    }
        
 /*Lrc*/
  export class Lrc {
    version: number;
    lyric: string;
    
    }
        
 /*Lyric*/
  export class Lyric {
    sgc: boolean;
    sfy: boolean;
    qfy: boolean;
    lrc: Lrc;
    klyric: Klyric;
    tlyric: Tlyric;
    code: number;
    
    }