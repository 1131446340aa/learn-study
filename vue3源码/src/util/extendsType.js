import './String'
import './Array'
let classArray = [
  [Symbol, 'symbol'],
  [Object, 'object'],
  [Number, 'number'],
  [Array, 'array'],
  [Date, 'date'],
  [Promise, 'promise'],
  [Map, 'map'],
  [Set, 'set'],
  [Boolean, 'boolean'],
  [String, 'string']
]
//增加runtimeType属性和isClass属性
//Class 代表原生类
classArray.forEach(classArrayItem => {
  let [classType, stringType] = classArrayItem
  classType.prototype.runtimeType = stringType
  classArray.forEach(classArrayItemLv2 => {
    classType.prototype[`is${classArrayItemLv2[1].firstUpperCase()}`] =
      stringType === classArrayItemLv2[1]
  })
})
