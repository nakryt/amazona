import React, { useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import MessageBox from "../../components/ui/MessageBox";

import {
  ordersSelector,
  getOrders,
  loadingSelector,
  errorSelector,
} from "../../redux/order-reducer";

const OrderHistory: FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const orders = useSelector(ordersSelector);
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);

  useEffect(() => {
    let isCancel = false;
    const fetchData = async () => {
      if (!isCancel) dispatch(getOrders());
    };
    fetchData();
    return () => {
      isCancel = true;
    };
  }, [dispatch]);
  return (
    <div>
      <h1>Order History</h1>
      <div>
        {loading && (
          <div className="dflex center" style={{ height: "100%" }}>
            {" "}
            <MessageBox />
          </div>
        )}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{String(order.createdAt).substring(0, 10)}</td>
                <td>{order.totalPrice?.toFixed(2)}</td>
                <td>
                  {order.isPaid ? String(order.paidAt).substring(0, 10) : "No"}
                </td>
                <td>
                  {order.isDelivered
                    ? String(order.deliveredAt).substring(0, 10)
                    : "No"}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
