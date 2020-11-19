function runTimeType(target) {
  return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
}

function clone(target) {
  let parent = [];

  let children = [];

  function _clone(target) {
    let child = null;
    let map = {
      symbol: () => {
        child = Symbol(target.description);
      },
      date: () => {
        child = new Date(Date.parse(target));
      },
      set: () => {
        child = new Set();
      },
      map: () => {
        child = new Map();
      },
      object: () => {
        child = Object.create(Object.getPrototypeOf(target));
      },
      array: () => {
        child = [];
      },
      regexp: () => {
        child = new RegExp(target.source, target.flags);
      },
      function: () => {
        child = eval(target.toString());
      }
    };
    if (typeof target !== 'object' && typeof target !== 'function' && typeof target !== 'symbol') {
      return target;
    } else {
      map[runTimeType(target)]();
      const index = parent.indexOf(target);

      if (index !== -1) return children[index];
      parent.push(target);
      children.push(child);
      // 如果为set
      if (runTimeType(target) === 'set') {
        for (let item of target.keys()) {
          child.add(_clone(item));
        }
      } else if (runTimeType(target) === 'map') {
        // 如果为map
        for (let item of target.keys()) {
          child.set(item, _clone(target.get(item)));
        }
      } else if (runTimeType(target) === 'object' || runTimeType(target) === 'array') {
        Reflect.ownKeys(target).forEach(item => {
          //递归调用
          child[item] = _clone(target[item]);
        });
      }
      return child;
    }
  }
  return _clone(target);
}
let xx = Symbol('xx');
function person(name) {
  this.name = name;
}

const HuangLiHao = new person('HuangLiHao');
let a = {
  x: HuangLiHao,
  y: 5,
  c: new Date(),
  [xx]: 4,
  c3: a => {},
  s: Symbol('ss'),
  q: new Set([ 1, 3, 4 ]),
  m: new Map([ [ 8, Symbol('ss') ], [ 3, 5 ] ]),
  z: {}
};
a.z.a = a.m;
