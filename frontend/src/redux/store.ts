import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import products from "./product-reducer";

export const store = configureStore({
  reducer: {
    products,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
