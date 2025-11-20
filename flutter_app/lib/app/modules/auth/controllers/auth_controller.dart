import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_app/app/core/constants/api_constants.dart';
import 'package:get/get.dart';
import 'package:dio/dio.dart';
import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';

class AuthController {
  final dio = Dio();

  final storage = FlutterSecureStorage();

  //region ✅ user register
  Future<void> register({
    required String userName,
    required String email,
    required String password,
  }) async {
    //region✅ Add PrettyDioLogger interceptor
    dio.interceptors.add(
      PrettyDioLogger(
        requestHeader: true,
        // Log request headers
        requestBody: true,
        // Log request body
        responseBody: true,
        // Log response body
        responseHeader: false,
        // Don't log response headers
        error: true,
        // Log errors
        compact: true,
        // Use a compact log format
        maxWidth: 90,
        // Max width of the log line
        enabled: kDebugMode,
        // Only enable in debug mode
        filter: (options, args) {
          // Optional: Filter out specific requests/responses from logging
          // Example: Don't log requests to '/health' endpoint
          // return !options.path.contains('/health');
          return true; // Log all requests by default
        },
      ),
    );
    // endregion

    try {
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
        duration: Duration(seconds: 4),
      );
    } catch (e) {
      Get.snackbar(
        'Error',
        'Unexpected error: $e',
        backgroundColor: Colors.red,
        colorText: Colors.white,
      );
    }
  }
  //endregion

  //region ✅ user login
  Future<void> login({
    required String userName,
    required String email,
    required String password,
  }) async {
    //region✅ Add PrettyDioLogger interceptor
    // dio.interceptors.add(
    //   PrettyDioLogger(
    //     requestHeader: true,
    //     // Log request headers
    //     requestBody: true,
    //     // Log request body
    //     responseBody: true,
    //     // Log response body
    //     responseHeader: false,
    //     // Don't log response headers
    //     error: true,
    //     // Log errors
    //     compact: true,
    //     // Use a compact log format
    //     maxWidth: 90,
    //     // Max width of the log line
    //     enabled: kDebugMode,
    //     // Only enable in debug mode
    //     filter: (options, args) {
    //       // Optional: Filter out specific requests/responses from logging
    //       // Example: Don't log requests to '/health' endpoint
    //       // return !options.path.contains('/health');
    //       return true; // Log all requests by default
    //     },
    //   ),
    // );
    // endregion

    try {
      final response = await dio.post(
        ApiConstants.loginURL,
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
        Get.offNamed('/home');
      } else {
        Get.snackbar(
          'Error',
          data['message'] ?? 'Registration failed',
          backgroundColor: Colors.red,
          colorText: Colors.white,
        );
      }
    } on DioException catch (e) {
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
        duration: Duration(seconds: 4),
      );
    } catch (e) {
      Get.snackbar(
        'Error',
        'Unexpected error: $e',
        backgroundColor: Colors.red,
        colorText: Colors.white,
      );
    }
  }
//endregion
}
