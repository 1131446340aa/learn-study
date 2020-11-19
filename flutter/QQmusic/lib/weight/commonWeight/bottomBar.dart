import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../IndexWeight/indexWeightBody.dart';

class BottomBar extends StatefulWidget {
  BottomBar({Key key}) : super(key: key);

  @override
  _BottomBarState createState() => _BottomBarState();
}

class _BottomBarState extends State<BottomBar> {
  final List<BottomNavigationBarItem> bottomBars = [
    BottomNavigationBarItem(icon: Icon(CupertinoIcons.home), label: "首页"),
    BottomNavigationBarItem(icon: Icon(CupertinoIcons.search), label: "分类"),
    BottomNavigationBarItem(
        icon: Icon(CupertinoIcons.shopping_cart), label: "购物车"),
    BottomNavigationBarItem(
        icon: Icon(CupertinoIcons.profile_circled), label: "会员中心")
  ];
  int currentIndex = 0;
  List TabBodies = [];
  var currentPage;
  @override
  void initState() {
    currentPage = TabBodies[0];
    // TODO: implement initState
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexBody(),
      bottomNavigationBar: BottomNavigationBar(
        items: bottomBars,
        currentIndex: currentIndex,
        onTap: (index) {
          setState(() {
            currentPage = TabBodies[index];
            currentIndex = index;
          });
        },
        type: BottomNavigationBarType.fixed,
      ),
    );
  }
}
