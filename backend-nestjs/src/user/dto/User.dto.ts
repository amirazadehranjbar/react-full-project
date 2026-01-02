import {
  IsDate,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested
} from "class-validator";
import { ERoleTypes } from "../interface/UserInterface";
import * as CartInterface from "../interface/CartInterface";
import { Type } from "class-transformer";

export class UserDto {
  @IsMongoId()
  @IsString()
  _id: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: "password must be at least 6 characters" })
  password?: string;

  @IsOptional()
  profileImg?: string;

  @IsEnum(ERoleTypes)
  @IsOptional()
  role?: ERoleTypes = ERoleTypes.user;

  @IsOptional()
  @ValidateNested()
  // @Type(() => CartInterface)
  cart?: CartInterface.CartInterface;

  @IsDate()
  lastActive: Date;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
