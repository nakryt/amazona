import React, { useState, ChangeEvent, FormEvent, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { ShippingAddress } from "../../../types/types";
import CheckoutSteps from "../components/CheckoutSteps";

import {
  saveShippingAddress,
  shippingAddress as shippingAddressSelector,
} from "../redux/cart-reducer";
import { userInfo } from "../redux/user-reducer";

const ShippingAddressScreen: FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const user = useSelector(userInfo);
  const shippingAddress = useSelector(shippingAddressSelector);

  if (!user) {
    history.push("/signin");
  }

  const { fullName, address, city, postalCode, country } = shippingAddress;
  const [form, setForm] = useState<ShippingAddress>({
    fullName,
    address,
    city,
    postalCode,
    country,
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(saveShippingAddress(form));
    history.push("/payment");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={form.fullName}
            onChange={onChangeHandler}
            required
            placeholder="Enter Full Name"
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={form.address}
            onChange={onChangeHandler}
            required
            placeholder="Enter Address"
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={form.city}
            onChange={onChangeHandler}
            required
            placeholder="Enter City"
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            value={form.postalCode}
            onChange={onChangeHandler}
            required
            placeholder="Enter Postal Code"
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            value={form.country}
            onChange={onChangeHandler}
            required
            placeholder="Enter Country"
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingAddressScreen;
