// import 'package:appDemo/store/index.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MultiProvider(
    providers: [
      ChangeNotifierProvider(create: (ctx) => CounterProvider()),
    ],
    child: App(),
  ));
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return MaterialApp(
      home: HYHomePage(),
    );
  }
}

class HYHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("列表测试"),
      ),
      body: Column(
        children: [
          Consumer<CounterProvider>(builder: (ctx, counterPro, child) {
            return Text(
              "当前计数:${counterPro.counter}",
              style: TextStyle(fontSize: 20, color: Colors.red),
            );
          }),
          RaisedButton(
            onPressed: () {
              Navigator.of(context)
                  .push(MaterialPageRoute(builder: (page) => SecondPage()));
            },
            child: Text('next'),
          )
        ],
      ),
      floatingActionButton: Selector<CounterProvider, CounterProvider>(
        selector: (ctx, provider) => provider,
        shouldRebuild: (pre, next) => false,
        builder: (ctx, counterPro, child) {
          return FloatingActionButton(
            child: child,
            onPressed: () {
              counterPro.counter += 1;
            },
          );
        },
        child: Icon(Icons.add),
      ),
    );
  }
}

class CounterProvider extends ChangeNotifier {
  int _counter = 100;
  int get counter {
    return _counter;
  }

  set counter(int value) {
    _counter = value;
    notifyListeners();
  }
}

class SecondPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    print('1');
    return Scaffold(
      appBar: AppBar(
        title: Text("第二个页面"),
      ),
      floatingActionButton: Consumer<CounterProvider>(
        builder: (ctx, counterPro, child) {
          return FloatingActionButton(
            child: child,
            onPressed: () {
              counterPro.counter += 1;
            },
          );
        },
        child: Icon(Icons.add),
      ),
    );
  }
}
