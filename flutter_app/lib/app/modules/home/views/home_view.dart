import 'package:flutter/material.dart';
import 'package:flutter_app/app/modules/home/controllers/home_controller.dart';
import 'package:flutter_app/app/modules/home/widgets/category_list.dart';
import 'package:get/get.dart';
import 'package:logger/logger.dart';
import 'package:sidebarx/sidebarx.dart';
import 'package:sizer/sizer.dart';

import '../../../widgets/custom_app_bar.dart';
import '../../../widgets/custom_drawer.dart';

class HomeView extends StatelessWidget {
  HomeView({Key? key}) : super(key: key);

  final logger = Logger();

  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  HomeController homeController = Get.put(HomeController());

  @override
  Widget build(BuildContext context) {

    return SafeArea(
      child: Scaffold(
        backgroundColor: Colors.blueGrey[700],
        key: _scaffoldKey,

        //region✅ drawer
        drawer: CustomDrawer(
          controller: SidebarXController(selectedIndex: 0, extended: true),
        ),
        // endregion

        //region✅ appbar
        appBar: CustomAppBar(
          bgColor: Colors.blueGrey.shade200,
          scaffoldKey: _scaffoldKey,
          title: Image.asset(
            "assets/images/logo.png",
            fit: BoxFit.cover,
            height: 7.h,
          ),
        ),
        // endregion

        //region ✅ Body
        body: Obx(() {
          // ✅ Check if categories are loading
          if (homeController.isLoading.value) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }

          // ✅ Check if categories list is empty
          if (homeController.categories.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.category_outlined,
                    size: 80,
                    color: Colors.white.withOpacity(0.5),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'No categories available',
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.white.withOpacity(0.7),
                    ),
                  ),
                ],
              ),
            );
          }

          // ✅ Display categories in a grid
          return Padding(
            padding: const EdgeInsets.all(16.0),
            child: GridView.builder(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2, // 2 columns
                childAspectRatio: 0.85,
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
              ),
              itemCount: homeController.categories.length,
              itemBuilder: (context, index) {
                final category = homeController.categories[index];

                return CategoryList(
                  categoryName: category!.name,
                  categoryIcon: category.icon ?? "",
                  onTap: () {
                    logger.f(category.id);
                    // Navigate to category products
                    //Get.toNamed('/products', arguments: {'categoryId': category.id});
                  },
                );
              },
            ),
          );
        }),
        //endregion
      ),
    );
  }
}
