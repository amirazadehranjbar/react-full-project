// lib/app/data/services/storage_service.dart
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class StorageService extends GetxService {
  late GetStorage _box;
  final _secureStorage = const FlutterSecureStorage();

  Future<StorageService> init() async {
    _box = GetStorage();
    return this;
  }

  // ✅ Regular storage (non-sensitive data)
  T? read<T>(String key) => _box.read<T>(key);

  Future<void> write(String key, dynamic value) => _box.write(key, value);

  Future<void> remove(String key) => _box.remove(key);

  Future<void> clear() => _box.erase();

  // ✅ Secure storage (tokens, passwords)
  Future<String?> readSecure(String key) => _secureStorage.read(key: key);

  Future<void> writeSecure(String key, String value) =>
      _secureStorage.write(key: key, value: value);

  Future<void> deleteSecure(String key) => _secureStorage.delete(key: key);

  Future<void> clearSecure() => _secureStorage.deleteAll();
}