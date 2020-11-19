import 'package:appDemo/Dio/index.dart';

import 'package:http/http.dart' as http;
import 'dart:convert' as convert;
import 'package:dio/dio.dart';

main(List<String> args) {
  // dioNetwork();
  print(HttpRequest.request('/appapi.php',
      params: {'a': 'getPortalList', "catid": 20, "page": 1}));
}

httpnetWork() async {
  final client = http.Client();

  final url = Uri.parse(
      "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1");

  final response = await client.get(url);

  if (response.statusCode == 200) {
    print(response.body);
  } else {
    print(response.statusCode);
  }
}

void dioNetwork() async {
  final dio = Dio();
  final response = await dio.get(
      "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1");

  if (response.statusCode == 200) {
    print(convert.jsonDecode(response.data));
  } else {
    print("请求失败：${response.statusCode}");
  }
}
