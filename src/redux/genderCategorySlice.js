import { createSlice } from "@reduxjs/toolkit";
import { LIMIT_ROW_GENDER } from "../constants";
const initialState = {
  list: [],
  page: 1,
  limit: LIMIT_ROW_GENDER,
  current: null,
  all: [],
};
const genderCategorySlice = createSlice({
  name: "genderCategory",
  initialState: initialState,
  reducers: {
    getAllGenderCategories: (state, action) => {
      state.list = action.payload;
    },
    getAll: (state, action) => {
      state.all = action.payload;
    },
    addGenderCategory: (state, action) => {
      state.list = [action.payload, ...state.list];
      state.page = 1;
    },
    updateGenderCategory: (state, action) => {
      const newGenderCategory = action.payload;
      const index = state.list.findIndex(
        (item) => item.id === newGenderCategory.id
      );
      state.list[index] = newGenderCategory;
      state.current = null;
    },
    deleteGenderCategory: (state) => {
      state.list = state.list.filter((item) => item.id !== state.current.id);
      state.current = null;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    getCurrentGenderCategory: (state, action) => {
      state.current = action.payload;
    },
  },
});
export const {
  getAllGenderCategories,
  addGenderCategory,
  changePage,
  getCurrentGenderCategory,
  updateGenderCategory,
  deleteGenderCategory,
  getAll,
} = genderCategorySlice.actions;
export default genderCategorySlice.reducer;
