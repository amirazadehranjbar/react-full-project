import { Types } from "mongoose";

export interface CartItemInterface {

      productID: Types.ObjectId;

      quantity: number;

      price: number;

      images: string[];

      productName: string;

      isOnSale: boolean;

}

export interface CartInterface {
  items:CartItemInterface[];
}
