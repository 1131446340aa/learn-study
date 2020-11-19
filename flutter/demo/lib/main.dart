import 'package:demo/components/ListView1.dart';
import 'package:flutter/material.dart';
import 'package:demo/components/SearchBar.dart';

main(List<String> args) {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: List1(),
        appBar: AppBar(),
      ),
      title: '1321',
    );
  }
}
