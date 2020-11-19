function Parent() {}

function Child() {
  Parent.call(this);
}

let c = new Child();

let p = new Parent();

Child.prototype = Object.create(Parent.prototype);

Child.prototype.constructor = child;
