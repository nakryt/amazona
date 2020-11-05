import Axios from "axios";

const getData = async () => {
  return (await Axios.get("/api/products")).data;
};

const getProductDetail = async (productId: string) => {
  return (await Axios.get(`/api/products/${productId}`)).data;
};

const api = {
  getData,
  getProductDetail,
};

export default api;
