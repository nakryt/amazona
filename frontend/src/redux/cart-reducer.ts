import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./store";

import { CartItem } from "../../../types/types";
import { Product } from "../../../types/product";
import productAPI from "../api/product-api";

interface CartState {
  cartItems: Array<CartItem>;
}

const localItems = localStorage.getItem("cartItems");
const initialState: CartState = {
  cartItems: localItems ? JSON.parse(localItems) : [],
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
    success: (state, { payload }: PayloadAction) => {},
  },
});

export const { addItem, deleteItem } = cartSlice.actions;

export const addCartItem = (productId: string, qty: number): AppThunk => async (
  dispatch,
  getState
) => {
  const data: Product = await productAPI.getProductDetail(productId);
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
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const deleteCartItem = (productId: string): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(deleteItem(productId));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// export const getProductDetail = (productId: string): AppThunk => async (
//   dispatch
// ) => {
//   dispatch(productDetailRequest());
//   try {
//     const data = await productAPI.getProductDetail(productId);
//     dispatch(productDetailSuccess(data));
//   } catch (err) {
//     if (err.response && err.response.data.message) {
//       dispatch(productDetailFail(err.response.data.message));
//     } else {
//       dispatch(productDetailFail(err.message));
//     }
//   }
// };

export const cartItems = (state: RootState) => state.cart.cartItems;

export default cartSlice.reducer;
