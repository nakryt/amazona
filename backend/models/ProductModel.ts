import mongoose from "mongoose";
import { IProduct } from "../../types/product";
import { CreateAndUpdate } from "../../types/product";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    rating: { type: Number, required: true },
    countInStock: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct & CreateAndUpdate>(
  "product",
  productSchema
);
