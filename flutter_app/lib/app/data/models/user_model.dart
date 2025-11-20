// lib/app/data/models/user_model.dart
import 'package:flutter_app/app/data/models/cart_model.dart';

class UserModel {
  String id;
  String userName;
  String email;
  String? password;
  String profileImg;
  String role;
  Cart cart;
  DateTime? lastActive = DateTime.now();

  UserModel({
    required this.id,
    required this.userName,
    required this.email,
    required this.password,
    required this.profileImg,
    this.role = "user",
    required this.cart,
    this.lastActive,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['_id'] ?? json['id'], // Handle MongoDB _id
      userName: json['userName'] ?? '',
      email: json['email'] ?? '',
      password: json['password'], // Can be null
      profileImg: json['profileImg'],
      role: json['role'] ?? 'user',
      cart: Cart.fromJson(json['cart'] ?? {}),
      lastActive: json['lastActive'] != null ? DateTime.parse(json['lastActive']) : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'userName': userName,
      'email': email,
      'password': password,
      'profileImg': profileImg,
      'role': role,
      'cart': cart.toJson(),
      'lastActive': lastActive?.toIso8601String(),
    };
  }
}
