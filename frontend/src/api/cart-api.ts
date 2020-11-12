import Axios from "axios";

// import { OrderData } from "../redux/order-reducer";

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

const cartAPI = {
  orderRequest,
};

export default cartAPI;
