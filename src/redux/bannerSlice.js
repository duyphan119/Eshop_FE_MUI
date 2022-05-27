import { createSlice } from "@reduxjs/toolkit";
import { LIMIT_ROW_COLOR } from "../constants";
const initialState = {
  list: [],
  page: 1,
  limit: LIMIT_ROW_COLOR,
  current: null,
  all: [],
};
const bannerSlice = createSlice({
  name: "banner",
  initialState: initialState,
  reducers: {
    getAll: (state, action) => {
      state.all = action.payload;
    },
    getAllBanners: (state, action) => {
      state.list = action.payload;
    },
    addBanner: (state, action) => {
      state.list = [action.payload, ...state.list];
    },
    updateBanner: (state, action) => {
      const newBanner = action.payload;
      const index = state.list.findIndex((item) => item.id === newBanner.id);
      state.list[index] = newBanner;
      state.current = null;
    },
    deleteBanner: (state) => {
      state.list = state.list.filter((item) => item.id !== state.current.id);
      state.current = null;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    getCurrentBanner: (state, action) => {
      state.current = action.payload;
    },
  },
});
export const {
  getAllColors,
  addColor,
  changePage,
  getCurrentBanner,
  updateColor,
  deleteColor,
  getAll,
} = bannerSlice.actions;
export default bannerSlice.reducer;
