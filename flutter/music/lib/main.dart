import 'package:flutter/material.dart';
// import 'package:music/Best-Flutter-UI-Templates/best_flutter_ui_templates/lib/hotel_booking/hotel_home_screen.dart';
import 'package:flutter/material.dart';
import 'package:music/components/PopularCourseListView.dart';
import 'package:music/components/category_list_view.dart';
import 'package:music/components/courceInfo.dart';
import 'package:music/components/design_course_app_theme.dart';
import 'package:music/components/searchBar.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return MaterialApp(
      home: Home(),
      theme: ThemeData.light(),
    );
  }
}

class Home extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return HomeState();
  }
}

class HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return TopTabPage2();
  }
}

class TopTabPage2 extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => TopTabPage2State();
}

class TopTabPage2State extends State<TopTabPage2>
    with SingleTickerProviderStateMixin {
  TabController tabController;

  @override
  void initState() {
    super.initState();
    tabController = TabController(length: 3, vsync: this);
  }

  void moveTo() {
    Navigator.push<dynamic>(
      context,
      MaterialPageRoute<dynamic>(
        builder: (BuildContext context) => CourseInfoScreen(),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Color(0xffF5F5F5),
        centerTitle: false,
        brightness: Brightness.light,
        title: Container(
          child: TabBar(
            labelColor: Colors.black,
            labelStyle: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            // indicator: UnderlineTabIndicator(
            //   borderSide: BorderSide(
            //     width: 3.5,
            //     color: Color(0xff00cdd7),
            //   ),
            // ),
            indicatorColor: Color(0xff66CDAA),
            indicatorPadding: EdgeInsets.only(bottom: 6),
            labelPadding: EdgeInsets.all(0),
            indicatorWeight: 5,
            indicatorSize: TabBarIndicatorSize.label,
            tabs: [
              Tab(
                text: "推荐",
              ),
              Tab(
                text: "音乐馆",
              ),
              Tab(
                text: '听书',
              ),
            ],
            controller: tabController,
          ),
          width: MediaQuery.of(context).size.width / 1.5,
          // height: 200,
        ),
      ),
      body: TabBarView(
        children: [
          CustomScrollView(
            slivers: <Widget>[
              SliverAppBar(
                expandedHeight: 80.0,
                backgroundColor: Color(0xffF5F5F5),
                flexibleSpace: FlexibleSpaceBar(
                  background: GetSearchBarUI(),
                ),
              ),
              // new SliverGrid(
              //   gridDelegate: new SliverGridDelegateWithMaxCrossAxisExtent(
              //     maxCrossAxisExtent: 200.0,
              //     mainAxisSpacing: 10.0,
              //     crossAxisSpacing: 10.0,
              //     childAspectRatio: 4.0,
              //   ),
              //   delegate: new SliverChildBuilderDelegate(
              //     (BuildContext context, int index) {
              //       return new Container(
              //         alignment: Alignment.center,
              //         color: Colors.teal[100 * (index % 9)],
              //         child: new Text('grid item $index'),
              //       );
              //     },
              //     childCount: 10,
              //   ),
              // ),
              SliverFixedExtentList(
                itemExtent: 180.0,
                delegate: SliverChildBuilderDelegate(
                    (BuildContext context, int index) {
                  return getCategoryUI();
                }, childCount: 1),
              ),
              SliverFixedExtentList(
                itemExtent: 300.0,
                delegate: SliverChildBuilderDelegate(
                    (BuildContext context, int index) {
                  return getPopularCourseUI();
                }, childCount: 1),
              ),
            ],
          ),
          Container(child: Center(child: Text('自行车'))),
          GetSearchBarUI()
          // Container(child: Center(child: Text('自行车')))
        ],
        controller: tabController,
      ),
    );
  }

  Widget getPopularCourseUI() {
    return Padding(
      padding: const EdgeInsets.only(top: 8.0, left: 18, right: 16),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
            'Popular Course',
            textAlign: TextAlign.left,
            style: TextStyle(
              fontWeight: FontWeight.w600,
              fontSize: 22,
              letterSpacing: 0.27,
              color: DesignCourseAppTheme.darkerText,
            ),
          ),
          Flexible(
            child: PopularCourseListView(
              callBack: () {
                moveTo();
              },
            ),
          )
        ],
      ),
    );
  }

  Widget getCategoryUI() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        CategoryListView(
          callBack: () {
            moveTo();
          },
        ),
      ],
    );
  }

  @override
  void dispose() {
    tabController.dispose();
    super.dispose();
  }
}
