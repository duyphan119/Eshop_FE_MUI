import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: [],
};
const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    getOrders: (state, action) => {
      state.list = action.payload;
    },
  },
});
export const { getOrders } = orderSlice.actions;
export default orderSlice.reducer;
