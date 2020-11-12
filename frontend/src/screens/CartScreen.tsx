import { Schema } from "mongoose";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, RouteComponentProps } from "react-router-dom";
import MessageBox from "../components/ui/MessageBox";
import Select from "../components/ui/Select";

import {
  addCartItem,
  deleteCartItem,
  cartItems as cartItemsSelector,
  loading as loadingSelector,
} from "../redux/cart-reducer";

type Props = {
  id: string;
};

const CartScreen: React.FC<RouteComponentProps<Props>> = ({
  match,
  location,
  history,
}) => {
  const dispatch = useDispatch();
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const cartItems = useSelector(cartItemsSelector);
  const loading = useSelector(loadingSelector);

  // TODO: Loading
  useEffect(() => {
    if (productId) dispatch(addCartItem(productId, qty));
  }, [productId, qty, dispatch]);

  const removeFromCartHandler = (id: Schema.Types.ObjectId) => {
    dispatch(deleteCartItem(id));
    history.push("/cart");
  };

  const checkoutHandler = () => {
    history.push("/signin?redirect=shipping");
  };

  return (
    <div className="top">
      <h1>Shopping Cart</h1>
      <div className="row">
        <div className="col-2 mr-2">
          {cartItems.length === 0 ? (
            <MessageBox
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "5rem",
                width: "40%",
              }}
            >
              <h3>Cart is empty</h3>
              <NavLink to="/">Go shopping</NavLink>
            </MessageBox>
          ) : (
            <ul style={{ width: "100%" }}>
              {cartItems.map(
                ({ product, image, name, qty, countInStock, price }) => (
                  <li key={String(product)}>
                    <div className="row">
                      <div>
                        <img src={image} alt={name} className="small" />
                      </div>
                      <div className="min-30">
                        <NavLink to={`/product/${product}`}>{name}</NavLink>
                      </div>
                      <Select
                        className="cart-select"
                        value={String(qty)}
                        numberOfRows={countInStock}
                        onChange={(value: string) =>
                          dispatch(addCartItem(product, Number(value)))
                        }
                      />
                      <div className="cart-price flex-basis-50">${price}</div>
                      <div>
                        <button
                          type="button"
                          onClick={() => removeFromCartHandler(product)}
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                )
              )}
            </ul>
          )}
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>
                  Subtotal ({cartItems.reduce((a, i) => a + i.qty, 0)}{" "}
                  items):&nbsp; $
                  {cartItems.reduce((a, i) => a + i.price * i.qty, 0)}
                </h2>
              </li>
              <li>
                <button
                  type="button"
                  className="primary block"
                  onClick={checkoutHandler}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
