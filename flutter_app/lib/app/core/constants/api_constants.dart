class ApiConstants {

  static const String port = '3500';

  static const String baseURL = 'http://172.30.208.1:$port';

  static const String registerURL = '$baseURL/api/users/register';

  static const String loginURL = '$baseURL/api/users/login';

  static const String logoutURL = '$baseURL/api/users/logout';

  static const String productsURL = '$baseURL/api/user/products-in-category';

  static const String categoriesURL = '$baseURL/api/user/category';

}
