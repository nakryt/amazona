import Axios from "axios";

// TODO: change type of order
const orderRequest = async (order: any, token: string) => {
  return (
    await Axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

const getOrders = async (token: string) => {
  return (
    await Axios.get(`/api/orders/mine`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

const getOrderDetail = async (id: string, token: string) => {
  return (
    await Axios.get(`/api/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

const orderAPI = {
  orderRequest,
  getOrders,
  getOrderDetail,
};

export default orderAPI;
