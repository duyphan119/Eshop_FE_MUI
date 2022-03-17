import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: [],
};
const groupCategorySlice = createSlice({
  name: "groupCategory",
  initialState: initialState,
  reducers: {
    getAllGroupCategories: (state, action) => {
      state.list = action.payload;
    },
  },
});
export const { getAllGroupCategories } = groupCategorySlice.actions;
export default groupCategorySlice.reducer;
