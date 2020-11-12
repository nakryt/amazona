import { Result } from "./../../../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./store";

import cartAPI from "../api/cart-api";
import { clearCart, initialShippingAddress } from "./cart-reducer";
import { Order } from "../../../types/product";
import { Schema } from "mongoose";

type AdditionalData = {
  data: Partial<Order>[];
  taxRate: number;
  success: boolean;
  loading: boolean;
  error: string;
};
type OrderState = AdditionalData & Partial<Order>;
const initialOrder = {
  cartItems: [],
  shippingAddress: initialShippingAddress,
  paymentMethod: "PayPal",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  isPaid: false,
  paidAt: undefined,
  isDelivered: false,
  deliveredAt: undefined,
  user: null,
  createdAt: undefined,
  updatedAt: undefined,
};
const initialState: OrderState = {
  data: [],
  taxRate: 0.15,
  success: false,
  loading: false,
  error: "",
};

// cartItems: [{_id: "5fac7fab5584884ed833b4dd", name: "Nike Slim Shirt", image: "/images/p1.jpg", price: 120,…},…]
// createdAt: "2020-11-12T00:19:55.037Z"
// isDelivered: false
// isPaid: false
// itemsPrice: 780
// paymentMethod: "PayPal"
// shippingAddress: {fullName: "Vova Pestov", address: "Timirazeva, 92", city: "Kamenets-Podolsky", postalCode: "32301",…}
// shippingPrice: 0
// taxPrice: 117
// totalPrice: 897
// updatedAt: "2020-11-12T00:19:55.037Z"
// user: "5fa6b54dcecb22aada804dae"
// __v: 0
// _id: "5fac7fab5584884ed833b4dc"

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
    },
    success: (state, { payload }: PayloadAction<Order>) => {
      state.data = [payload, ...state.data];
      state.loading = false;
      state.success = true;
    },
    fail: (state, { payload }: PayloadAction<string>) => {
      state.loading = false;
      state.error = payload;
    },
    reset: (state, { payload }: PayloadAction) => {
      // state = initialState;
    },
    // calculate: (state) => {
    //   const itemsPrice =
    //     state.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    //   const shippingPrice = itemsPrice > 100 ? 0 : 10;
    //   const taxPrice = state.taxRate * state.itemsPrice;
    //   const totalPrice = itemsPrice + shippingPrice + taxPrice;

    //   state.itemsPrice = itemsPrice;
    //   state.shippingPrice = shippingPrice
    //   state.taxPrice = taxPrice
    //   state.totalPrice = totalPrice
    // }
  },
});

export const { request, success, fail, reset } = orderSlice.actions;

// TODO: change type of order
export const createOrder = (order: Partial<OrderState>): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(request());
  try {
    const token = getState().user.data?.token || "";
    const data = await cartAPI.orderRequest(order, token);
    dispatch(success(data.order));
    dispatch(clearCart());
    return data.order._id;
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch(fail(message));
  }
};

export const ordersSelector = (state: RootState) => state.order.data;
export const errorSelector = (state: RootState) => state.order.error;
export const successSelector = (state: RootState) => state.order.success;
export const loadingSelector = (state: RootState) => state.order.loading;

export default orderSlice.reducer;
