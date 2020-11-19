

interface Array<T> {
  derangement: Noop<T>
  order: Noop<T>
  reverseOrder: Noop<T>
  union: Noop<T>
  intersect: Noop<T>
  diff: Noop<T>
  toObject: (keysArray: Array<any>) => object
  getObjectValues: (keys: string[]) => [] | [][]
  arrayObjectToObject: (key: string | number | symbol, value: string | number | symbol) => object
}