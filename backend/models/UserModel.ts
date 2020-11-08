import mongoose from "mongoose";
import { IUser } from "../../types/user";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("user", userSchema);
