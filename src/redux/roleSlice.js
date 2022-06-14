import { createSlice } from "@reduxjs/toolkit";
import { LIMIT_ROW_ROLE } from "../constants";
const initialState = {
  all: [],
  current: null,
  role: {
    items: [],
    totalResult: 0,
    totalPage: 0,
    limit: LIMIT_ROW_ROLE,
  },
  limit: LIMIT_ROW_ROLE,
  page: 1,
};
const roleSlice = createSlice({
  name: "role",
  initialState: initialState,
  reducers: {
    getAll: (state, action) => {
      state.all = action.payload;
    },
    getRole: (state, action) => {
      state.role = action.payload;
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
    changeLimit: (state, action) => {
      state.limit = action.payload;
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
  changeLimit,
  getRole,
} = roleSlice.actions;
export default roleSlice.reducer;
