String.prototype.firstUpperCase = function () {
  return this.replace(/^\S/, s => s.toUpperCase())
}
