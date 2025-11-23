import 'package:flutter_app/app/data/models/category_model.dart';

class ProductModel {
  String name;
  double price;
  double inventory;
  double targetInventory;
  CategoryModel categoryModel;
  List<String> images;
  bool? isOnSale = false;

  ProductModel({
    required this.name,
    required this.price,
    required this.inventory,
    required this.targetInventory,
    required this.categoryModel,
    required this.images,
    this.isOnSale = false,
  });

  factory ProductModel.fromJson(Map<String, dynamic> json) {
    return ProductModel(
      name: json['name'] ?? "",
      price: json['price'] ?? 0,
      inventory: json['inventory'] ?? 0,
      targetInventory: json['targetInventory'] ?? 0,
      categoryModel: CategoryModel.fromJson(json['category'] ?? {}),
      images: json['images'] ?? [],
      isOnSale: json['isOnSale'] ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'price': price,
      'inventory': inventory,
      'targetInventory': targetInventory,
      'category': categoryModel.toJson(),
      'images': images,
      'isOnSale': isOnSale,
    };
  }
}
