import 'package:flutter/material.dart';
import 'package:gradient_borders/box_borders/gradient_box_border.dart';
import 'package:gradient_borders/gradient_borders.dart';

class CustomTextField extends StatelessWidget {
  final TextEditingController? controller;
  final bool obscureText;
  final TextInputType? keyboardType;
  final String? Function(String?)? validator;
  final String? hintText;
  final IconData? prefixIcon;
  final Widget? suffixIcon;

  const CustomTextField({
    super.key,
    this.controller,
    this.obscureText = false,
    this.keyboardType,
    this.validator,
    this.hintText,
    this.prefixIcon,
    this.suffixIcon,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.1),
        borderRadius: BorderRadius.circular(15),
      ),
      child: TextFormField(
        controller: controller,
        obscureText: obscureText,
        keyboardType: keyboardType,
        validator: validator,
        style: const TextStyle(color: Colors.white),

        decoration: InputDecoration(
          hintText: hintText,

          hintStyle: TextStyle(color: Colors.white.withOpacity(0.2)),

          prefixIcon: prefixIcon != null
              ? Icon(prefixIcon, color: Colors.white54)
              : null,

          suffixIcon: suffixIcon,

          border: GradientOutlineInputBorder(
            gradient: LinearGradient(colors: [Colors.purple.shade600, Colors.pink.shade400] ,
              begin: Alignment.centerLeft,
              end: Alignment.centerRight,
            ),
            width: 1,
            borderRadius: BorderRadius.circular(15),
          ),

          focusedBorder: GradientOutlineInputBorder(
            gradient: LinearGradient(colors: [Colors.pink.shade400 ,Colors.purple.shade600]),
            width: 2,
            borderRadius: BorderRadius.circular(15),
          ),

          contentPadding: const EdgeInsets.symmetric(
            horizontal: 16,
            vertical: 16,
          ),
        ),
      ),
    );
  }
}
