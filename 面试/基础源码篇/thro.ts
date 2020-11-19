function thro<T extends Function>(fn: T, time: number, like = true) {
  let timer = 0;
  if (like) {
    return (...args: any[]) => {
      let newTime = Date.parse(String(new Date()));
      if (newTime - timer > 0) {
        fn(...args);
        timer = newTime;
      }
    };
  } else {
    return (...args: any[]) => {
      if (!timer) {
        timer = setTimeout(() => {
          fn(...args);
          timer = null;
        }, time);
      }
    };
  }
}

