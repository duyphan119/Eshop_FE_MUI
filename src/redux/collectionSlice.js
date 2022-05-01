import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: [],
  main: null,
};
const collectionSlice = createSlice({
  name: "collection",
  initialState: initialState,
  reducers: {
    getAllCollections: (state, action) => {
      state.list = action.payload;
    },
    getMainCollection: (state, action) => {
      state.main = action.payload;
    },
  },
});
export const { getAllCollections, getMainCollection } = collectionSlice.actions;
export default collectionSlice.reducer;
