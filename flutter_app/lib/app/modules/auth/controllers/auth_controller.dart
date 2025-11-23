// lib/app/modules/auth/controllers/auth_controller.dart
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_app/app/core/constants/api_constants.dart';
import 'package:get/get.dart';
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';
import 'package:logger/logger.dart';

import '../../../data/models/cart_model.dart';
import '../../../data/models/user_model.dart';

class AuthController extends GetxController {
  final logger = Logger();
  final dio = Dio();
  final storage = const FlutterSecureStorage();

  // ✅ Reactive user state - starts as null
  final Rx<UserModel?> currentUser = Rx<UserModel?>(null);

  // ✅ Loading state
  final RxBool isLoading = false.obs;

  // ✅ Authentication state
  final RxBool isAuthenticated = false.obs;

  @override
  void onInit() {
    super.onInit();
    _setupDioInterceptors();
    _checkAuthStatus(); // Check if user is logged in on app start
  }

  //region ✅ Setup Dio Interceptors (call once)
  void _setupDioInterceptors() {
    dio.interceptors.add(
      PrettyDioLogger(
        requestHeader: true,
        requestBody: true,
        responseBody: true,
        responseHeader: false,
        error: true,
        compact: true,
        maxWidth: 90,
        enabled: kDebugMode,
        filter: (options, args) => true,
      ),
    );
  }
  //endregion

  //region ✅ Check Authentication Status on App Start
  Future<void> _checkAuthStatus() async {
    try {
      final userID = await storage.read(key: 'userID');
      final username = await storage.read(key: 'username');
      final email = await storage.read(key: 'email');
      final profileImg = await storage.read(key: 'profileImg');
      final isAuth = await storage.read(key: 'isAuthenticated');

      if (userID != null && username != null && email != null && isAuth == 'true') {
        // Restore user data from storage
        currentUser.value = UserModel(
          id: userID,
          userName: username,
          email: email,
          password: '',
          profileImg: profileImg ?? '',
          cart: Cart(items: []),
          role: 'user',
        );
        isAuthenticated.value = true;
        logger.i('✅ User authenticated from storage: ${username}');
      } else {
        isAuthenticated.value = false;
      }
    } catch (e) {
      logger.e('❌ Error checking auth status: $e');
      isAuthenticated.value = false;
    }
  }
  //endregion

  //region ✅ User Register
  Future<void> register({
    required String userName,
    required String email,
    required String password,
  }) async {
    try {
      isLoading.value = true;

      final response = await dio.post(
        ApiConstants.registerURL,
        data: {'userName': userName, 'email': email, 'password': password},
        options: Options(headers: {'Content-Type': 'application/json'}),
      );

      final data = response.data;

      if (response.statusCode == 200 && data['success']) {
        Get.snackbar(
          'Success',
          'Registration successful!',
          backgroundColor: Colors.green,
          colorText: Colors.white,
        );
        Get.offNamed('/login');
      } else {
        Get.snackbar(
          'Error',
          data['message'] ?? 'Registration failed',
          backgroundColor: Colors.red,
          colorText: Colors.white,
        );
      }
    } on DioException catch (e) {
      _handleDioError(e);
    } catch (e) {
      Get.snackbar(
        'Error',
        'Unexpected error: $e',
        backgroundColor: Colors.red,
        colorText: Colors.white,
      );
    } finally {
      isLoading.value = false;
    }
  }
  //endregion

