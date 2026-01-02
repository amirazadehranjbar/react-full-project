import { Module } from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { InventoryController } from "./inventory.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Inventory, InventorySchema } from "./schema/Inventory.schema";
import { Product, ProductSchema } from "../product/schema/Product.schema";

@Module({
  controllers: [InventoryController],
  providers: [InventoryService],
  imports: [
    MongooseModule.forFeature([
      { name: Inventory.name, schema: InventorySchema },
      { name: Product.name, schema: ProductSchema }
    ])
  ]
})
export class InventoryModule {}
