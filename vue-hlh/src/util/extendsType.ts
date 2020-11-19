type Noop<T> = () => T

interface IsBelongsClass {
  isString: boolean
  isBoolean: boolean
  isPromise: boolean
  isMap: boolean
  isSet: boolean
  isSymbol: boolean
  isObject: boolean
  isArray: boolean
  isNumber: boolean
  isDate: boolean
}

interface String extends IsBelongsClass {
  runtimeType: 'string'
}

interface Object extends IsBelongsClass {
  runtimeType: 'object'
}

interface Array<T> extends IsBelongsClass {
  runtimeType: 'array'
}

interface Number extends IsBelongsClass {
  runtimeType: 'number'
}

interface Date extends IsBelongsClass {
  runtimeType: 'date'
}


interface Symbol extends IsBelongsClass {
  runtimeType: 'symbol'
}
interface Boolean extends IsBelongsClass {
  runtimeType: 'boolean'
}
interface Map<K, V> extends IsBelongsClass {
  runtimeType: 'map'
}
interface Set<T> extends IsBelongsClass {
  runtimeType: 'set'
}

interface Promise<T> extends IsBelongsClass {
  runtimeType: 'promise'
}