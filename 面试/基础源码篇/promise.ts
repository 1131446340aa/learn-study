interface PromiseConstructor {
  myRace: (...args: any[]) => Promise<unknown>
  myAll: (...args: any[]) => Promise<unknown>
}


Promise.myRace = function (values) {

  return new Promise((resolve, reject) => {
    values.forEach((item: any) => {
      ((item && typeof item === 'object') || typeof item === 'function') && typeof item.then === 'function'
        ? item.then(resolve, reject)
        : resolve(item);
    });
  });
};


Promise.myAll = function (values) {
  if (!Array.isArray(values)) return;
  return new Promise((resolve, reject) => {
    let promiseArray = [];
    let i = 0;
    function processDate(index: number, value: any) {
      promiseArray[index] = value;
      ++i === values.length && resolve(promiseArray);
    }
    values.forEach((item, index) => {
      ((item && typeof item === 'object') || typeof item === 'function') && typeof item.then === 'function'
        ? item.then((res: any) => {
          processDate(index, res);
        }, reject)
        : processDate(index, item);
    });
  });
};

// 源码不会问 忽略

interface Promise<T> {
  finally1: T
}

Promise.prototype.finally1 = function (f) {
  return this.then((value) => {
    // f(); return value;
    // Promise.resolve会等f()的函数执行完再返回结果
    return Promise.resolve(f()).then(() => value);
  }, (err) => {
    return Promise.resolve(f()).then(() => {
      throw err;
    });
  });

};


class myPromise1 {
  status = 'pending';
  value = undefined;
  reason = undefined;
  resolveArr = [];

  constructor(fn: (resolve: Function, reject: Function) => void) {
    fn(this.resolveCallBack, this.rejectCallBack);
  }
  resolveCallBack = <T extends object>(res: T) => {
    if (this.status === 'pending') {
      setTimeout(() => {
        this.resolveArr.forEach(fn => {
          fn(res);
        });
      }, 0);
    }
    if (this.status === 'resolve') {
      this.resolveArr.forEach(fn => {
        fn(res);
      });
    }
  };
  rejectCallBack = <T extends object>(err: T) => { };
  then(fn: <T extends object>(res: T) => void) {
    this.status === 'pending' && (this.status = 'resolve');
    this.resolveArr.push(fn);
  }
  catch() { }
}





