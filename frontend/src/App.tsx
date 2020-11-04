import React from "react";

import data from "./data";

function App() {
  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <a className="brand" href="index.html">
            amazona
          </a>
        </div>
        <div>
          <a href="cart.html">Cart</a>
          <a href="signin.html">Sign In</a>
        </div>
      </header>
      <main>
        <div className="row center">
          {data.products.map(
            ({
              _id,
              brand,
              category,
              description,
              image,
              name,
              numReviews,
              price,
              rating,
            }) => {
              return (
                <div className="card" key={_id}>
                  <a href="product.html">
                    <img className="medium" src={image} alt="product" />
                  </a>
                  <div className="card-body">
                    <a href="product.html">
                      <h2>{name}</h2>
                    </a>
                    <div className="rating">
                      <span>
                        <i className="fa fa-star"></i>
                      </span>
                      <span>
                        <i className="fa fa-star"></i>
                      </span>
                      <span>
                        <i className="fa fa-star"></i>
                      </span>
                      <span>
                        <i className="fa fa-star"></i>
                      </span>
                      <span>
                        <i className="fa fa-star"></i>
                      </span>
                    </div>
                    <div className="price">${price}</div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  );
}

export default App;
