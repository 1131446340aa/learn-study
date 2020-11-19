import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';
import 'package:lt/Dio/index.dart';
import 'package:lt/model/HomeDate.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  void initState() {
    super.initState();
    _handleRefresh();
    // SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle.light);
  }

  @override
  List<BannerList> listImageUrl = [];
  Future<Null> _handleRefresh() async {
    HomeDate homeModel = await HomeDao.fetch();
    // print(homeModel.bannerList[0].icon);
    try {
      setState(() {
        // localNavList = homeModel.localNavList;
        // gridNavModel = homeModel.gridNav;
        // subNavList = homeModel.subNavList;
        // salesBoxModel = homeModel.salesBox;
        listImageUrl = homeModel.bannerList;
        // print(listImageUrl[0].icon);
        // _isLoading = false;
      });
    } catch (e) {}

    return null;
  }

  double AppbarAlpha = 0;
  _onScroll(offset) {
    // print(offsert);
    double Alpha = offset / 100;
    if (Alpha < 0) {
      Alpha = 0;
    } else if (Alpha > 1) {
      Alpha = 1;
    } else {
      setState(() {
        AppbarAlpha = Alpha;
      });
    }
  }

  Widget build(BuildContext context) {
    // print(listImageUrl[0]);
    return Scaffold(
        body: Stack(children: [
      MediaQuery.removePadding(
        removeTop: true,
        context: context,
        child: NotificationListener(
          onNotification: (scrollNotification) {
            if (scrollNotification is ScrollUpdateNotification &&
                scrollNotification.depth == 0) {
              _onScroll(scrollNotification.metrics.pixels);
            }
          },
          child: ListView(
            children: [
              Container(
                  height: 160,
                  child: Swiper(
                    itemCount: 6,
                    autoplay: true,
                    itemBuilder: (BuildContext context, int index) {
                      if (listImageUrl.length != 0) {
                        return Image.network(listImageUrl[index].icon,
                            fit: BoxFit.fill);
                      }
                    },
                    pagination: SwiperPagination(),
                  )),
              Container(
                child: Text('${listImageUrl.length}'),
                height: 800,
              )
            ],
          ),
        ),
      ),
      Opacity(
        opacity: AppbarAlpha,
        child: Container(
          height: 80,
          decoration: BoxDecoration(color: Colors.white),
          child: Center(
            child: Padding(
              padding: const EdgeInsets.only(top: 20.0),
              child: Text('1'),
            ),
          ),
        ),
      )
    ]));
  }
}
