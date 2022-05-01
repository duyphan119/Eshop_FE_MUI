import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: JSON.parse(localStorage.getItem("shop-of-duy:wishlist")),
};
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers: {
    getWishlist: (state, action) => {
      state.list = action.payload;
      localStorage.setItem("shop-of-duy:wishlist", JSON.stringify(state.list));
    },
    addToWishlist: (state, action) => {
      const newItem = action.payload;
      let index = state.list.findIndex((item) => item.product.slug === newItem.slug);
      if (index !== -1) {
        state.list[index] = newItem;
      } else {
        state.list.push(newItem);
      }
      localStorage.setItem("shop-of-duy:wishlist", JSON.stringify(state.list));
    },
    updateWishlist: (state, action) => {
      const newItem = action.payload;
      let index = state.list.findIndex((item) => item.product.slug === newItem.slug);
      if (index !== -1) {
        state.list[index] = newItem;
      }
      localStorage.setItem("shop-of-duy:wishlist", JSON.stringify(state.list));
    },
    removeWishlistItem: (state, action) => {
      const id = action.payload;
      state.list = state.list.filter((item) => item.id !== id);
      localStorage.setItem("shop-of-duy:wishlist", JSON.stringify(state.list));
    },
    removeWishlistItemByProductSlug: (state, action) => {
      const productSlug = action.payload;
      state.list = state.list.filter((item) => item.productSlug !== productSlug);
      localStorage.setItem("shop-of-duy:wishlist", JSON.stringify(state.list));
    },
  },
});
export const { getWishlist, addToWishlist, updateWishlist, removeWishlistItem, removeWishlistItemByProductSlug } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
