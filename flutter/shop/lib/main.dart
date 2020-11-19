import 'package:flutter/material.dart';
import 'package:shop/pages/index_page.dart';

// import 'package:flutter/';
main(List<String> args) {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
        child: MaterialApp(
      title: '百姓生活',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(primaryColor: Colors.pink),
      home: Indexpage(),
    ));
  }
}
