import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

main(List<String> args) {
  runApp(MyStateLessWeight());
}

class MyStateLessWeight extends StatelessWidget {
  @override
  build(BuildContext context) {
    return HomeContent();
  }
}

class HomeContent extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return HomeContentState();
  }
}

class HomeContentState extends State<HomeContent> {
  ScrollController scrollController;
  bool isShowTop = false;
  @override
  void initState() {
    // TODO: implement initState
    scrollController = ScrollController();

    scrollController.addListener(() {
      bool tempShowTop = scrollController.offset > 1000;
      if (tempShowTop != isShowTop) {
        setState(() {
          isShowTop = tempShowTop;
        });
      }
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build

    return MaterialApp(
        home: Scaffold(
      appBar: AppBar(
        title: Text('listview'),
      ),
      body: MyHomeNotificationDemo(),
      // floatingActionButton: !isShowTop
      //     ? null
      //     : FloatingActionButton(
      //         onPressed: () {
      //           scrollController.animateTo(0,
      //               duration: Duration(seconds: 1), curve: Curves.ease);
      //         },
      //         child: Icon(Icons.arrow_upward),
      //       ),
    ));
  }
}

class MyHomeNotificationDemo extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => MyHomeNotificationDemoState();
}

class MyHomeNotificationDemoState extends State<MyHomeNotificationDemo> {
  int _progress = 0;

  @override
  Widget build(BuildContext context) {
    return NotificationListener(
      onNotification: (ScrollNotification notification) {
        // 1.判断监听事件的类型
        if (notification is ScrollStartNotification) {
          print("开始滚动.....");
        } else if (notification is ScrollUpdateNotification) {
          // 当前滚动的位置和总长度
          final currentPixel = notification.metrics.pixels;
          final totalPixel = notification.metrics.maxScrollExtent;
          double progress = currentPixel / totalPixel;
          setState(() {
            _progress = (progress * 100).toInt();
          });
          print(
              "正在滚动：${notification.metrics.pixels} - ${notification.metrics.maxScrollExtent}");
        } else if (notification is ScrollEndNotification) {
          print("结束滚动....");
        }
        return false;
      },
      child: Stack(
        alignment: Alignment(.9, .9),
        children: <Widget>[
          ListView.builder(
              itemCount: 100,
              itemExtent: 60,
              itemBuilder: (BuildContext context, int index) {
                return ListTile(title: Text("item$index"));
              }),
          CircleAvatar(
            radius: 30,
            child: Text("$_progress%"),
            backgroundColor: Colors.black54,
          )
        ],
      ),
    );
  }
}
