import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  all: [],
  current: null,
  user: null,
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    getAll: (state, action) => {
      state.all = action.payload;
    },
    getUser: (state, action) => {
      state.user = action.payload;
    },
    addUser: (state, action) => {
      state.list = [action.payload, ...state.list];
    },
    updateUser: (state, action) => {
      const newUser = action.payload;
      const index = state.list.findIndex((item) => item.id === newUser.id);
      state.list[index] = newUser;
      state.current = null;
    },
    deleteUser: (state) => {
      state.list = state.list.filter((item) => item.id !== state.current.id);
      state.current = null;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    getCurrentUser: (state, action) => {
      state.current = action.payload;
    },
  },
});
export const {
  addUser,
  changePage,
  getCurrentUser,
  updateUser,
  deleteUser,
  getAll,
  getUser,
} = userSlice.actions;
export default userSlice.reducer;
