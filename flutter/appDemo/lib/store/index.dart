import 'package:flutter/material.dart';

class HYDataWidget extends InheritedWidget {
  final int counter;

  HYDataWidget({this.counter, Widget child}) : super(child: child);

  static HYDataWidget of(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType();
  }

  @override
  bool updateShouldNotify(HYDataWidget oldWidget) {
    return this.counter != oldWidget.counter;
  }
}
