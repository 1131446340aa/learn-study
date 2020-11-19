import 'dart:io';

main(List<String> args) {
  // print(2);
  // getNetWork().then((value) {
  //   print(value);
  // }).then((value) => null);
  // print(3);
  // Future.value(3).then((value) => {print(value)});
  test() async {
    var x = await Future.delayed(Duration(seconds: 3), () => 'new');
    print(x);
    print(123);
    return x;
  }

  test().then((value) {
    print(value);
  });
}

Future getNetWork() {
  return Future<String>(() {
    print(1);
    sleep(Duration(seconds: 3));
    return Future(() {
      return 'w';
    });
  });
}
