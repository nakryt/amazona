import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, RouteComponentProps } from "react-router-dom";

import {
  orderDetail,
  selectedOrder,
  loadingSelector,
  errorSelector,
} from "../../redux/order-reducer";

import LoadingBox from "../../components/ui/LoadingBox/LoadingBox";
import MessageBox from "../../components/ui/MessageBox";

type Props = {
  id: string;
};

const OrderScreen: FC<RouteComponentProps<Props>> = ({ match }) => {
  const dispatch = useDispatch();
  const orderId = match.params.id;
  const order = useSelector(selectedOrder);
  const orderLoading = useSelector(loadingSelector);
  const orderError = useSelector(errorSelector);

  // const toPrice = (num: number) => Number(num.toFixed(2));

  useEffect(() => {
    dispatch(orderDetail(orderId));
  }, [dispatch, orderId]);

  const {
    _id,
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  return (
    <>
      {orderLoading ? (
        <div className="dflex center" style={{ height: "100%" }}>
          <LoadingBox />
        </div>
      ) : orderError ? (
        <MessageBox variant="danger">{orderError}</MessageBox>
      ) : (
        <div>
          <h1>Order {_id}</h1>
          <div className="row top">
            <div className="col-2">
              <ul>
                <li>
                  <div className="card card-body">
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name: </strong>
                      {shippingAddress?.fullName}
                      <br />
                    </p>
                    <p>
                      <strong>Address: </strong>
                      {shippingAddress?.address}, {shippingAddress?.city},{" "}
                      {shippingAddress?.postalCode}, {shippingAddress?.country}{" "}
                    </p>
                    {isDelivered ? (
                      <MessageBox variant="success">
                        Delivered at {deliveredAt}
                      </MessageBox>
                    ) : (
                      <MessageBox variant="danger">Not Delivered</MessageBox>
                    )}
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Payment</h2>
                    <p>
                      <strong>Method: </strong>
                      {paymentMethod}
                    </p>
                    {isPaid ? (
                      <MessageBox variant="success">
                        Paid at {paidAt}
                      </MessageBox>
                    ) : (
                      <MessageBox variant="danger">Not Paid</MessageBox>
                    )}
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Order Items</h2>
                    <ul style={{ width: "100%" }}>
                      {cartItems &&
                        cartItems?.map(
                          ({ product, image, name, qty, price }) => (
                            <li key={String(product)}>
                              <div className="row">
                                <div>
                                  <img
                                    src={image}
                                    alt={name}
                                    className="small"
                                  />
                                </div>
                                <div className="min-30">
                                  <NavLink to={`/product/${product}`}>
                                    {name}
                                  </NavLink>
                                </div>
                                <div className="cart-price">
                                  <span>
                                    {qty} x ${price} = {qty * price}
                                  </span>
                                </div>
                              </div>
                            </li>
                          )
                        )}
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
                      <div>${itemsPrice?.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Shipping</div>
                      <div>${shippingPrice?.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Tax</div>
                      <div>${taxPrice?.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>
                        <strong>Order Total</strong>
                      </div>
                      <div>
                        <strong>${totalPrice?.toFixed(2)}</strong>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderScreen;
