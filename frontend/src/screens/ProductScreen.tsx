import React, { useEffect, useState } from "react";
import { RouteComponentProps, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getProductDetail,
  productDetailData,
  productDetailError,
  productDetailLoading,
} from "../redux/product-reducer";
import { loading as loadingCartSelector } from "../redux/cart-reducer";

import Rating from "../components/Rating";
import LoadingBox from "../components/ui/LoadingBox/LoadingBox";
import MessageBox from "../components/ui/MessageBox";
import Select from "../components/ui/Select";

type Props = {
  id: string;
};

const ProductScreen: React.FC<RouteComponentProps<Props>> = ({
  match,
  history,
}) => {
  const dispatch = useDispatch();
  const product = useSelector(productDetailData);
  const loadingDetailProduct = useSelector(productDetailLoading);
  const error = useSelector(productDetailError);
  const loadingCart = useSelector(loadingCartSelector);

  const productId = match.params.id;
  const [qty, setQty] = useState("1");

  // TODO: Loading product
  useEffect(() => {
    if (!product || product?._id !== productId)
      dispatch(getProductDetail(productId));
  }, [dispatch, productId, product]);

  if (productId !== product?._id || loadingDetailProduct) {
    return <LoadingBox />;
  }
  if (error) {
    return <MessageBox variant="danger">{error}</MessageBox>;
  }
  if (!product) {
    return <div>Product not found</div>;
  }

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };

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
                  <div className="price">${price * Number(qty)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Status</div>
                  <div>
                    {countInStock > 0 ? (
                      <span className="success">In Stock</span>
                    ) : (
                      <span className="danger">Unavailable</span>
                    )}
                  </div>
                </div>
              </li>
              {product.countInStock > 0 && (
                <>
                  <li>
                    <div className="row">
                      <div>Qty</div>
                      <Select
                        numberOfRows={product.countInStock}
                        value={qty}
                        onChange={setQty}
                      />
                    </div>
                  </li>
                  <li>
                    <button
                      className="primary block"
                      onClick={addToCartHandler}
                      disabled={loadingCart}
                    >
                      Add to Cart
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
