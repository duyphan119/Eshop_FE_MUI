import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  all: [],
  current: null,
};
const orderStatusSlice = createSlice({
  name: "orderStatus",
  initialState: initialState,
  reducers: {
    getAllOrderStatuses: (state, action) => {
      state.all = action.payload;
    },
    getCurrent: (state, action) => {
      state.current = action.payload;
    },
  },
});
export const { getAllOrderStatuses, getCurrent } = orderStatusSlice.actions;
export default orderStatusSlice.reducer;
