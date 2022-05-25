import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  all: [],
};
const roleSlice = createSlice({
  name: "role",
  initialState: initialState,
  reducers: {
    getAll: (state, action) => {
      state.all = action.payload;
    },
    addRole: (state, action) => {
      state.list = [action.payload, ...state.list];
    },
    updateRole: (state, action) => {
      const newRole = action.payload;
      const index = state.list.findIndex((item) => item.id === newRole.id);
      state.list[index] = newRole;
      state.current = null;
    },
    deleteRole: (state) => {
      state.list = state.list.filter((item) => item.id !== state.current.id);
      state.current = null;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    getCurrentRole: (state, action) => {
      state.current = action.payload;
    },
  },
});
export const {
  addRole,
  changePage,
  getCurrentRole,
  updateRole,
  deleteRole,
  getAll,
} = roleSlice.actions;
export default roleSlice.reducer;
