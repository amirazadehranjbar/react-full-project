import { Types } from "mongoose";
import {
  IsArray,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString
} from "class-validator";


export class CartDto {
  @IsMongoId()
  @IsNotEmpty()
  productID: Types.ObjectId;

  @IsNumber()
  @IsInt()
  quantity: number = 0;

  @IsNumber()
  price: number;

  @IsArray()
  images: string[];

  @IsString()
  productName: string;
}