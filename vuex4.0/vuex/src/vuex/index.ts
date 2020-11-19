import { reactive, App, inject } from 'vue'

export interface StoreOpts {
  getters?: { [key: string]: Function }
  state?: { [key: string]: any }
  mutations?: { [key: string]: Function }
  actions?: { [key: string]: Function }
  modules?: { [key: string]: StoreOpts }
}
interface ModulesRoot {
  [key: string]: Modules
}
interface Modules {
  _raw: StoreOpts,
  state: object,
  _children: ModulesRoot
}

type State<U extends StoreOpts> = { [P in keyof U['modules']]: State<U['modules'][P]> } & U['state']
type Getters<U extends StoreOpts> = { [Z in keyof (U['modules'][keyof U['modules']]['getters'])]: Getters<U['modules'][keyof U['modules']]>[Z] } & U['getters']
type Mutations<U extends StoreOpts> = { [Z in keyof (U['modules'][keyof U['modules']]['mutations'])]: Mutations<U['modules'][keyof U['modules']]> } & U['mutations']
type Actions<U extends StoreOpts> = { [Z in keyof (U['modules'][keyof U['modules']]['actions'])]: Mutations<U['modules'][keyof U['modules']]> } & U['actions']
const installModules = (store: Store<StoreOpts>, state: object, path: string[], rootModules: Modules) => {
  if (path.length > 0) {
    let parent = path.slice(0, -1).reduce((state, current): object => {
      return state[current]
    }, state)
    parent[path[path.length - 1]] = rootModules.state
  }

  let { getters, mutations, actions } = rootModules._raw
  getters && (Object.keys(getters).forEach((getter: string) => {
    Object.defineProperty(store.getters, getter, {
      get() {
        return getters[getter](rootModules.state)
      }
    })
  }))
  // let { mutations } = rootModules._raw
  mutations && (Object.keys(mutations).forEach(mutation => {
    let arr = store.mutations[mutation] || (store.mutations[mutation] = [])
    arr.push((...params: any[]) => { mutations[mutation](rootModules.state, ...params) })
  }))
  // let { actions} = rootModules._raw
  actions && (Object.keys(actions).forEach(action => {
    let arr = store.actions[action] || (store.actions[action] = [])
    arr.push((...params: any[]) => { actions[action](store, ...params) })
  }))
  if (rootModules._children) {
    Object.keys(rootModules._children).forEach(moduleName => {
      installModules(store, state, path.concat(moduleName), rootModules._children[moduleName])
    })
  }
}
class collectionModules {

  _root: Modules
  constructor(opts: StoreOpts) {
    this._root = {
      _raw: {},
      state: reactive({}),
      _children: {}
    }
    this.register([], opts)
  }
  register(path: string[], rootModules: StoreOpts) {
    let newModules = {
      _raw: rootModules,
      state: reactive(rootModules.state || Object.create(null)),
      _children: Object.create(null)
    }
    if (path.length === 0) {
      this._root = newModules
    } else {
      let parent = path.slice(0, -1).reduce((root: Modules, current: string): Modules => {
        return root._children[current]
      }, this._root)
      parent._children[path[path.length - 1]] = newModules
    }
    if (rootModules.modules) {
      Object.keys(rootModules.modules).forEach((moduleName: string) => {
        this.register(path.concat(moduleName), rootModules.modules[moduleName])
      })
    }
  }
}
export class Store<T extends StoreOpts> {

  getters: Getters<T>
  state: State<T>
  mutations: { [K in keyof Mutations<T>]: Function[] }
  actions: { [K in keyof Actions<T>]: Function[] }
  modules: collectionModules

  constructor(opts: T) {
    // API:
    if (opts === void 0) return
    this.getters = Object.create(null)
    this.mutations = Object.create(null)
    this.actions = Object.create(null)
    this.modules = new collectionModules(opts)
    this.state = reactive(opts.state) as State<T>
    installModules(this, this.state, [], this.modules._root)
  }
  commit = (type: keyof Mutations<T>, ...params: any[]) => {
    this.mutations[type].forEach(callback => {
      callback(...params)
    })
  }

  dispatch = (type: keyof Actions<T>, ...params: any[]) => {

    this.actions[type].forEach(callback => {
      callback(...params)
    })
  }
  private install = (app: App) => {
    let _this = this
    app.provide('store', _this)
  }


}
export const createStore = <T extends StoreOpts>(opts: T) => {
  return new Store<T>(opts)
}

export const useStore = () => {
  return inject('store')
}

// const mapMutations=()=>{}


