export type Category = "Shirts" | "Pants";
export type Brand = "Nike" | "Adidas" | "Lacoste" | "Puma";

export type Product = {
  _id: string;
  name: string;
  category: Category;
  image: string;
  price: number;
  brand: Brand;
  rating: number;
  numReviews: number;
  description: string;
  countInStock: number;
};

export type Products = Array<Product>;
