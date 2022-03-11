import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: JSON.parse(localStorage.getItem("shop-of-duy:user")),
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem(
        "shop-of-duy:user",
        JSON.stringify(state.currentUser)
      );
    },
    logout: (state, action) => {
      localStorage.setItem("shop-of-duy:user", null);
      state.currentUser = null;
    },
    refreshToken: (state, action) => {
      state.currentUser.accessToken = action.payload;
      localStorage.setItem(
        "shop-of-duy:user",
        JSON.stringify(state.currentUser)
      );
    },
    updateUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
      localStorage.setItem(
        "shop-of-duy:user",
        JSON.stringify(state.currentUser)
      );
    },
  },
});
export const { login, logout, refreshToken, updateUser } = authSlice.actions;
export default authSlice.reducer;
