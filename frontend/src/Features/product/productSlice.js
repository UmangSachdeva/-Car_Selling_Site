import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../Redux/api";
import { useSelector } from "react-redux";

const initialState = {
  products: [],
  loading: false,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProducts: (products, action) => {
      products.loading = true;
    },
    productRecieved: (products, action) => {
      products.products = action.payload;
      products.loading = false;
    },
    productRequestFailed: (products, action) => {
      products.loading = false;
    },
    setProductQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export default productSlice.reducer;

export const {
  fetchProducts,
  productRecieved,
  productRequestFailed,
  setProductQuery,
} = productSlice.actions;

export const loadProducts = (query) => (dispatch) => {
  let url = "/cars/";

  if (query) {
    const qs = new URLSearchParams(query);
    url = url + "?" + qs;
    console.log(url);
  }

  return dispatch(
    apiCallBegan({
      url,
      onStart: fetchProducts.type,
      onSuccess: productRecieved.type,
      onError: productRequestFailed.type,
    })
  );
};
