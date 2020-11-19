import { reactive } from './reactive';
import { isObject } from './util';
import { strNumSym } from './type/index';
export const handle = {
  get(target: object, key: strNumSym, recever:object) {
      let res = Reflect.get(target, key, recever)
      return isObject(res) ? reactive(res) : res;
  },
  set(target:any, key:strNumSym, value:any, recever:object) {
    let res = Reflect.set(target, key, value, recever)
    return res
   }
}
