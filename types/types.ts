import { Products } from "./product";
import { Users } from "./user";

export type Data = {
  users: Users;
  products: Products;
};

export enum Result {
  SUCCESS = 0,
  ERROR = 1,
}
