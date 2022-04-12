import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: [],
};
const genderCategorySlice = createSlice({
  name: "genderCategory",
  initialState: initialState,
  reducers: {
    getAllGenderCategories: (state, action) => {
      state.list = action.payload;
    },
  },
});
export const { getAllGenderCategories } = genderCategorySlice.actions;
export default genderCategorySlice.reducer;
