import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/ProductModel";
import data from "../data";

const productRouter = Router();

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdProducts = await Product.insertMany(data.products);
    res.send(createdProducts);
  })
);

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    res.send(await Product.find());
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    // const product = data.products.find((item) => item._id === req.params.id);
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product not found!" });
    }
  })
);

export default productRouter;
