interface Function {
  myCall: (...args: any[]) => any
}

Function.prototype.myCall = function (...args) {
  let [_this, arg] = args;
  _this || (_this = globalThis);
  _this.fn = this;
  _this.fn(...arg);
  delete _this.fn;
};
