import { Document } from "mongoose";

export type Category = "Shirts" | "Pants";
export type Brand = "Nike" | "Adidas" | "Lacoste" | "Puma";

export interface IProduct extends Document {
  name: string;
  category: Category;
  image: string;
  price: number;
  brand: Brand;
  rating: number;
  numReviews: number;
  description: string;
  countInStock: number;
  createdAt: Date;
  updatedAt: Date;
}

export type Products = IProduct[];
