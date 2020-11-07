import express from "express";
import expressAsyncHandler from "express-async-handler";

import User from "../models/UserModel";

import data from "../data";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

export default userRouter;
