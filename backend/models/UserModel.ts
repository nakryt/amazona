import mongoose from "mongoose";
import { IUser } from "../../types/user";
import { CreateAndUpdate } from "../../types/product";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser & CreateAndUpdate>("user", userSchema);
