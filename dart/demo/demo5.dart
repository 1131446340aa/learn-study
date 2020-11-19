main(List<String> args) {
  Future(() => {print(1)}).then((value) {
    Future(() {
      print(5);
    });
    print(3);
  }).then((value) {
    print(4);
  });
  var x = Future(() => null);
  Future(() {
    print(6);
  }).then((value) {
    print(7);
  });
  x.then((value) {
    print(8);
  });
  print(2);
}
