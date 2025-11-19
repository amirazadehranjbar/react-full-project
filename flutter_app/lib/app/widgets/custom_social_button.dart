import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

class CustomSocialButton extends StatelessWidget {

  final VoidCallback onTap;
  final IconData? icon;


  const CustomSocialButton({super.key, required this.onTap, this.icon , });



  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        width: 20.w,
        height: 6.h,
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.05),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: Colors.white.withOpacity(0.1),
            width: 1,
          ),
        ),
        child: Icon(
          icon,
          color: Colors.white,
          size: 28,
        ),
      ),
    );
  }
}
