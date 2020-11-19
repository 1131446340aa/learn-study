function test() {
  let obj = { a: 4, b: 6 };
  with (obj) {
    var a = 3;
    b = 6;
  }
  console.log(a);
}
test();
