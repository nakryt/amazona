import React, { FC } from "react";
import { useSelector } from "react-redux";

import {
  shippingAddress,
  paymentMethod as paymentMethodSelector,
  cartItems as cartItemsSelector,
} from "../redux/cart-reducer";
import CheckoutSteps from "../components/CheckoutSteps";
import { NavLink, RouteComponentProps } from "react-router-dom";

const PlaceOrderScreen: FC<RouteComponentProps> = ({ history }) => {
  const paymentMethod = useSelector(paymentMethodSelector);
  if (!paymentMethod) {
    history.push("/payment");
  }
  const { fullName, address, city, country, postalCode } = useSelector(
    shippingAddress
  );
  const cartItems = useSelector(cartItemsSelector);
  const toPrice = (num: number) => Number(num.toFixed(2));

  const itemsPrice = toPrice(
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
  );
  const shippingPrice = itemsPrice > 100 ? toPrice(0) : toPrice(10);
  const taxPrice = toPrice(0.15 * itemsPrice);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = () => {
    // TODO: dispatch place order action
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong>
                  {fullName}
                  <br />
                  <strong>Address: </strong>
                  {address}, {city}, {postalCode}, {country}{" "}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method: </strong>
                  {paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul style={{ width: "100%" }}>
                  {cartItems.map(({ product, image, name, qty, price }) => (
                    <li key={product}>
                      <div className="row">
                        <div>
                          <img src={image} alt={name} className="small" />
                        </div>
                        <div className="min-30">
                          <NavLink to={`/product/${product}`}>{name}</NavLink>
                        </div>
                        <div className="cart-price">
                          <span>
                            {qty} x ${price} = {qty * price}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>${totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  className="primary block"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
