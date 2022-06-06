import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  current: null,
  all: [],
};
const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    getAllCategories: (state, action) => {
      state.all = action.payload;
    },
    addCategory: (state, action) => {
      state.all = [action.payload, ...state.all];
    },
    updateCategory: (state, action) => {
      const newCategory = action.payload;
      const index = state.all.findIndex((item) => item.id === newCategory.id);
      state.all[index] = newCategory;
      state.current = null;
    },
    deleteCategory: (state) => {
      state.all = state.all.filter((item) => item.id !== state.current.id);
      state.current = null;
    },
    getCurrentCategory: (state, action) => {
      state.current = action.payload;
    },
  },
});
export const {
  getAllCategories,
  addCategory,
  getCurrentCategory,
  updateCategory,
  deleteCategory,
} = categorySlice.actions;
export default categorySlice.reducer;
