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
    return Column(
      children: [
        Align(
          child: Icon(
            Icons.pets,
          ),
          widthFactor: 3,
          heightFactor: 3,
        ),
        Padding(
          padding: const EdgeInsets.only(left: 40),
          child: Container(
            width: 150,
            height: 150,
            decoration: BoxDecoration(
                color: Colors.red, border: Border.all(color: Colors.orange)),
          ),
        ),
        Stack(children: [
          Container(width: 300, height: 300, color: Colors.orange),
          Positioned(
            left: 20,
            top: 20,
            child: Text(
              '456',
              textDirection: TextDirection.ltr,
            ),
          ),
          Positioned(
            right: 20,
            bottom: 20,
            child: Text(
              '456',
              textDirection: TextDirection.ltr,
            ),
          )
        ])
      ],
    );
  }
}
