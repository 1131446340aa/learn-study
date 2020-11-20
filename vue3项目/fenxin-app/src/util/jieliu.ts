export const JieLiu = <U extends {}> (callback: (...args:U[])=>any, wait:number, immediate=true) => {
  let timer: number = 0
  let timer1:NodeJS.Timeout
  return  (...args:U[])=> {
    if (immediate) {   
      let nowDate = Date.now()
      if (nowDate - timer > wait) {
        callback(...args)
        timer=Date.now()
      }
    } else {
      if (!timer1) {
        timer1 = setTimeout(() => {
          callback(...args)
          timer = 0
        }, wait);
      }
    }
  }
}