import { isObject } from "./util"
import { handle } from './basehandles'

export const reactive = <T extends object>(target: T) => {
  if (isObject(target)) {
    return new Proxy(target, handle) as T
  } else {
    return target
  }

}
let x = reactive({ a: [] })

x.a.push(1)



