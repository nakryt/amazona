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
