import { Document, Schema } from "mongoose";

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
}
export type Products = IProduct[];

export type CartItem = {
  product: Schema.Types.ObjectId;
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

export type OrderItem = {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: Schema.Types.ObjectId;
};
export interface OrderWithoutDate extends Document {
  cartItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  user: Schema.Types.ObjectId | null;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
}

export type Order = OrderWithoutDate & CreateAndUpdate;
