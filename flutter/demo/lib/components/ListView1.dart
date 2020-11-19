import 'package:flutter/material.dart';

class List1 extends StatefulWidget {
  @override
  _List1State createState() => _List1State();
}

class _List1State extends State<List1> {
  @override
  Future _handleRefresh() async {
    // 延迟3秒后添加新数据， 模拟网络加载
    await Future.delayed(Duration(seconds: 3), () {
      setState(() {
        // _suggestions.clear();
        // _suggestions.addAll(generateWordPairs().take(20));        return _suggestions;
      });
    });
  }

  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: _handleRefresh,
      child: ListView.builder(
        itemCount: 20,
        itemExtent: 300,
        itemBuilder: (context, index) {
          return Row(
            children: [
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Container(
                  width: 100,
                  // height: 30,
                  decoration: BoxDecoration(
                      color: Colors.redAccent,
                      borderRadius: BorderRadius.circular(5)),
                ),
              ),
              Expanded(
                flex: 1,
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Container(
                      // color: Colors.pink,
                      child: Column(
                          children: List.generate(2, (index) {
                    return Expanded(
                      flex: 1,
                      child: Row(
                        children: List.generate(2, (index) {
                          return Expanded(
                            flex: 1,
                            child: Padding(
                                padding: EdgeInsets.all(20),
                                child: Container(
                                  child: Center(child: Text('1')),
                                  color: Colors.red,
                                )),
                          );
                        }),
                      ),
                    );
                  }))),
                ),
              )
            ],
          );
        },
      ),
    );
  }
}
