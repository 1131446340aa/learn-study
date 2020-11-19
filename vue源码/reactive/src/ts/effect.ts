import { _Function, strNumSym, effectTypeGet } from './type/index';
import { EffectOptions } from './interface';
import { Effect } from '../reactive-ts/interface';
function createEffect(fn: _Function, options: EffectOptions) {
  let uid: number
  let activateEffect: Effect
  let EffectStack: Effect[] = []
    let Effect: Effect = function () {
      if (EffectStack.includes(Effect)) {
        try {
          activateEffect = Effect
         EffectStack.push(Effect)
          return fn()
        }
        finally {
          EffectStack.pop()
          activateEffect=EffectStack[EffectStack.length-1]
        }
      }
    Effect.id = uid++
    Effect.deps = []
    Effect.options=options
    
  }
  return Effect
}
export const effect = function (fn:_Function,options:EffectOptions) {
  let effect = createEffect(fn, options)
  if (!options.lazy) {
    fn()
  }
  return effect
}

export const track = function (target: object, type: effectTypeGet, key: strNumSym) { 
  let targetMap: WeakMap<object, Map<strNumSym, Set<Effect>>> = new WeakMap()
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target,(depsMap=new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key,new Set())
  }
}

export const trigger = function () { }

