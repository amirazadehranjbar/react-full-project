class CategoryModel {
  String id;
  String name;
  String? icon;

  CategoryModel({
    required this.id,
    required this.name,
    this.icon =
        "https://png.pngtree.com/png-clipart/20200224/original/pngtree-tag-icon-for-your-project-png-image_5214108.jpg",
  });

  factory CategoryModel.fromJson(Map<String, dynamic> json) {
    return CategoryModel(id: json['_id'],name: json['name'], icon: json['icon']);
  }

  Map<String, dynamic> toJson() {
    return {'_id':id , 'name': name, 'icon': icon};
  }

}
