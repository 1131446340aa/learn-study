import 'package:flutter/cupertino.dart';
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
  Widget build(BuildContext context) {
    // TODO: implement build
    return GridView(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 3,
          crossAxisSpacing: 10,
          mainAxisSpacing: 10,
          childAspectRatio: 1.0),
      children: List.generate(100, (index) {
        return Container(
          color: Colors.purple,
          child: Text(
            'item $index',
            // style: TextStyle(height: 5),
          ),
          alignment: Alignment.topCenter,
        );
      }),
    );
  }
}
