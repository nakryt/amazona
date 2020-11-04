import React from "react";
import { Route, NavLink } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
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
        <Route path="/product/:id" exact component={ProductScreen} />
        <Route path="/" exact component={HomeScreen} />
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  );
}

export default App;
