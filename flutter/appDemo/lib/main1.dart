import 'package:flutter/material.dart';

main(List<String> args) {
  runApp(MyStateLessWeight());
}

class MyStateLessWeight extends StatelessWidget {
  @override
  build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(appBar: AppBar(title: Text('122')), body: HomeBody()));
  }
}

class HomeBody extends StatelessWidget {
  @override
  build(BuildContext context) {
    return Center(
        child: Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Checkbox(value: true, onChanged: (val) => print('hello click')),
        Text(
          '同意协议',
          textDirection: TextDirection.ltr,
          style: TextStyle(fontSize: 20),
        )
      ],
    ));
  }
}
