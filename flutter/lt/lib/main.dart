import 'package:flutter/material.dart';
import 'package:lt/navigator/tab_navigotor.dart';
import 'package:lt/pages/home_page.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: TabNavigator(),
    );
  }
}
