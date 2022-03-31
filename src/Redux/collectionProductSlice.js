import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: [],
};
const collectionProductSlice = createSlice({
  name: "collectionProduct",
  initialState: initialState,
  reducers: {
    getAllCollectionProducts: (state, action) => {
      state.list = action.payload;
    },
  },
});
export const { getAllCollectionProducts } = collectionProductSlice.actions;
export default collectionProductSlice.reducer;
