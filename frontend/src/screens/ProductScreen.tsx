import React from "react";
import { RouteComponentProps, NavLink } from "react-router-dom";
import Rating from "../components/Rating";
import data from "../data";

type Props = {
  id: string;
};

const ProductScreen: React.FC<RouteComponentProps<Props>> = ({ match }) => {
  const product = data.products.find((item) => item._id === match.params.id);
  console.log(product);
  if (!product) {
    return <div>Product not found</div>;
  }
  const {
    image,
    name,
    rating,
    numReviews,
    price,
    description,
    countInStock,
  } = product;
  return (
    <div>
      <NavLink to="/">Back to result</NavLink>
      <div className="row top">
        <div className="col-2">
          <img className="large" src={image} alt={name} />
        </div>
        <div className="col-1">
          <ul>
            <li>
              <h1>{name}</h1>
            </li>
            <li>
              <Rating rating={rating} numReviews={numReviews} />
            </li>
            <li>
              <b>Price:</b> ${price}
            </li>
            <li>
              <b>Description:</b>
              <p className="description">{description}</p>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <div className="row">
                  <div>Price</div>
                  <div className="price">{price}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Status</div>
                  <div>
                    {countInStock > 0 ? (
                      <span className="success">In Stock</span>
                    ) : (
                      <span className="error">Unavailable</span>
                    )}
                  </div>
                </div>
              </li>
              <li>
                <button className="primary block">Add to Cart</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
