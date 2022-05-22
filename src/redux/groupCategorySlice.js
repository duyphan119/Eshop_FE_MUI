import { createSlice } from "@reduxjs/toolkit";
import { LIMIT_ROW_GROUP_CATEGORY } from "../constants";
const initialState = {
  list: [],
  limit: LIMIT_ROW_GROUP_CATEGORY,
  page: 1,
  current: null,
};
const groupCategorySlice = createSlice({
  name: "groupCategory",
  initialState: initialState,
  reducers: {
    getAllGroupCategories: (state, action) => {
      state.list = action.payload;
    },
    addGroupCategory: (state, action) => {
      state.list = [action.payload, ...state.list];
      state.page = 1;
    },
    updateGroupCategory: (state, action) => {
      const newGroupCategory = action.payload;
      const index = state.list.findIndex(
        (item) => item.id === newGroupCategory.id
      );
      state.list[index] = newGroupCategory;
      state.current = null;
    },
    deleteGroupCategory: (state) => {
      state.list = state.list.filter((item) => item.id !== state.current.id);
      state.current = null;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    getCurrentGroupCategory: (state, action) => {
      state.current = action.payload;
    },
  },
});
export const {
  getAllGroupCategories,
  addGroupCategory,
  updateGroupCategory,
  changePage,
  getCurrentGroupCategory,
  deleteGroupCategory,
} = groupCategorySlice.actions;
export default groupCategorySlice.reducer;
