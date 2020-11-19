//乱序
Array.prototype.derangement = function () {
  return this.sort(() => Math.random() - 0.5)
}

//倒序
Array.prototype.reverseOrder = function () {
  return this.sort((a, b) => b - a)
}
//去重
Array.prototype.deDuplication = function () {
  Array.from(new Set(arr))
}

//并集
Array.prototype.union = function (...otherArray) {
  return Array.from(new Set([...this, ...otherArray.flat()]))
}
//交集
Array.prototype.intersect = function (anotherArray) {
  return Array.from(new Set([...this].filter(x => anotherArray.includes(x))))
}
//差集
Array.prototype.diff = function (anotherArray) {
  return Array.from(new Set([...this].filter(x => !anotherArray.includes(x))))
}

//数组转对象

Array.prototype.toObject = function (keysArray) {
  let obj = {}
  this.forEach((item, index) => {
    obj[keysArray[index]] = item
  })
  return obj
}

Array.prototype.getObjectValues = function (...keys) {
  let array = []
  if (keys.length === 1) {
    this.forEach(item => {
      array.push(item[keys[0]])
    })
  } else {
    this.forEach(item => {
      let arrayLv2 = []
      keys.forEach(itemLv2 => {
        arrayLv2.push(item[itemLv2])
      })
      array.push(arrayLv2)
    })
  }
  return array
}

Array.prototype.arrayObjectToObject = function (key, value) {
  let obj = {}
  this.forEach(item => {
    obj[item[key]] = item[value]
  })
  return obj
}
