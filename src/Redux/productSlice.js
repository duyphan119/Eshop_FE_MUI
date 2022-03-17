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
  },
});
export const { getProducts } = productSlice.actions;
export default productSlice.reducer;
