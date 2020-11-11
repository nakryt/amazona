import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./store";

import { CartItem, ShippingAddress, PaymentMethod } from "../../../types/types";
import { IProduct } from "../../../types/product";
import productAPI from "../api/product-api";

interface CartState {
  cartItems: Array<CartItem>;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  loading: boolean;
}

const localStorageCart = localStorage.getItem("cartItems");
const localShippingAddress = localStorage.getItem("shippingAddress");
const initialShippingAddress = {
  fullName: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
};
const initialState: CartState = {
  cartItems: localStorageCart ? JSON.parse(localStorageCart) : [],
  shippingAddress: localShippingAddress
    ? JSON.parse(localShippingAddress)
    : initialShippingAddress,
  paymentMethod: "PayPal",
  loading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, { payload }: PayloadAction<CartItem>) => {
      const existItem = state.cartItems.find(
        (item) => item.product === payload.product
      );
      if (existItem) {
        state.cartItems = state.cartItems.map((item) =>
          item.product === payload.product ? payload : item
        );
      } else {
        state.cartItems = [...state.cartItems, payload];
      }
    },
    deleteItem: (state, { payload }: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    clearShippingAddress: (state) => {
      state.shippingAddress = initialShippingAddress;
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    saveShippingAddressAction: (
      state,
      { payload }: PayloadAction<ShippingAddress>
    ) => {
      state.shippingAddress = payload;
    },
    setPaymentMethod: (state, { payload }: PayloadAction<PaymentMethod>) => {
      state.paymentMethod = payload;
    },
    // TODO: success cart action
    success: (state, { payload }: PayloadAction) => {},
  },
});

export const {
  addItem,
  deleteItem,
  clearCart,
  clearShippingAddress,
  setLoading,
  saveShippingAddressAction,
  setPaymentMethod,
} = cartSlice.actions;

export const addCartItem = (productId: string, qty: number): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(setLoading(true));
  const data: IProduct = await productAPI.getProductDetail(productId);
  const { name, image, price, countInStock, _id } = data;
  dispatch(
    addItem({
      name,
      image,
      price,
      countInStock,
      product: _id,
      qty,
    })
  );
  dispatch(setLoading(false));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const deleteCartItem = (productId: string): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(deleteItem(productId));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data: ShippingAddress): AppThunk => async (
  dispatch
) => {
  dispatch(saveShippingAddressAction(data));
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
export const savePaymentMethod = (method: PaymentMethod): AppThunk => (
  dispatch
) => {
  dispatch(setPaymentMethod(method));
};

export const cartItems = (state: RootState) => state.cart.cartItems;
export const shippingAddress = (state: RootState) => state.cart.shippingAddress;
export const paymentMethod = (state: RootState) => state.cart.paymentMethod;
export const loading = (state: RootState) => state.cart.loading;

export default cartSlice.reducer;
