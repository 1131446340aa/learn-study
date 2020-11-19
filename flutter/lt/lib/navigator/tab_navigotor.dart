import 'package:flutter/material.dart';
import 'package:lt/pages/home_page.dart';
import 'package:lt/pages/my_page.dart';
import 'package:lt/pages/search_page.dart';
import 'package:lt/pages/travel_page.dart';

class TabNavigator extends StatefulWidget {
  @override
  _TabNavigatorState createState() => _TabNavigatorState();
}

class _TabNavigatorState extends State<TabNavigator> {
  final PageController _controller = PageController();
  int index = 0;

  @override
  Widget build(BuildContext context) {
    final List<Map<String, Object>> tabbar = [
      {
        "name": "首页",
        "icon": Icons.home,
        "color": index != 0 ? Colors.grey : Colors.blue
      },
      {
        "name": "搜索",
        "icon": Icons.search,
        "color": index != 1 ? Colors.grey : Colors.blue
      },
      {
        "name": "旅拍",
        "icon": Icons.camera_alt,
        "color": index != 2 ? Colors.grey : Colors.blue
      },
      {
        "name": "我的",
        "icon": Icons.circle,
        "color": index != 3 ? Colors.grey : Colors.blue
      }
    ];
    return Scaffold(
      body: PageView(
        controller: _controller,
        children: [HomePage(), SearchPage(), TravelPage(), MyPage()],
      ),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        items: tabbar.map((tabbarItem) {
          return BottomNavigationBarItem(
              icon: Icon(tabbarItem['icon'], color: tabbarItem['color']),
              title: Text(
                tabbarItem['name'],
                style: TextStyle(color: tabbarItem['color']),
              ));
        }).toList(),
        onTap: (_index) {
          setState(() {
            index = _index;
          });
          _controller.jumpToPage(index);
        },
      ),
    );
  }
}
