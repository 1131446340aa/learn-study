import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

main(List<String> args) {
  runApp(MyStateLessWeight());
}

class MyStateLessWeight extends StatelessWidget {
  @override
  build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(appBar: AppBar(title: Text('122')), body: HomeContent()),
      theme: ThemeData(primaryColor: Colors.blueAccent),
    );
  }
}

class HomeContent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    final List list = [
      {
        'title': 'apple1',
        "desc": 'desc1',
        "imageUrl":
            "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3981042500,3690605400&fm=26&gp=0.jpg"
      },
      {
        'title': 'apple1',
        "desc": 'desc1',
        "imageUrl":
            "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3981042500,3690605400&fm=26&gp=0.jpg"
      },
      {
        'title': 'apple1',
        "desc": 'desc1',
        "imageUrl":
            "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3981042500,3690605400&fm=26&gp=0.jpg"
      }
    ];
    var x = list.map((e) {
      return ProductionItem(e['title'], e['desc'], e['imageUrl']);
    }).toList();
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: ListView(children: x),
    );
  }
}

class ProductionItem extends StatelessWidget {
  final String title;
  final String desc;
  final String imageUrl;
  ProductionItem(this.title, this.desc, this.imageUrl);
  @override
  build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(20),
      decoration: BoxDecoration(border: Border.all()),
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(title, style: TextStyle(fontSize: 24)),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(desc, style: TextStyle(fontSize: 16)),
          ),
          Image.network(imageUrl)
        ],
      ),
    );
  }
}
