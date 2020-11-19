//首字母大写
String.prototype.firstUpperCase = function () {
  return this.replace(/^\S/, s => s.toUpperCase())
}
//首字母小写
String.prototype.firstLowerCase = function () {
  return this.replace(/^\S/, s => s.toLowerCase())
}
