import React from "react";
import { RouteComponentProps } from "react-router-dom";

type Props = {
  id: string;
};

const CardScreen: React.FC<RouteComponentProps<Props>> = ({
  match,
  location,
}) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  return (
    <div className="card-screen">
      <h1>Cart Screen</h1>
      <p>
        ADD TO CART: ProductId: {productId} Qty: {qty}
      </p>
    </div>
  );
};

export default CardScreen;
