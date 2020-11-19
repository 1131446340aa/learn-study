import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

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
  Widget build(BuildContext context) {
    // TODO: implement build
    return ListView.separated(
      itemCount: 100,
      separatorBuilder: (BuildContext context, int index) {
        return index % 2 == 0
            ? Divider(color: Colors.blue)
            : Divider(color: Colors.red);
      },
      itemBuilder: (BuildContext context, int index) {
        return ListTile(title: Text('标题$index'));
      },
    );
  }
}
