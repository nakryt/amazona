import Axios from "axios";

const signIn = async (email: string, password: string) => {
  return (await Axios.post("/api/users/signin", { email, password })).data;
};

const register = async (name: string, email: string, password: string) => {
  return (await Axios.post("/api/users/register", { name, email, password }))
    .data;
};

const getUserDetail = async (userId: string, token: string) => {
  return (
    await Axios.get(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

const userAPI = {
  signIn,
  register,
  getUserDetail,
};

export default userAPI;
