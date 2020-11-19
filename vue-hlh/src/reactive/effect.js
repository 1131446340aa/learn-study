let uid = 0
let activeEffect = null
let effectStack = []

function createEffect(fn, options = {}) {

    const effect = function reactiveEffect() {
        if (!effectStack.includes(effect)) {
            try {
                effectStack.push(effect)
                activeEffect = effect
                return fn()
            } finally {
                effectStack.pop()
                activeEffect = effectStack[effectStack.length - 1]

            }
        }

    }
    effect.options = options
    effect.id = uid++
        effect.deps = []

    return effect
}

export default function(fn, options = {}) {
    const effect = createEffect(fn, options)
    if (!options.lazy) {
        effect()
    }
    return effect
}
const targetMap = new WeakMap()
export function track(target, type, key) {
    if (activeEffect == undefined) return

    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, dep = (new Set()))
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect)
    }
    activeEffect.deps.push(dep)
}

export function trigger(target, type, key, value, oldvalue) {
    const depsMap = targetMap.get(target)
        // console.log(targetMap);
        // console.log(target);
    if (!depsMap) return
    const effects = new Set()
    const computedRunners = new Set()
    const add = effectsToAdd => {
            if (effectsToAdd) {
                effectsToAdd.forEach(effect => {
                    if (effect.options.computed) {
                        computedRunners.add(effect)
                    } else {
                        effects.add(effect)
                    }
                })
            }
        }
        // const run = effects => {
        //   if (effects) {
        //     effects.forEach(effect=>effect())
        //   }
        // }
    if (key !== null) {
        add(depsMap.get(key))
    }
    if (type === 'add') {

        add(depsMap.get(Array.isArray(target) ? 'length' : ''))
    }
    const run = (effect) => {
        if (effect.options.scheduler) {
            effect.options.scheduler()
        } else {
            effect()
        }
    }
    computedRunners.forEach(run)
    effects.forEach(run)
}