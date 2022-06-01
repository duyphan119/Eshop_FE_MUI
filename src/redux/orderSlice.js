import { createSlice } from "@reduxjs/toolkit";
import { LIMIT_ROW_ORDER } from "../constants";
const initialState = {
  list: [],
  page: 1,
  limit: LIMIT_ROW_ORDER,
  current: null,
  totalPage: 0,
  order: null,
};
const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    getOrder: (state, action) => {
      state.order = action.payload;
    },
    newOrder: (state, action) => {
      const data = action.payload;
      if (state.order.items) {
        const index = state.order.items.findIndex(
          (item) => item.id === data.id
        );
        if (index === -1) {
          state.order = {
            items: [
              data,
              ...state.order.items.splice(state.order.items.length - 1, 1),
            ],
            limit: LIMIT_ROW_ORDER,
            total_result: state.order.items.length + 1,
            total_page: Math.ceil(
              (state.order.items.length + 1) / LIMIT_ROW_ORDER
            ),
          };
        } else {
          state.order.items[index] = {
            ...state.order.items[index],
            ...data,
          };
        }
      } else {
        state.order = {
          items: [data],
          limit: LIMIT_ROW_ORDER,
          total_result: 1,
          total_page: 1,
        };
      }
    },
    updateOrder: (state, action) => {
      const newItem = action.payload;
      const index = state.order.items.findIndex(
        (item) => item.id === newItem.id
      );
      if (index !== -1) {
        state.order.items[index] = {
          ...state.order.items[index],
          ...newItem,
        };
      }
    },
    deletedOrder: (state, action) => {
      const id = action.payload;
      state.order = {
        items: [...state.order.items].filter((item) => item.id !== id),
        total_result: state.order.items.length - 1,
        total_page: Math.ceil((state.order.items.length - 1) / LIMIT_ROW_ORDER),
        limit: LIMIT_ROW_ORDER,
      };
    },
    getOrders: (state, action) => {
      state.list = action.payload.items;
      state.totalPage = action.payload.total_page;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    getCurrentOrder: (state, action) => {
      state.current = action.payload;
    },
  },
});
export const {
  getOrders,
  getCurrentOrder,
  changePage,
  updateOrder,
  getOrder,
  deletedOrder,
  newOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
