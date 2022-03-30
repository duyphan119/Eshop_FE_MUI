import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  toastMessages: [],
};
const toastSlice = createSlice({
  name: "toast",
  initialState: initialState,
  reducers: {
    showToastMessage: (state, action) => {
      state.toastMessages.push(action.payload);
    },
    hideToastMessage: (state) => {
      state.toastMessages.shift();
    },
  },
});
export const { showToastMessage, hideToastMessage } = toastSlice.actions;
export default toastSlice.reducer;
