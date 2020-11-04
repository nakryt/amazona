import React from "react";
import { NavLink } from "react-router-dom";

import { Product as TProduct } from "../types/types";
import Rating from "./Rating";

type Props = {
  product: TProduct;
};

export default function Product({ product }: Props) {
  const { _id, name, image, price, rating, numReviews } = product;
  return (
    <div className="card card-product">
      <NavLink to={`/product/${_id}`}>
        <img className="medium" src={image} alt={name} />
      </NavLink>
      <div className="card-body">
        <NavLink to={`/product/${_id}`}>
          <h2>{name}</h2>
        </NavLink>
        <Rating rating={rating} numReviews={numReviews} />
        <div className="price">${price}</div>
      </div>
    </div>
  );
}
