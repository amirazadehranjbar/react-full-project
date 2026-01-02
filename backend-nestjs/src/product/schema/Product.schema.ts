import { Prop, Schema } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Inventory } from "../../inventory/schema/Inventory.schema";


@Schema()
export class Product {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Inventory.name })
  inventory: Inventory;

  @Prop()
  images: string[];

  @Prop()
  isOnSale: boolean = false;
}