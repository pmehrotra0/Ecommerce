import { createSlice } from "@reduxjs/toolkit";

const checkoutInitialState = {
  productList: [],
  userDetails: {
    name: null,
    id: null,
    email: null,
  },
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: checkoutInitialState,
  reducers: {
    resetCheckout: (state, { payload }) => {
      state.productList = [];
    },
    checkCheckout: (state, { payload }) => {
      state.productList = [
        ...state.productList,
        { name: "p1", price: 120, quantity: 10 },
      ];
    },
    addProduct: (state, { payload }) => {
      state.productList = payload;
    },
    addUserDetails: (state, { payload }) => {
      state.userDetails = payload;
    },
  },
});

export const { resetCheckout, checkCheckout, addProduct, addUserDetails } =
  checkoutSlice.actions;

export default checkoutSlice.reducer;
