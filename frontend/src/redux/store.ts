import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import products from "./product-reducer";
import cart from "./cart-reducer";
import user from "./user-reducer";

export const store = configureStore({
  reducer: {
    products,
    cart,
    user,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
