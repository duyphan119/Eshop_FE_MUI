import { createSlice } from "@reduxjs/toolkit";
import { LIMIT_ROW_COMMENT_PRODUCT } from "../constants";
const initialState = {
  list: [],
  page: 1,
  limit: LIMIT_ROW_COMMENT_PRODUCT,
  current: null,
  commentProduct: null,
};
const commentProductSlice = createSlice({
  name: "commentProduct",
  initialState: initialState,
  reducers: {
    getAllCommentProducts: (state, action) => {
      state.list = action.payload;
    },
    getCommentProduct: (state, action) => {
      state.commentProduct = action.payload;
    },
    addCommentProduct: (state, action) => {
      if (state.list.findIndex((item) => item.id === action.payload.id) === -1)
        state.list = [action.payload, ...state.list];
    },
    updateCommentProduct: (state, action) => {
      const newCommentProduct = action.payload;
      const index = state.commentProduct.items.findIndex(
        (item) => item.id === newCommentProduct.id
      );
      state.commentProduct.items[index] = {
        ...state.commentProduct.items[index],
        ...newCommentProduct,
      };
    },
    updateRepliedCommentProduct: (state, action) => {
      const data = action.payload;
      const index = state.commentProduct.items.findIndex(
        (item) => item.id === data.commentProduct_id
      );
      if (index !== -1) {
        const index2 = state.commentProduct.items[
          index
        ].replied_commentProducts.findIndex((item) => item.id === data.id);
        if (index2 !== -1)
          state.commentProduct.items[index].replied_commentProducts[index2] = {
            ...state.commentProduct.items[index].replied_commentProducts[
              index2
            ],
            ...data,
          };
      }
    },
    deleteCommentProduct: (state, action) => {
      const id = action.payload;
      state.commentProduct.items = state.commentProduct.items.filter(
        (item) => item.id !== id
      );
    },
    deleteRepliedCommentProduct: (state, action) => {
      const { commentProductId, id } = action.payload;
      const index = state.commentProduct.items.findIndex(
        (item) => item.id === commentProductId
      );
      if (index !== -1) {
        state.commentProduct.items[index].replied_commentProducts =
          state.commentProduct.items[index].replied_commentProducts.filter(
            (item) => item.id !== id
          );
      }
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    getCurrentCommentProduct: (state, action) => {
      state.current = action.payload;
    },
    newRepliedCommentProduct: (state, action) => {
      const data = action.payload;
      // Tìm vị trí cái commentProduct
      const index = state.commentProduct.items.findIndex(
        (item) => item.id === data.commentProduct_id
      );
      if (index !== -1) {
        state.commentProduct.items[index].replied_commentProducts.push(data);
      }
    },
  },
});
export const {
  getAllCommentProducts,
  addCommentProduct,
  changePage,
  getCurrentCommentProduct,
  updateCommentProduct,
  deleteCommentProduct,
  newRepliedCommentProduct,
  updateRepliedCommentProduct,
  deleteRepliedCommentProduct,
  getCommentProduct,
} = commentProductSlice.actions;
export default commentProductSlice.reducer;
