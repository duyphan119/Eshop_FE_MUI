import { createSlice } from "@reduxjs/toolkit";
import { LIMIT_ROW_CATEGORY } from "../constants";
const initialState = {
  list: [],
  page: 1,
  limit: LIMIT_ROW_CATEGORY,
  current: null,
  all: [],
};
const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    getAll: (state, action) => {
      state.all = action.payload;
    },
    getAllCategories: (state, action) => {
      state.list = action.payload;
    },
    addCategory: (state, action) => {
      state.list = [action.payload, ...state.list];
      state.page = 1;
    },
    updateCategory: (state, action) => {
      const newCategory = action.payload;
      const index = state.list.findIndex((item) => item.id === newCategory.id);
      state.list[index] = newCategory;
      state.current = null;
    },
    deleteCategory: (state) => {
      state.list = state.list.filter((item) => item.id !== state.current.id);
      state.current = null;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    getCurrentCategory: (state, action) => {
      state.current = action.payload;
    },
  },
});
export const {
  getAllCategories,
  addCategory,
  changePage,
  getCurrentCategory,
  updateCategory,
  deleteCategory,
  getAll,
} = categorySlice.actions;
export default categorySlice.reducer;
