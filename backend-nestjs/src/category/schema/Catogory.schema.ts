import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  icon: string =
    "https://png.pngtree.com/png-clipart/20200224/original/pngtree-tag-icon-for-your-project-png-image_5214108.jpg";

  @Prop({ required: true })
  model3D: string = "/src/threeDModels/monitor.glb";
}

export const CategorySchema = SchemaFactory.createForClass<Category>(Category);
