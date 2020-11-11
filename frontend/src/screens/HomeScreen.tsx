import React from "react";
import { useSelector } from "react-redux";

import {
  data as dataSelector,
  loading as loadingSelector,
  error as errorSelector,
} from "../redux/product-reducer";

import Product from "../components/Product";
import LoadingBox from "../components/ui/LoadingBox/LoadingBox";
import MessageBox from "../components/ui/MessageBox";

export default function HomeScreen() {
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  const products = useSelector(dataSelector);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
