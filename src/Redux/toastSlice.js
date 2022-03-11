import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  toastMessage: {
    text: "",
    type: "",
    title: "",
    isOpen: false,
  },
};
const toastSlice = createSlice({
  name: "toast",
  initialState: initialState,
  reducers: {
    showToastMessage: (state, action) => {
      state.toastMessage = action.payload;
    },
  },
});
export const { showToastMessage } = toastSlice.actions;
export default toastSlice.reducer;
