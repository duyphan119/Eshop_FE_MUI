import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import categorySlice from "./categorySlice";
import groupCategorySlice from "./groupCategorySlice";
import productSlice from "./productSlice";
import toastSlice from "./toastSlice";
import orderSlice from "./orderSlice";
import genderCategorySlice from "./genderCategorySlice";
import sizeSlice from "./sizeSlice";
import colorSlice from "./colorSlice";
import materialSlice from "./materialSlice";
import commentSlice from "./commentSlice";
import wishlistSlice from "./wishlistSlice";
import userSlice from "./userSlice";
import roleSlice from "./roleSlice";
import bannerSlice from "./bannerSlice";
import notificationSlice from "./notificationSlice";
import discountCategorySlice from "./discountCategorySlice";

const store = configureStore({
  reducer: {
    category: categorySlice,
    auth: authSlice,
    toast: toastSlice,
    product: productSlice,
    cart: cartSlice,
    groupCategory: groupCategorySlice,
    order: orderSlice,
    genderCategory: genderCategorySlice,
    size: sizeSlice,
    color: colorSlice,
    material: materialSlice,
    comment: commentSlice,
    role: roleSlice,
    user: userSlice,
    wishlist: wishlistSlice,
    banner: bannerSlice,
    notification: notificationSlice,
    discountCategory: discountCategorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
