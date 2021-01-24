import { isFunction} from './util'
import effect, { track, trigger } from './effect'

export default function computed(getterOptions) {
  let getter
  let setter
  if (isFunction(getterOptions)) {
    getter = getterOptions
    setter = () => { }
  } else {
    getter = getterOptions.get
    setter = getterOptions.set
  }
  let computed
  let dirty = true
  let value
  let runner = effect(getter, {
    lazy: true,
    computed: true,
    scheduler: () => {
      if (!dirty) {
        dirty = true
        trigger(computed, 'set', value)
      }
    }
  })
  
  
 return computed = {
    get value() {
      if (dirty) {
        value = runner()   
        dirty = false
        track(computed,'get',value)
      }
      return value
     },
    set value(newval) {
      setter(newval)
     }
  }
}