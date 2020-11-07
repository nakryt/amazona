import { Data } from "../types/types";
import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "nakryt",
      password: bcrypt.hashSync("123456", 8),
      email: "nakryt@yahoo.com",
      isAdmin: true,
    },
    {
      name: "Jack",
      password: bcrypt.hashSync("qwerty", 8),
      email: "jack@yahoo.com",
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Nike Slim Shirt",
      category: "Shirts",
      image: "/images/p1.jpg",
      price: 120,
      brand: "Nike",
      rating: 2.9,
      numReviews: 10,
      description: "Hight quality product",
      countInStock: 10,
    },
    {
      name: "Adidas Fit Shirt",
      category: "Shirts",
      image: "/images/p2.jpg",
      price: 100,
      brand: "Adidas",
      rating: 4.0,
      numReviews: 10,
      description: "Hight quality product",
      countInStock: 7,
    },
    {
      name: "Lacoste Free Shirt",
      category: "Shirts",
      image: "/images/p3.jpg",
      price: 220,
      brand: "Lacoste",
      rating: 4.8,
      numReviews: 17,
      description: "Hight quality product",
      countInStock: 5,
    },
    {
      name: "Nike Slim Pant",
      category: "Pants",
      image: "/images/p4.jpg",
      price: 80,
      brand: "Nike",
      rating: 3.5,
      numReviews: 14,
      description: "Hight quality product",
      countInStock: 3,
    },
    {
      name: "Puma Slim Shirt",
      category: "Pants",
      image: "/images/p5.jpg",
      price: 65,
      brand: "Puma",
      rating: 4.5,
      numReviews: 10,
      description: "Hight quality product",
      countInStock: 0,
    },
    {
      name: "Adidas Slim Shirt",
      category: "Pants",
      image: "/images/p6.jpg",
      price: 139,
      brand: "Adidas",
      rating: 4.5,
      numReviews: 15,
      description: "Hight quality product",
      countInStock: 4,
    },
  ],
};

export default data;
