import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: null,
  favoriteList: [],
  current: null,
};
const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    getProducts: (state, action) => {
      state.list = [...action.payload];
    },
    getSortedProducts: (state, action) => {
      console.log(action.payload);
    },
    getFavoriteList: (state, action) => {
      state.favoriteList = [...action.payload];
    },
    removeFavoriteItem: (state, action) => {
      const id = action.payload;
      state.favoriteList = state.favoriteList.filter((item) => item.id === id);
    },
    newFavoriteItem: (state, action) => {
      state.favoriteList.push(action.payload);
    },
    getCurrentProduct: (state, action) => {
      state.current = action.payload;
    },
    newComment: (state, action) => {
      const comment = action.payload;
      const index = state.current.comments.findIndex(
        (item) => item.id === comment.id
      );
      if (index === -1) {
        state.current.comments.push(comment);
      } else {
        state.current.comments[index] = comment;
      }
    },
    updateComment: (state, action) => {
      const comment = action.payload;
      const index = state.current.comments.findIndex(
        (item) => item.id === comment.id
      );
      if (index !== -1) {
        state.current.comments[index] = comment;
      }
    },
    newRepliedComment: (state, action) => {
      const replied_comment = action.payload;
      const index = state.current.comments.replied_comments.findIndex(
        (item) => item.id === replied_comment.id
      );
      if (index === -1) {
        state.current.comments.replied_comments.push(replied_comment);
      } else {
        state.current.comments.replied_comments[index] = replied_comment;
      }
    },
  },
});
export const {
  getProducts,
  getSortedProducts,
  getFavoriteList,
  removeFavoriteItem,
  newFavoriteItem,
  getCurrentProduct,
  newComment,
  updateComment,
  newRepliedComment,
} = productSlice.actions;
export default productSlice.reducer;
