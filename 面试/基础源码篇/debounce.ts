function debounce(fn: Function, time: number) {
  let timer = 0;
  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn(...args);
    }, time);
  };
}
