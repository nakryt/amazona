import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  token: string;
  _id: string;
}

export type Users = IUser[];
