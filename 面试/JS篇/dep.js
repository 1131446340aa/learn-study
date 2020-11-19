class Dep {
  constructor() {
    this.dep = {};
  }
  buy(type, fn) {
    if (!this.dep[type]) this.dep[type] = [];
    this.dep[type].push(fn);
  }
  sale(type, ...args) {
    this.dep[type] &&
      this.dep.type.forEach(fn => {
        fn(...args);
      });
  }
}

const ming = new Dep();
