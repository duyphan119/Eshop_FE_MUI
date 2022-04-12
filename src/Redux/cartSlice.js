import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: JSON.parse(localStorage.getItem("shop-of-duy:cart")),
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    getCart: (state, action) => {
      state.list = action.payload;
      localStorage.setItem("shop-of-duy:cart", JSON.stringify(state.list));
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      let index = state.list.findIndex(
        (item) => item.sizeId === newItem.sizeId
      );
      if (index !== -1) {
        state.list[index] = newItem;
      } else {
        state.list.push(newItem);
      }
      localStorage.setItem("shop-of-duy:cart", JSON.stringify(state.list));
    },
    updateCart: (state, action) => {
      const newItem = action.payload;
      let index = state.list.findIndex(
        (item) => item.Product_Color_Size.id === newItem.Product_Color_Size.id
      );
      if (index !== -1) {
        state.list[index] = newItem;
      }
      localStorage.setItem("shop-of-duy:cart", JSON.stringify(state.list));
    },
    removeCartItem: (state, action) => {
      const id = action.payload;
      state.list = state.list.filter((item) => item.id !== id);
      localStorage.setItem("shop-of-duy:cart", JSON.stringify(state.list));
    },
  },
});
export const { getCart, addToCart, updateCart, removeCartItem } =
  cartSlice.actions;
export default cartSlice.reducer;
