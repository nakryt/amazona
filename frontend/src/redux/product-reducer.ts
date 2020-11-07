import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./store";

import { Products, Product } from "../../../types/product";
import productAPI from "../api/product-api";

interface ProductState {
  data: Products;
  error: string;
  loading: boolean;
  productDetail: { data: Product | null; loading: boolean; error: string };
}

const initialState: ProductState = {
  data: [],
  error: "",
  loading: true,
  productDetail: {
    data: null,
    loading: true,
    error: "",
  },
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
    },
    success: (state, { payload }: PayloadAction<Products>) => {
      state.data = payload;
      state.loading = false;
    },
    fail: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.loading = false;
    },
    productDetailRequest: (state) => {
      state.productDetail.loading = true;
      state.productDetail.error = "";
    },
    productDetailSuccess: (state, { payload }: PayloadAction<Product>) => {
      state.productDetail.data = payload;
      state.productDetail.loading = false;
    },
    productDetailFail: (state, { payload }: PayloadAction<string>) => {
      state.productDetail.error = payload;
      state.productDetail.loading = false;
    },
  },
});

export const {
  request,
  success,
  fail,
  productDetailRequest,
  productDetailSuccess,
  productDetailFail,
} = productSlice.actions;

export const getListProduct = (): AppThunk => async (dispatch) => {
  try {
    dispatch(request());
    const data = await productAPI.getData();
    dispatch(success(data));
  } catch (err) {
    dispatch(fail(err.message));
  }
};

export const getProductDetail = (productId: string): AppThunk => async (
  dispatch
) => {
  dispatch(productDetailRequest());
  try {
    const data = await productAPI.getProductDetail(productId);
    dispatch(productDetailSuccess(data));
  } catch (err) {
    if (err.response && err.response.data.message) {
      dispatch(productDetailFail(err.response.data.message));
    } else {
      dispatch(productDetailFail(err.message));
    }
  }
};

export const data = (state: RootState) => state.products.data;
export const loading = (state: RootState) => state.products.loading;
export const error = (state: RootState) => state.products.error;
export const productDetail = (state: RootState) => state.products.productDetail;
export const productDetailData = (state: RootState) =>
  state.products.productDetail.data;
export const productDetailLoading = (state: RootState) =>
  state.products.productDetail.loading;
export const productDetailError = (state: RootState) =>
  state.products.productDetail.error;

export default productSlice.reducer;
