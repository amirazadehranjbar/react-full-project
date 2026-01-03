import { HttpStatus, Injectable, NotFoundException, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "./schema/Catogory.schema";
import { Model } from "mongoose";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>
  ) {}

  //region✅ get all categories
  async getAllCategories(): Promise<Category[]> {

    const categories = await this.categoryModel.find().exec();
    if (categories.length === 0) {
      throw new NotFoundException("Category not found");
    }
    return categories;
  }
  //endregion
}
