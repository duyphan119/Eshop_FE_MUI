import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import categoryReducer from "./categorySlice";
import groupCategoryReducer from "./groupCategorySlice";
import productReducer from "./productSlice";
import toastReducer from "./toastSlice";
import orderReducer from "./orderSlice";
import genderCategoryReducer from "./genderCategorySlice";
import sizeReducer from "./sizeSlice";
import colorReducer from "./colorSlice";
import materialReducer from "./materialSlice";
import commentReducer from "./commentSlice";
import wishlistReducer from "./wishlistSlice";
import userReducer from "./userSlice";
import roleReducer from "./roleSlice";
import bannerReducer from "./bannerSlice";
import notificationReducer from "./notificationSlice";
import discountCategoryReducer from "./discountCategorySlice";
import couponReducer from "./couponSlice";
import orderStatusReducer from "./orderStatusSlice";
import sizeGuideReducer from "./sizeGuideSlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    auth: authReducer,
    toast: toastReducer,
    product: productReducer,
    cart: cartReducer,
    groupCategory: groupCategoryReducer,
    order: orderReducer,
    genderCategory: genderCategoryReducer,
    size: sizeReducer,
    color: colorReducer,
    material: materialReducer,
    comment: commentReducer,
    role: roleReducer,
    user: userReducer,
    wishlist: wishlistReducer,
    banner: bannerReducer,
    notification: notificationReducer,
    discountCategory: discountCategoryReducer,
    coupon: couponReducer,
    orderStatus: orderStatusReducer,
    sizeGuide: sizeGuideReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
