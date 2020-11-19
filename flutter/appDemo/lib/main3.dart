import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

main(List<String> args) {
  runApp(MyStateLessWeight());
}

class MyCountWeight extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    print('createState');
    return MyCountState();
  }
}

class MyStateLessWeight extends StatelessWidget {
  @override
  build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(appBar: AppBar(title: Text('计算器')), body: MyCountWeight()),
      theme: ThemeData(primaryColor: Colors.blueAccent),
    );
  }
}

class MyCountState extends State<MyCountWeight> {
  int counter = 0;
  @override
  // 生命周期
  void initState() {
    //类比mounted
    // TODO: implement initState
    print('initState');
    super.initState();
  }

  @override
  void didChangeDependencies() {
    //类比update
    // TODO: implement didChangeDependencies
    print('didChangeDependencies');
    super.didChangeDependencies();
  }

  @override
  void dispose() {
    //类比 destory
    // TODO: implement dispose
    print('dispose');
    super.dispose();
  }

  @override
  void didUpdateWidget(covariant MyCountWeight oldWidget) {
    // TODO: implement didUpdateWidget
    print('didUpdateWidget');
    super.didUpdateWidget(oldWidget);
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    print('build');
    return Center(
        child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            RaisedButton(
                onPressed: () {
                  setState(() {
                    counter += 1;
                  });
                },
                color: Colors.redAccent,
                child: Text('+1',
                    style: TextStyle(fontSize: 18, color: Colors.white))),
            RaisedButton(
                onPressed: () {
                  setState(() {
                    counter -= 1;
                  });
                },
                color: Colors.redAccent,
                child: Text('-1',
                    style: TextStyle(fontSize: 18, color: Colors.white)))
          ],
        ),
        Text('$counter',
            style: TextStyle(fontSize: 20), textDirection: TextDirection.ltr),
      ],
    ));
  }
}
