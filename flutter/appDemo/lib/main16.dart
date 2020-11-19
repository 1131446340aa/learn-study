import 'package:event_bus/event_bus.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

final eventBus = EventBus();
main(List<String> args) {
  runApp(App());
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return MaterialApp(
      home: HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(
        appBar: AppBar(title: Text('122')),
        body: Column(
          children: [
            GestureDetector(
              child: Container(
                width: 200,
                height: 200,
                color: Colors.pink,
              ),
              onTapDown: (e) {
                print('down');
                eventBus.fire(UserInfo("why", 18));
              },
              onTapUp: (e) {
                print('up');
              },
            ),
            HYText()
          ],
        ));
  }
}

class HYText extends StatefulWidget {
  @override
  _HYTextState createState() => _HYTextState();
}

class UserInfo {
  String nickname;
  int level;
  UserInfo(this.nickname, this.level);
}

class _HYTextState extends State<HYText> {
  String message = "Hello Coderwhy";

  @override
  void initState() {
    super.initState();

    eventBus.on<UserInfo>().listen((data) {
      setState(() {
        message = "${data.nickname}-${data.level}";
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Text(
      message,
      style: TextStyle(fontSize: 30),
    );
  }
}
