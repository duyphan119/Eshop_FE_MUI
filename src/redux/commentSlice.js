import { createSlice } from "@reduxjs/toolkit";
import { LIMIT_COMMENT } from "../constants";
const initialState = {
  list: [],
  page: 1,
  limit: LIMIT_COMMENT,
  current: null,
};
const commentSlice = createSlice({
  name: "comment",
  initialState: initialState,
  reducers: {
    getAllComments: (state, action) => {
      state.list = action.payload;
    },
    addComment: (state, action) => {
      if (state.list.findIndex((item) => item.id === action.payload.id) === -1)
        state.list = [action.payload, ...state.list];
    },
    updateComment: (state, action) => {
      const newComment = action.payload;
      const index = state.list.findIndex((item) => item.id === newComment.id);
      state.list[index] = newComment;
      state.current = null;
    },
    deleteComment: (state) => {
      state.list = state.list.filter((item) => item.id !== state.current.id);
      state.current = null;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    getCurrentComment: (state, action) => {
      state.current = action.payload;
    },
  },
});
export const {
  getAllComments,
  addComment,
  changePage,
  getCurrentComment,
  updateComment,
  deleteComment,
} = commentSlice.actions;
export default commentSlice.reducer;
