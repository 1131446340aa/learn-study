import 'dart:developer';

void main(List<String> args) {
  String myAge = test('5');
  List<int> list = [1, 2, 3, 4];
  list.removeAt(2);
  Set<int> set = {1, 2, 3, 4};
  set.remove(3);
  Map<String, int> map = {'name': 3};
  Object obj = 3;
  print(obj.runtimeType);
  print(map['name']);
  print(set);
  print(list);
  print(myAge.runtimeType);
  Dart dart = new Dart(3);
  dart.name = '213';
  dart.eat();
  print(dart.toString());
  Dart dart2 = new Dart.reWrite(4);
  dart2.eat();
  print(dart2.height);
  Person per = const Person('huang');
  print(per.name);
  Animal an = Animal('12121');
  print(an.animalName);
}

T test<T>(T age) {
  return age;
}

class Dart {
  var name = 'hua';
  String height;
  int age;
  Dart(this.age);
  Dart.reWrite(this.age) : height = "21";

  eat() {
    print(this.name);
    print(age);
  }
}

class Person {
  final name;
  const Person(this.name);
}

class Animal {
  String animalName;
  static Map<String, Animal> _cach = {};
  factory Animal(String animalName) {
    if (_cach.containsKey(animalName)) {
      return _cach[animalName];
    } else {
      return _cach[animalName] = Animal.an(animalName);
    }
  }
  Animal.an(this.animalName);
}
