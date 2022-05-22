import { createSlice } from "@reduxjs/toolkit";
import { LOCALSTORAGE_USER_NAME } from "../constants";
const initialState = {
  currentUser: JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_NAME)),
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem(
        LOCALSTORAGE_USER_NAME,
        JSON.stringify(state.currentUser)
      );
    },
    logout: (state) => {
      console.log("logout");
      localStorage.setItem(LOCALSTORAGE_USER_NAME, null);
      state.currentUser = null;
    },
    refreshToken: (state, action) => {
      state.currentUser.access_token = action.payload;
      localStorage.setItem(
        LOCALSTORAGE_USER_NAME,
        JSON.stringify(state.currentUser)
      );
    },
    updateUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
      localStorage.setItem(
        LOCALSTORAGE_USER_NAME,
        JSON.stringify(state.currentUser)
      );
    },
  },
});
export const { login, logout, refreshToken, updateUser } = authSlice.actions;
export default authSlice.reducer;
