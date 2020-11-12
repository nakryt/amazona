import { Schema } from "mongoose";
import Axios from "axios";

const getData = async () => {
  return (await Axios.get("/api/products")).data;
};

const getProductDetail = async (productId: Schema.Types.ObjectId | string) => {
  return (await Axios.get(`/api/products/${productId}`)).data;
};

const api = {
  getData,
  getProductDetail,
};

export default api;
