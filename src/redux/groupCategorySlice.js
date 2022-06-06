import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  current: null,
  all: [],
};
const groupCategorySlice = createSlice({
  name: "groupCategory",
  initialState: initialState,
  reducers: {
    getAllGroupCategories: (state, action) => {
      state.all = action.payload;
    },
    addGroupCategory: (state, action) => {
      state.all = [action.payload, ...state.all];
    },
    updateGroupCategory: (state, action) => {
      const newGroupCategory = action.payload;
      const index = state.all.findIndex(
        (item) => item.id === newGroupCategory.id
      );
      state.all[index] = newGroupCategory;
      state.current = null;
    },
    deleteGroupCategory: (state, action) => {
      state.all = state.all.filter((item) => item.id !== action.payload);
      state.current = null;
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
  getCurrentGroupCategory,
  deleteGroupCategory,
} = groupCategorySlice.actions;
export default groupCategorySlice.reducer;
