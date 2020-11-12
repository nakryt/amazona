import React, { useEffect } from "react";
import { Route, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { cartItems as cartItemsSelector } from "./redux/cart-reducer";
import { signOut } from "./redux/user-reducer";
import { userInfo } from "./redux/user-reducer";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CardScreen from "./screens/CartScreen";
import SignInScreen from "./screens/SignInScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { getListProduct } from "./redux/product-reducer";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/Orders/OrderDetailScreen";

function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItemsSelector);
  const user = useSelector(userInfo);

  const signOutHandler = () => {
    dispatch(signOut());
  };

  useEffect(() => {
    dispatch(getListProduct());
  }, [dispatch]);

  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <NavLink className="brand" to="/">
            amazona
          </NavLink>
        </div>
        <div>
          <NavLink to="/cart">
            Cart
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </NavLink>
          {user ? (
            <div className="dropdown">
              <NavLink to="#">
                {user.name}&nbsp;
                <i className="fa fa-caret-down"></i>
              </NavLink>
              <div className="dropdown-content">
                <NavLink to="#signout" onClick={signOutHandler}>
                  Sign Out
                </NavLink>
              </div>
            </div>
          ) : (
            <NavLink to="/signin">Sign In</NavLink>
          )}
        </div>
      </header>
      <main className="container">
        <Route path="/cart/:id?" component={CardScreen} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/signin" component={SignInScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/shipping" component={ShippingAddressScreen} />
        <Route path="/payment" component={PaymentMethodScreen} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/order/:id" component={OrderScreen} />
        <Route path="/" exact component={HomeScreen} />
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  );
}

export default App;
