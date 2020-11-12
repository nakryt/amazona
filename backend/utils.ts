import { NextFunction } from "express";
import { Response } from "express";
import { Request } from "express";
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

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, jwtSecret, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = decode as any;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
};
