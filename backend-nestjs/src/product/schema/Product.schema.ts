import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Inventory } from "../../inventory/schema/Inventory.schema";
import { Category } from "../../category/schema/Catogory.schema";


@Schema({ timestamps: true })
export class Product {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Inventory.name })
  inventory: Inventory;

  @Prop({type : mongoose.Schema.Types.ObjectId , ref: Category.name})
  category : Category;

  @Prop()
  images: string[];

  @Prop()
  isOnSale: boolean = false;
}

export const ProductSchema = SchemaFactory.createForClass(Product);