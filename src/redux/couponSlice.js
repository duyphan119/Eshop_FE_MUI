import { createSlice } from "@reduxjs/toolkit";
import { LIMIT_ROW_COUPON } from "../constants";
const initialState = {
  current: null,
  all: [],
  coupon: {
    items: [],
    totalResult: 0,
    totalPage: 0,
    limit: LIMIT_ROW_COUPON,
  },
  page: 1,
  limit: LIMIT_ROW_COUPON,
};
const couponSlice = createSlice({
  name: "coupon",
  initialState: initialState,
  reducers: {
    getCoupon: (state, action) => {
      state.coupon = action.payload;
    },
    getCurrentCoupon: (state, action) => {
      state.current = action.payload;
    },
    addCoupon: (state, action) => {
      const data = action.payload;
      state.coupon = {
        items:
          state.coupon.items.length === state.limit
            ? [
                data,
                ...state.coupon.items.splice(0, state.coupon.items.length - 1),
              ]
            : [data, ...state.coupon.items],
        total_result: state.coupon.total_result + 1,
        total_page: Math.ceil((state.coupon.total_result + 1) / state.limit),
        limit: state.limit,
      };
    },
    updateCoupon: (state, action) => {
      const data = action.payload;
      const index = state.coupon.items.findIndex((item) => item.id === data.id);
      if (index !== -1) {
        state.coupon.items[index] = {
          ...state.coupon.items[index],
          ...data,
        };
      }
    },
    deleteCoupon: (state, action) => {
      const id = action.payload;
      state.coupon = {
        items: state.coupon.items.filter((item) => item.id !== id),
        total_result: state.coupon.total_result - 1,
        total_page: Math.ceil((state.coupon.total_result - 1) / state.limit),
        limit: state.limit,
      };
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changeLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
});
export const {
  getCoupon,
  getCurrentCoupon,
  addCoupon,
  updateCoupon,
  deleteCoupon,
  changePage,
  changeLimit,
} = couponSlice.actions;
export default couponSlice.reducer;
