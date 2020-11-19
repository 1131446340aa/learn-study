main(List<String> args) {
  SuperMan superMan = new SuperMan();
  SuperMan.name;
}

abstract class Animal {
  eat();
}

class Person extends Animal {
  @override
  eat() {}
}

mixin Flyer {
  flyer() {}
}

mixin Run {
  run() {}
}

class SuperMan with Flyer, Run {
  static String name = 'a';
}
