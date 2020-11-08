import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import config from "./config";
import userRouters from "./routers/userRouter";
import productRouters from "./routers/productRouter";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || config.port || 5000;
const mongodbUrl = process.env.MONGODB_URL || config.mongodbUrl;

app.use("/api/products", productRouters);
app.use("/api/users", userRouters);
app.get("/", (req, res) => {
  res.send("Server is ready!");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
  try {
    mongoose.connect(mongodbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`Server is running at: http://localhost:${PORT}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
});
