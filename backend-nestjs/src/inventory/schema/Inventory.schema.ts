import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Product } from "../../product/schema/Product.schema";


@Schema({ timestamps: true })
export class Inventory {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
  productID: Types.ObjectId;

  @Prop()
  targetInventory: number;

  @Prop()
  inventory:number;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);