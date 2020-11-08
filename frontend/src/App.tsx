import React, { useEffect } from "react";
import { Route, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListProduct } from "./redux/product-reducer";

import { cartItems as cartItemsSelector } from "./redux/cart-reducer";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CardScreen from "./screens/CartScreen";
import SignInScreen from "./screens/SignInScreen";

function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItemsSelector);

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
          <NavLink to="/signin">Sign In</NavLink>
        </div>
      </header>
      <main className="container">
        <Route path="/cart/:id?" component={CardScreen} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/signin" component={SignInScreen} />
        <Route path="/" exact component={HomeScreen} />
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  );
}

export default App;
