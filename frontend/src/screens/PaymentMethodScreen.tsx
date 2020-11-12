import React, { FC, FormEvent, ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import CheckoutSteps from "../components/CheckoutSteps";
import {
  savePaymentMethod,
  shippingAddress as shippingAddressSelector,
} from "../redux/cart-reducer";
import { PaymentMethod } from "../../../types/product";

const PaymentMethodScreen: FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const shippingAddress = useSelector(shippingAddressSelector);
  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("PayPal");

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "PayPal" || value === "Stripe") setPaymentMethod(value);
  };
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              name="paymentMethod"
              id="paypal"
              value="PayPal"
              required
              checked
              onChange={changeHandler}
            />
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              name="paymentMethod"
              id="stripe"
              value="Stripe"
              required
              onChange={changeHandler}
            />
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethodScreen;
