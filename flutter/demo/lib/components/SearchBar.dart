import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class Search extends StatefulWidget {
  @override
  _SearchState createState() => _SearchState();
}

class _SearchState extends State<Search> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: Container(
        // color: Colors.grey,
        height: 34,
        // padding: EdgeInsets.all(8.0),
        decoration: BoxDecoration(
            color: Colors.white, borderRadius: BorderRadius.circular(17)),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.arrow_back_ios,
              color: Colors.grey,
              size: 24,
            ),
            Expanded(
                flex: 1,
                child: TextField(
                    // controller: TextEditingController(),
                    // onChanged: _onChanged,
                    autofocus: true,
                    style: TextStyle(
                        fontSize: 16.0,
                        color: Colors.black,
                        fontWeight: FontWeight.w300),
                    //输入文本的样式
                    decoration: InputDecoration(
                      border: InputBorder.none,
                      contentPadding:
                          Theme.of(context).platform == TargetPlatform.iOS
                              ? EdgeInsets.fromLTRB(4, 0, 4, 15)
                              : EdgeInsets.fromLTRB(4, 0, 4, 15),
                      hintText: '',
                      hintStyle: TextStyle(
                        fontSize: 14,
                        color: Colors.grey,
                      ),
                    )))
          ],
        ),
      ),
    );
  }
}
