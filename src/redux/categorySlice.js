import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: [],
};
const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    getAllCategories: (state, action) => {
      state.list = action.payload;
    },
  },
});
export const { getAllCategories } = categorySlice.actions;
export default categorySlice.reducer;
