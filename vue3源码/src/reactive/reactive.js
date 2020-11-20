import {isObject }from './util'
import { mutaable} from './basehandles'
function createReactiveObject(target, hander) {
  if (!isObject(target)) {
    return target
  }
 return new  Proxy(target,hander)
}

export default function reactive(target) {

  return createReactiveObject(target, mutaable)
}