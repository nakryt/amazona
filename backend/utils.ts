import jwt from "jsonwebtoken";
import config from "./config";
import { IUser } from "../types/user";

const jwtSecret =
  process.env.JWT_SECRET || config.jwtSecret || "something_secret";

export const generateToken = (user: IUser) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    jwtSecret,
    {
      expiresIn: "30d",
    }
  );
};
