function myNew<T extends Function>(fn: T, ...args: any[]) {
  let obj = Object.create(fn);
  let res = fn.call(obj, ...args);
  return typeof res === 'object' ? res : obj;
}