  //region ✅ User Login
  Future<void> login({
    required String email,
    required String password,
  }) async {
    try {
      isLoading.value = true;

      final response = await dio.post(
        ApiConstants.loginURL,
        data: {'email': email, 'password': password},
        options: Options(headers: {'Content-Type': 'application/json'}),
      );

      final data = response.data;

      if (response.statusCode == 200 && data['success']) {
        // Parse user data from response
        final userData = data['data'];
        final username = userData['username'] ?? "";
        final profileImg = userData['profileImg'] ?? "";
        final userEmail = userData['email'] ?? "";
        final userID = userData['userID'] ?? "";

        // ✅ Update currentUser with actual data
        currentUser.value = UserModel(
          id: userID,
          userName: username,
          email: userEmail,
          password: '',
          profileImg: profileImg,
          cart: Cart(items: []),
          role: 'user',
        );

        // ✅ Save to secure storage
        await storage.write(key: 'username', value: username);
        await storage.write(key: 'profileImg', value: profileImg);
        await storage.write(key: 'email', value: userEmail);
        await storage.write(key: 'userID', value: userID);
        await storage.write(key: 'isAuthenticated', value: 'true');

        // ✅ Update authentication state
        isAuthenticated.value = true;

        logger.i('✅ User logged in successfully: $username');

        Get.snackbar(
          'Success',
          'Welcome back, $username!',
          backgroundColor: Colors.green,
          colorText: Colors.white,
        );

        Get.offAllNamed('/home');
      } else {
        Get.snackbar(
          'Error',
          data['message'] ?? 'Login failed',
          backgroundColor: Colors.red,
          colorText: Colors.white,
        );
      }
    } on DioException catch (e) {
      _handleDioError(e);
    } catch (e) {
      logger.e('❌ Login error: $e');
      Get.snackbar(
        'Error',
        'Unexpected error: $e',
        backgroundColor: Colors.red,
        colorText: Colors.white,
      );
    } finally {
      isLoading.value = false;
    }
  }
  //endregion

  //region ✅ User Logout
  Future<void> logout() async {
    try {
      isLoading.value = true;

      final response = await dio.get(
        ApiConstants.logoutURL,
        options: Options(
          headers: {'Content-Type': 'application/json'},
          validateStatus: (status) => status! < 500,
        ),
      );

      final data = response.data;

      if (response.statusCode == 200 && data['success']) {
        await _clearUserData();

        Get.snackbar(
          'Success',
          'Logged out successfully!',
          backgroundColor: Colors.green,
          colorText: Colors.white,
        );

        Get.offAllNamed('/login');
      } else {
        Get.snackbar(
          'Error',
          data['message'] ?? 'Logout failed',
          backgroundColor: Colors.red,
          colorText: Colors.white,
        );
      }
    } on DioException catch (e) {
      logger.e('❌ Logout error: $e');

      // Even if server logout fails, clear local data
      await _clearUserData();
      Get.offAllNamed('/login');

      Get.snackbar(
        'Info',
        'Logged out locally',
        backgroundColor: Colors.orange,
        colorText: Colors.white,
      );
    } catch (e) {
      logger.e('❌ Logout error: $e');
      await _clearUserData();
      Get.offAllNamed('/login');
    } finally {
      isLoading.value = false;
    }
  }
  //endregion

  //region ✅ Clear User Data
  Future<void> _clearUserData() async {
    await storage.deleteAll();
    currentUser.value = null;
    isAuthenticated.value = false;
    logger.i('✅ User data cleared');
  }
  //endregion

  //region ✅ Get Current User Info
  UserModel? get user => currentUser.value;

  String get userName => currentUser.value?.userName ?? 'Guest';
  String get userEmail => currentUser.value?.email ?? '';
  String get userProfileImg => currentUser.value?.profileImg ?? '';
  String get userId => currentUser.value?.id ?? '';
  //endregion

  //region ✅ Handle Dio Errors
  void _handleDioError(DioException e) {
    String errorMessage = 'Network error occurred';

    if (e.type == DioExceptionType.connectionTimeout) {
      errorMessage = 'Connection timeout';
    } else if (e.type == DioExceptionType.receiveTimeout) {
      errorMessage = 'Server response timeout';
    } else if (e.type == DioExceptionType.connectionError) {
      errorMessage = 'Cannot connect to server. Check your connection.';
    } else if (e.response != null) {
      errorMessage = e.response?.data['message'] ?? 'Server error';
    }

    Get.snackbar(
      'Error',
      errorMessage,
      backgroundColor: Colors.red,
      colorText: Colors.white,
      duration: const Duration(seconds: 4),
    );
  }
//endregion
}