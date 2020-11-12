import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./store";

import orderAPI from "../api/order-api";
import { clearCart, initialShippingAddress } from "./cart-reducer";
import { Order as OrderFromBackend } from "../../../types/product";

type Order = Partial<OrderFromBackend>;
type AdditionalData = {
  data: Order[];
  selectedOrder: Order;
  taxRate: number;
  success: boolean;
  loading: boolean;
  error: string;
};
type OrderState = AdditionalData & Order;
const initialOrder = {
  cartItems: [],
  shippingAddress: initialShippingAddress,
  paymentMethod: undefined,
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
  selectedOrder: initialOrder,
  taxRate: 0.15,
  success: false,
  loading: false,
  error: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
      state.success = false;
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
    setSelectedOrder: (state, { payload }: PayloadAction<Order>) => {
      state.selectedOrder = payload;
      state.loading = false;
      state.success = true;
    },
  },
});

export const {
  request,
  success,
  fail,
  reset,
  setSelectedOrder,
} = orderSlice.actions;

export const createOrder = (order: Order): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(request());
  try {
    const token = getState().user.data?.token || "";
    const data = await orderAPI.orderRequest(order, token);
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

export const orderDetail = (id: string): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(request());
  try {
    const token = getState().user.data?.token || "";
    const order = await orderAPI.getOrderDetail(id, token);
    dispatch(setSelectedOrder(order));
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch(fail(message));
  }
};

export const ordersSelector = (state: RootState) => state.order.data;
export const selectedOrder = (state: RootState) => state.order.selectedOrder;
export const errorSelector = (state: RootState) => state.order.error;
export const successSelector = (state: RootState) => state.order.success;
export const loadingSelector = (state: RootState) => state.order.loading;

export default orderSlice.reducer;
