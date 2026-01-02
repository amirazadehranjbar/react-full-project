import { CartInterface} from "./CartInterface";
import { Types } from "mongoose";

export enum ERoleTypes {
  admin = "admin",
  user = "user"
}

export interface UserInterface {
  _id: Types.ObjectId | string;

  userName: string;

  email: string;

  password?: string;

  profileImg?: string;

  role?: ERoleTypes;

  cart?: CartInterface;

  lastActive: Date;

  createdAt?: Date;

  updatedAt?: Date;

  //user functions **************************************************************************************
  addToCart(productID: string | Types.ObjectId, amount?: number): Promise<void>;

  removeFromCart(productID: string | Types.ObjectId): Promise<void>;

  updateCartItemQuantity(
    productID: string | Types.ObjectId,
    newQuantity: number
  ): Promise<void>;

  clearCart(): Promise<void>;
}
