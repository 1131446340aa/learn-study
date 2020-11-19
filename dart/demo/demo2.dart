main(List<String> args) {
  Person animal = new Person('s');
  animal.name;
}

class Animal {
  String name;
  Animal(this.name);
  run() {
    print('1');
  }
}

class Person extends Animal {
  Person(String name) : super(name);
  @override
  run() {
    print(2);
  }
}
