// lib/app/modules/home/controllers/home_controller.dart
import 'package:dio/dio.dart';
import 'package:flutter_app/app/core/constants/api_constants.dart';
import 'package:get/get.dart';
import 'package:logger/logger.dart';

import '../../../data/models/category_model.dart';

class HomeController extends GetxController {

  final logger = Logger();
  final dio = Dio();

  // ✅ Reactive list
  final RxList<CategoryModel?> categories = <CategoryModel?>[].obs;

  // ✅ Loading state
  final RxBool isLoading = false.obs;

  @override
  void onInit() {
    super.onInit();
    fetchCategories();
  }

  Future<void> fetchCategories() async {
    try {
      isLoading.value = true;

      // Fetch from API
      final response = await dio.get(ApiConstants.categoriesURL);


      if (response.statusCode == 200) {
        final data = response.data;
        categories.value = (data as List)
            .map((json) => CategoryModel.fromJson(json))
            .toList();
      }
    } catch (e) {
      Get.snackbar('Error', 'Failed to load categories');
    } finally {
      isLoading.value = false;
    }
  }
}