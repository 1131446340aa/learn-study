import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

main(List<String> args) {
  runApp(MyStateLessWeight());
}

class MyStateLessWeight extends StatelessWidget {
  @override
  build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(
            appBar: AppBar(title: Text('122')),
            body: Padding(
              padding: const EdgeInsets.all(20.0),
              child: MyForm(),
            )));
  }
}

class MyForm extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return FormState();
  }
}

class FormState extends State<MyForm> {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Form(
      child: Column(
        children: [
          SizedBox(height: 50),
          TextFormField(
            decoration:
                InputDecoration(icon: Icon(Icons.people), labelText: '用户名或手机号'),
          ),
          TextFormField(
            decoration:
                InputDecoration(icon: Icon(Icons.lock), labelText: '密码'),
          ),
          SizedBox(height: 50),
          Container(
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: RaisedButton(
                  onPressed: null,
                  color: Colors.lightGreen,
                  child: Text('注册',
                      style: TextStyle(fontSize: 20, color: Colors.white))),
            ),
            height: 84,
            width: double.infinity,
          )
        ],
      ),
    );
  }
}
