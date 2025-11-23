// lib/app/routes/app_pages.dart
import 'package:get/get.dart';

import '../modules/auth/bindings/auth_binding.dart';
import '../modules/auth/views/login_view.dart';
import '../modules/auth/views/register_view.dart';
import '../modules/home/bindings/home_binding.dart';
import '../modules/home/views/home_view.dart';
import '../modules/cart/bindings/cart_binding.dart';
import '../modules/cart/views/cart_view.dart';
import '../modules/splash/views/splash_view.dart';
import 'app_routes.dart';

class AppPages {
  static const INITIAL = Routes.LOGIN;

  static final routes = [


    // ✅ Splash screen as initial route
    GetPage(
      name: Routes.SPLASH,
      page: () => SplashView(),
    ),


    GetPage(
      name: Routes.REGISTER,
      page: () => RegisterView(),
      //binding: AuthBinding(),
    ),

    //
    GetPage(
      name: Routes.LOGIN,
      page: () => LoginView(),
      //binding: AuthBinding(),
    ),
    //
    //
    GetPage(
      name: Routes.HOME,
      page: () => HomeView(),
      //binding: HomeBinding(),
    ),
    //
    //
    // GetPage(
    //   name: Routes.CART,
    //   page: () => CartView(),
    //   binding: CartBinding(),
    // ),

  ];
}