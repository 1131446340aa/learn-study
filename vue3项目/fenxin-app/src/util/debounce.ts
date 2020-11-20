export const Debounce = <U extends {}>(callback: (...args:U[])=>any, wait: number) => {
  let timer:number | NodeJS.Timeout=0
  return (...args: U[])=> {
    if (timer && typeof timer !== 'number') {
      clearTimeout(timer)
   }
   timer= setTimeout(() => {
      callback(...args)
    }, wait);
  }
}



