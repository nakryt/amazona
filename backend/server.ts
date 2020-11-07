import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import config from "./config";
import data from "./data";

import userRouters from "./routers/userRouter";
const app = express();
// const PORT = process.env.PORT || 5000;
const PORT = config.port || 5000;

app.use("/api/users", userRouters);
app.get("/", (req, res) => {
  res.send("Server is ready!");
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((item) => item._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found!" });
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
  try {
    mongoose.connect(config.mongodbUrl, {
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
