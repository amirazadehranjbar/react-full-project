import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller("user/category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }
}
