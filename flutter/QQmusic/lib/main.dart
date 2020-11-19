import 'package:flutter/material.dart';
import './weight/commonWeight/bottomBar.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: MaterialApp(
        home: BottomBar(),
        title: '123',
      ),
    );
  }
}
