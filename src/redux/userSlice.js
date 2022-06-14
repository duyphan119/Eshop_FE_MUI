import { createSlice } from "@reduxjs/toolkit";
import { LIMIT_ROW_USER } from "../constants";
const initialState = {
  all: [],
  current: null,
  user: {
    items: [],
    totalResult: 0,
    totalPage: 0,
    limit: LIMIT_ROW_USER,
  },
  limit: LIMIT_ROW_USER,
  page: 1,
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
      const data = action.payload;
      if (state.user.items) {
        const index = state.user.items.findIndex((item) => item.id === data.id);
        if (index === -1) {
          state.user = {
            items: [
              data,
              ...state.user.items.splice(state.user.items.length - 1, 1),
            ],
            limit: LIMIT_ROW_USER,
            total_result: state.user.items.length + 1,
            total_page: Math.ceil(
              (state.user.items.length + 1) / LIMIT_ROW_USER
            ),
          };
        } else {
          state.user.items[index] = {
            ...state.user.items[index],
            ...data,
          };
        }
      } else {
        state.user = {
          items: [data],
          limit: LIMIT_ROW_USER,
          total_result: 1,
          total_page: 1,
        };
      }
    },
    updateUser: (state, action) => {
      const newItem = action.payload;
      const index = state.user.items.findIndex(
        (item) => item.id === newItem.id
      );
      if (index !== -1) {
        state.user.items[index] = {
          ...state.user.items[index],
          ...newItem,
        };
      }
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      state.user = {
        items: [...state.user.items].filter((item) => item.id !== id),
        total_result: state.user.items.length - 1,
        total_page: Math.ceil((state.user.items.length - 1) / LIMIT_ROW_USER),
        limit: LIMIT_ROW_USER,
      };
    },
    getCurrentUser: (state, action) => {
      state.current = action.payload;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changeLimit: (state, action) => {
      state.limit = action.payload;
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
  changeLimit,
} = userSlice.actions;
export default userSlice.reducer;
