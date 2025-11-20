class ApiConstants {

  static const String port = '3500'; // Example port

  static const String baseURL = 'http://172.30.208.1:$port';
  // Example IP
  static const String registerURL = '$baseURL/api/users/register';

  static const String loginURL = '$baseURL/api/users/login';
// ... other endpoints
}
