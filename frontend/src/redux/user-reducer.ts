import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./store";

import { clearCart, clearShippingAddress } from "./cart-reducer";
import userAPI from "../api/user-api";
import { IUser } from "../../../types/user";

interface UserState {
  data: IUser | null;
  error: string;
  loading: boolean;
}

const data = localStorage.getItem("userInfo");
const initialState: UserState = {
  data: data ? JSON.parse(data) : null,
  error: "",
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
    },
    success: (state, { payload }: PayloadAction<IUser>) => {
      state.data = payload;
      state.loading = false;
      state.error = "";
    },
    fail: (state, { payload }: PayloadAction<string>) => {
      state.loading = false;
      state.error = payload;
    },
    signOutAction: (state) => {
      state.data = null;
    },
  },
});

export const { request, success, fail, signOutAction } = userSlice.actions;

export const signIn = (email: string, password: string): AppThunk => async (
  dispatch
) => {
  dispatch(request());
  try {
    const data = await userAPI.signIn(email, password);
    dispatch(success(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    if (err.response && err.response.data.message) {
      dispatch(fail(err.response.data.message));
    } else {
      dispatch(fail(err.message));
    }
  }
};

export const signOut = (): AppThunk => async (dispatch) => {
  dispatch(signOutAction());
  dispatch(clearCart());
  dispatch(clearShippingAddress());
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
};

export const register = (
  name: string,
  email: string,
  password: string
): AppThunk => async (dispatch) => {
  dispatch(request());
  try {
    const data = await userAPI.register(name, email, password);
    dispatch(success(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    if (err.response && err.response.data.message) {
      dispatch(fail(err.response.data.message));
    } else {
      dispatch(fail(err.message));
    }
  }
};

export const getUserDetails = (id: string): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(request());
  const user = getState().user.data;
  try {
    if (user) {
      const data = await userAPI.getUserDetail(user._id, user.token);
      // dispatch();
    }
  } catch (err) {
    dispatch(fail(err.message));
  }
};

export const userInfo = (state: RootState) => state.user.data;
export const error = (state: RootState) => state.user.error;
export const loading = (state: RootState) => state.user.loading;

export default userSlice.reducer;
