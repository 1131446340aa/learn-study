import { isObject } from './util'
import reactive from './reactive'
import { track, trigger } from './effect'

function createGetter () {
  return function get (target, key, receiver) {
    let res = Reflect.get(target, key, receiver)
    track(target, 'get', key)
    if (isObject(res)) {
      return reactive(res)
    }
    return res
  }
}

function createSetter () {
  return function set (target, key, value, receiver) {
    const oldval = target[key]
    const hasKey = Object.prototype.hasOwnProperty.call(target, key)
    let res = Reflect.set(target, key, value, receiver)
    if (!hasKey) {
      trigger(target, 'add', key, value, oldval)
    } else if (value !== oldval) {
      trigger(target, 'set', key, value)
    }
    return res
  }
}
const get = createGetter()
const set = createSetter()
export const mutaable = {
  get,
  set
}
