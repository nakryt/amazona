import React from "react";
import { Product as TProduct } from "../types/types";
import Rating from "./Rating";

type Props = {
  product: TProduct;
};

export default function Product({ product }: Props) {
  const { _id, name, image, price, rating, numReviews } = product;
  return (
    <div className="card">
      <a href={`/product/${_id}`}>
        <img className="medium" src={image} alt={name} />
      </a>
      <div className="card-body">
        <a href={`/product/${_id}`}>
          <h2>{name}</h2>
        </a>
        <Rating rating={rating} numReviews={numReviews} />
        <div className="price">${price}</div>
      </div>
    </div>
  );
}
