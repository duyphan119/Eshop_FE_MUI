import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: [],
};
const buyerTypeSlice = createSlice({
  name: "buyerType",
  initialState: initialState,
  reducers: {
    getAllBuyerTypes: (state, action) => {
      state.list = action.payload;
    },
  },
});
export const { getAllBuyerTypes } = buyerTypeSlice.actions;
export default buyerTypeSlice.reducer;
