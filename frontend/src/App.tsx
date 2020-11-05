import React, { useEffect } from "react";
import { Route, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getListProduct } from "./redux/product-reducer";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CardScreen from "./screens/CardScreen";

function App() {
  const dispatch = useDispatch();
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
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/signin">Sign In</NavLink>
        </div>
      </header>
      <main>
        <Route path="/cart/:id" component={CardScreen} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/" exact component={HomeScreen} />
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  );
}

export default App;
