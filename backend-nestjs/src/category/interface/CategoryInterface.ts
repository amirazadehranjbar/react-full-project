import { Types } from "mongoose";

export interface CategoryInterface {

  _id:Types.ObjectId;

  name: string;

  icon: string;

  model3D: string;
}