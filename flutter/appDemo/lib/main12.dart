import 'package:appDemo/components/tabbar.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

main(List<String> args) {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return MaterialApp(
      title: '豆瓣',
      theme: ThemeData(
          primaryColor: Colors.green,
          highlightColor: Colors.transparent,
          splashColor: Colors.transparent),
      home: MyTabbar(),
    );
  }
}
