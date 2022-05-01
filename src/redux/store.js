import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import buyerTypeSlice from "./buyerTypeSlice";
import cartSlice from "./cartSlice";
import categorySlice from "./categorySlice";
import groupCategorySlice from "./groupCategorySlice";
import productSlice from "./productSlice";
import toastSlice from "./toastSlice";
import wishlistSlice from "./wishlistSlice";
import orderSlice from "./orderSlice";
import collectionSlice from "./collectionSlice";
import genderCategorySlice from "./genderCategorySlice";

const store = configureStore({
  reducer: {
    category: categorySlice,
    auth: authSlice,
    toast: toastSlice,
    buyerType: buyerTypeSlice,
    product: productSlice,
    cart: cartSlice,
    groupCategory: groupCategorySlice,
    wishlist: wishlistSlice,
    collection: collectionSlice,
    order: orderSlice,
    genderCategory: genderCategorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
