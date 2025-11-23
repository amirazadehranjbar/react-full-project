// lib/app/modules/splash/views/splash_view.dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_app/app/modules/auth/controllers/auth_controller.dart';
import 'package:flutter_app/app/routes/app_routes.dart';

class SplashView extends StatefulWidget {
  const SplashView({super.key});

  @override
  State<SplashView> createState() => _SplashViewState();
}

class _SplashViewState extends State<SplashView> {
  @override
  void initState() {
    super.initState();
    _checkAuthAndNavigate();
  }

  Future<void> _checkAuthAndNavigate() async {
    // ✅ Get AuthController (already initialized in main.dart)
    final authController = Get.find<AuthController>();

    // ✅ Wait a bit for better UX (optional, shows your logo)
    await Future.delayed(const Duration(seconds: 2));

    // ✅ Check authentication status from AuthController
    if (authController.isAuthenticated.value) {
      // User is logged in → Go to home
      Get.offAllNamed(Routes.HOME);
    } else {
      // User is not logged in → Go to login
      Get.offAllNamed(Routes.LOGIN);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF1A1A2E),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Your app logo
            Image.asset(
              'assets/images/logo.png',
              width: 150,
              height: 150,
            ),
            const SizedBox(height: 24),

            // App name
            const Text(
              'E-Commerce App',
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            const SizedBox(height: 40),

            // Loading indicator
            const CircularProgressIndicator(
              valueColor: AlwaysStoppedAnimation<Color>(Colors.purple),
            ),
          ],
        ),
      ),
    );
  }
}