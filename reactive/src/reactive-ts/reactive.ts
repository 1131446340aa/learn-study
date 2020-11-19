import { isObject } from "./util"
import { handle } from './basehandles'

export const reactive = <T extends object>(target: T) => {
  if (isObject(target)) {
    return new Proxy(target, handle)
  }
  return target
}



