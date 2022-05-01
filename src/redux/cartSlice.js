import { createSlice } from "@reduxjs/toolkit";
import { LOCALSTORAGE_CART_NAME } from "../constants";
const initCart = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));
const initialState = {
  list: initCart ? initCart : [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    getCart: (state, action) => {
      state.list = action.payload;
      localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify(state.list));
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      let index = state.list.findIndex(
        (item) => item.product_color_size.id === newItem.product_color_size.id
      );
      if (index !== -1) {
        state.list[index] = newItem;
      } else {
        state.list.push(newItem);
      }
      localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify(state.list));
    },
    updateCart: (state, action) => {
      const newItem = action.payload;
      let index = state.list.findIndex(
        (item) => item.product_color_size.id === newItem.product_color_size.id
      );
      if (index !== -1) {
        state.list[index] = newItem;
      }
      localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify(state.list));
    },
    removeCartItem: (state, action) => {
      const id = action.payload;
      state.list = state.list.filter((item) => item.id !== id);
      localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify(state.list));
    },
  },
});
export const { getCart, addToCart, updateCart, removeCartItem } =
  cartSlice.actions;
export default cartSlice.reducer;
