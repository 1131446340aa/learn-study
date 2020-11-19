import 'package:appDemo/components/dashedLine.dart';
import 'package:appDemo/components/star.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

main(List<String> args) {
  runApp(MyStateLessWeight());
}

class MyStateLessWeight extends StatelessWidget {
  @override
  build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(
            appBar: AppBar(title: Text('122')),
            body: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                  children: [
                    StartRating(
                      rating: 7,
                    ),
                    Container(
                      width: 10,
                      height: 100,
                      child: DashedLine(
                          axis: Axis.vertical, color: Colors.purple, count: 1),
                      color: Colors.pink,
                    )
                  ],
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start),
            )));
  }
}
