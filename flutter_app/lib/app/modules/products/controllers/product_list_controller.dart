// lib/app/modules/products/controllers/product_list_controller.dart
import 'package:dio/dio.dart';
import 'package:flutter_app/app/data/models/product_model.dart';
import 'package:get/get.dart';
import 'package:logger/logger.dart';

import '../../../core/constants/api_constants.dart';

class ProductListController  extends GetxController{

  final logger = Logger();
  final dio = Dio();

  RxList<ProductModel> products = <ProductModel>[].obs;


  Future<void> fetchProducts({String? categoryID}) async {
    try {

      final response = await dio.post(ApiConstants.productsURL , data: {categoryID});

      logger.f(response.data);





    }catch (error){
      Get.snackbar('Error', 'Failed to load products');
    }
  }
  }
