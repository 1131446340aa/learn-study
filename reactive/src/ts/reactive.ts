import { handle } from './baseHandle';
import { isObject } from './util';
function createReactive<T>(target:T):T {
  return new Proxy(target,handle)
}

export function reactive<T>(target: T): T {
  if (isObject) {
   return createReactive(target)
   }
  return target
  
}