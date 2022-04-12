import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: null,
};
const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    getProducts: (state, action) => {
      state.list = [...action.payload];
    },
    getSortedProducts: (state, action) => {
      console.log(action.payload);
    },
  },
});
export const { getProducts, getSortedProducts } = productSlice.actions;
export default productSlice.reducer;
