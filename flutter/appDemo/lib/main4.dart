import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

main(List<String> args) {
  runApp(MyStateLessWeight());
}

class MyStateLessWeight extends StatelessWidget {
  @override
  build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(appBar: AppBar(title: Text('122')), body: HomeBody()));
  }
}

class HomeBody extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Container(
      margin: EdgeInsets.only(top: 40),
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 30),
            child: Text(
              "《定风波》 苏轼 \n莫听穿林打叶声，何妨吟啸且徐行。\n竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。",
              style: TextStyle(fontSize: 20, color: Colors.purple),
              textAlign: TextAlign.center,
            ),
          ),
          Row(children: [
            FloatingActionButton(onPressed: null),
            FlatButton(onPressed: null, child: Text('1')),
            OutlineButton(onPressed: null),
          ]),
          Row(
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(20),
                child: Image.network(
                  "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3981042500,3690605400&fm=26&gp=0.jpg",
                  width: 200,
                ),
              )
            ],
          ),
          TextFiledDemo()
        ],
      ),
    );
  }
}

class TextFiledDemo extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return TextFileState();
  }
}

class TextFileState extends State<TextFiledDemo> {
  final textEditingController = TextEditingController();
  @override
  void initState() {
    // TODO: implement initState

    super.initState();
    textEditingController.text = "1233";
    textEditingController.addListener(() {
      print('textEditingController');
    });
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return TextField(
      onChanged: (val) {},
      onSubmitted: (val) {},
      decoration: InputDecoration(
        // border: InputBorder.none,
        // labelText: 'userName',r
        hintText: "用户名",

        // icon: Icon(Icons.people)
      ),
    );
  }
}
