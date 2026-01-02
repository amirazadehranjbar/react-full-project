import { Types } from "mongoose";
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CategoryDto {

  @IsMongoId()
  @IsNotEmpty()
  _id:Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsNotEmpty()
  @IsString()
  model3D: string;

}