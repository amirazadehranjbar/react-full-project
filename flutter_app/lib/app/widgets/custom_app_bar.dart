import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {

  final dynamic title;
  final Color bgColor;
  final GlobalKey<ScaffoldState> scaffoldKey;


  const CustomAppBar({
    super.key,
    required this.title,
    required this.bgColor,
    required this.scaffoldKey,

  });



  @override
  Size get preferredSize => Size.fromHeight(7.h); // Custom height
  @override
  Widget build(BuildContext context) {
    return AppBar(

      backgroundColor: bgColor,

      //⭐ title
      title: title,
      centerTitle: true,


      // ⭐ leading
      leading: IconButton(
        icon: const Icon(Icons.menu),
          onPressed: () => scaffoldKey.currentState!.openDrawer()
      ),


      //⭐ actions
      actions: <Widget>[
        IconButton(
          icon: const Icon(Icons.search),
          onPressed: () {
            // Handle search button press
          },
        ),
        IconButton(
          icon: const Icon(Icons.more_vert),
          onPressed: () {
            // Handle more options button press
          },
        ),
      ],


      //⭐

    );
  }

}
