import { createSlice } from "@reduxjs/toolkit";
import { LIMIT_ROW_ORDER } from "../constants";
const initialState = {
  list: [],
  page: 1,
  limit: LIMIT_ROW_ORDER,
  current: null,
  totalPage: 0,
};
const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    getOrders: (state, action) => {
      console.log(action.payload);
      state.list = action.payload.items;
      state.totalPage = action.payload.total_page;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    getCurrentOrder: (state, action) => {
      state.current = action.payload;
    },
    updateOrder: (state, action) => {
      const newOrder = action.payload;
      const index = state.list.findIndex((item) => item.id === newOrder.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...newOrder };
      }
      state.current = null;
    },
  },
});
export const { getOrders, getCurrentOrder, changePage, updateOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
