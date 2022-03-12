import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import buyerTypeSlice from "./buyerTypeSlice";
import cartSlice from "./cartSlice";
import categorySlice from "./categorySlice";
import productSlice from "./productSlice";
import toastSlice from "./toastSlice";
const store = configureStore({
  reducer: {
    category: categorySlice,
    auth: authSlice,
    toast: toastSlice,
    buyerType: buyerTypeSlice,
    product: productSlice,
    cart:cartSlice
  },
});

export default store;
