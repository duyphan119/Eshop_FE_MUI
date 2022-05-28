import { createSlice } from "@reduxjs/toolkit";
import { LIMIT_ROW_COLOR } from "../constants";
const initialState = {
  list: [],
  page: 1,
  limit: LIMIT_ROW_COLOR,
  current: null,
  all: [],
};
const colorSlice = createSlice({
  name: "color",
  initialState: initialState,
  reducers: {
    getAll: (state, action) => {
      state.all = action.payload;
    },
    getAllColors: (state, action) => {
      state.list = action.payload;
    },
    addColor: (state, action) => {
      state.list = [action.payload, ...state.list];
    },
    updateColor: (state, action) => {
      const newColor = action.payload;
      const index = state.list.findIndex((item) => item.id === newColor.id);
      state.list[index] = newColor;
      state.current = null;
    },
    deleteColor: (state) => {
      state.list = state.list.filter((item) => item.id !== state.current.id);
      state.current = null;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    getCurrentColor: (state, action) => {
      state.current = action.payload;
    },
  },
});
export const {
  getAllColors,
  addColor,
  changePage,
  getCurrentColor,
  updateColor,
  deleteColor,
  getAll,
} = colorSlice.actions;
export default colorSlice.reducer;