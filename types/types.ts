import { Products } from "./product";
import { Users } from "./user";

export type Data = {
  users: Users;
  products: Products;
};

export type CartItem = {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
};

export type ShippingAddress = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export type PaymentMethod = "PayPal" | "Stripe";

export type CreateAndUpdate = {
  createdAt: Date;
  updatedAt: Date;
};
