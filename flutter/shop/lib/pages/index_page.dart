import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shop/pages/Home_page.dart';
import 'package:shop/pages/cart_page.dart';
import 'package:shop/pages/catagory_page.dart';
import 'package:shop/pages/member_page.dart';

class Indexpage extends StatefulWidget {
  @override
  _IndexpageState createState() => _IndexpageState();
}

class _IndexpageState extends State<Indexpage> {
  final List<BottomNavigationBarItem> bottomBars = [
    BottomNavigationBarItem(icon: Icon(CupertinoIcons.home), label: "首页"),
    BottomNavigationBarItem(icon: Icon(CupertinoIcons.search), label: "分类"),
    BottomNavigationBarItem(
        icon: Icon(CupertinoIcons.shopping_cart), label: "购物车"),
    BottomNavigationBarItem(
        icon: Icon(CupertinoIcons.profile_circled), label: "会员中心")
  ];
  final List Tabbodies = [HomePage(), CatagoryPage(), CartPage(), MemberPage()];
  int currentIndex = 0;
  var currentPage;
  @override
  void initState() {
    currentPage = Tabbodies[0];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromARGB(244, 245, 245, 1),
      bottomNavigationBar: BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          currentIndex: currentIndex,
          items: bottomBars,
          onTap: (index) {
            setState(() {
              currentPage = Tabbodies[index];
              currentIndex = index;
            });
          }),
      body: currentPage,
    );
  }
}
