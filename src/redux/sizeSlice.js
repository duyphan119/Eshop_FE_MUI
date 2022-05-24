import { createSlice } from "@reduxjs/toolkit";
import { LIMIT_ROW_SIZE } from "../constants";
const initialState = {
  list: [],
  page: 1,
  limit: LIMIT_ROW_SIZE,
  current: null,
  all: [],
};
const sizeSlice = createSlice({
  name: "size",
  initialState: initialState,
  reducers: {
    getAll: (state, action) => {
      state.all = action.payload;
    },
    getAllSizes: (state, action) => {
      state.list = action.payload;
    },
    addSize: (state, action) => {
      state.list = [action.payload, ...state.list];
      state.page = 1;
    },
    updateSize: (state, action) => {
      const newSize = action.payload;
      const index = state.list.findIndex((item) => item.id === newSize.id);
      state.list[index] = newSize;
      state.current = null;
    },
    deleteSize: (state) => {
      state.list = state.list.filter((item) => item.id !== state.current.id);
      state.current = null;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    getCurrentSize: (state, action) => {
      state.current = action.payload;
    },
  },
});
export const {
  getAllSizes,
  addSize,
  changePage,
  getCurrentSize,
  updateSize,
  deleteSize,
  getAll,
} = sizeSlice.actions;
export default sizeSlice.reducer;
