import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class StartRating extends StatefulWidget {
  final double rating;
  final double maxRating;
  final Widget unSelectdImage;
  final Widget selectImage;
  final int count;
  final double size;
  final Color unSelectedColor;
  final Color selectColor;
  StartRating({
    @required this.rating,
    this.maxRating = 10,
    this.size = 30,
    Widget unSelectdImage,
    Widget selectImage,
    this.unSelectedColor = const Color(0xffbbbbbb),
    this.selectColor = const Color(0xffe0aa46),
    this.count = 5,
  })  : unSelectdImage = unSelectdImage ??
            Icon(
              Icons.star,
              color: unSelectedColor,
              size: size,
            ),
        selectImage = selectImage ??
            Icon(
              Icons.star,
              color: selectColor,
              size: size,
            );
  @override
  StartRatingState createState() {
    // TODO: implement createState
    return StartRatingState();
  }
}

class StartRatingState extends State<StartRating> {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Container(
      child: Stack(
        children: [
          Row(children: getUnSelectImage(), mainAxisSize: MainAxisSize.min),
          Row(children: getSelectImage(), mainAxisSize: MainAxisSize.min),
        ],
      ),
    );
  }

  List<Widget> getUnSelectImage() {
    return List.generate(widget.count, (index) => widget.unSelectdImage);
  }

  List<Widget> getSelectImage() {
    double oneValue = widget.maxRating / widget.count;
    int entireCount = (widget.rating / oneValue).floor();
    double leftValue = widget.rating - entireCount * oneValue;
    double leftRatio = leftValue / oneValue;

    // 获取Star

    List<Widget> SelectedImages = [];
    for (int i = 0; i < entireCount; i++) {
      SelectedImages.add(widget.selectImage);
    }

    Widget leftStar = ClipRect(
        clipper: MyRectClipper(width: leftRatio * widget.size),
        child: widget.selectImage);
    SelectedImages.add(leftStar);

    return SelectedImages;
  }
}

class MyRectClipper extends CustomClipper<Rect> {
  final double width;
  MyRectClipper({this.width});
  @override
  Rect getClip(Size size) {
    // TODO: implement getClip
    return Rect.fromLTRB(0, 0, width, size.height);
  }

  @override
  bool shouldReclip(MyRectClipper oldClipper) {
    // TODO: implement shouldReclip
    return width != oldClipper.width;
  }
}
