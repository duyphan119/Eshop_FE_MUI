import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { apiGetAllCategories } from "../api/apiCategory";
import { apiGetAllGroupCategories } from "../api/apiGroupCategory";
import CartPage from "../pages/cartpage/CartPage";
import HomePage from "../pages/homepage/HomePage";
import LoginPage from "../pages/login-register/LoginPage";
import RegisterPage from "../pages/login-register/RegisterPage";
import NotFoundPage from "../pages/notfoundpage/NotFoundPage";
import OAuthPage from "../pages/oauthpage/OAuthPage";
import OrdersPage from "../pages/orderspage/OrdersPage";
import PaymentPage from "../pages/paymentpage/PaymentPage";
import PersonalInfoPage from "../pages/personalinfopage/PersonalInfoPage";
import ProductFormPage from "../pages/productformpage/ProductFormPage";
import ProductPage from "../pages/productpage/ProductPage";
import ProductSearchPage from "../pages/productsearchpage/ProductSearchPage";
import ProductsOfBuyerTypePage from "../pages/productsofbuyertypepage/ProductsOfBuyerTypePage";
import ProductsPage from "../pages/productspage/ProductsPage";
import WishListPage from "../pages/wishlistpage/WishListPage";
const Pages = () => {
  const buyerTypes = useSelector((state) => state.buyerType.list);
  const groupCategories = useSelector((state) => state.groupCategory.list);
  const categories = useSelector((state) => state.category.list);
  const collectionProducts = useSelector((state) => state.collectionProduct.list);
  const dispatch = useDispatch();


  useEffect(() => {
    apiGetAllGroupCategories(dispatch);
    apiGetAllCategories(dispatch);
  }, [dispatch])
  console.log(collectionProducts);
  return (
    <Routes>
      <Route path="/cart" element={<CartPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/oauth/success" element={<OAuthPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      {buyerTypes.map((item) => {
        return <Route path={`/${item.slug}`} key={item.id} element={
          <ProductsOfBuyerTypePage buyerType={item} />
        } />
      })}
      {groupCategories.map((item) => {
        return <Route path={`/${item.slug}`} key={item.id} element={
          <ProductsPage groupCategory={item} />
        } />
      })}
      {categories.map((item) => {
        return <Route path={`/${item.slug}`} key={item.id} element={
          <ProductsPage category={item} />
        } />
      })}
      {collectionProducts.map((item) => {
        return <Route path={`/${item.slug}`} key={item.id} element={
          <ProductsPage collectionProduct={item} />
        } />
      })}
      <Route path="/search" element={<ProductSearchPage />} />
      <Route path="/account" element={<PersonalInfoPage />} />
      <Route path="/product/add" element={<ProductFormPage />} />
      <Route path="/:productSlug" element={<ProductPage />} />
      <Route path="/wishlist" element={<WishListPage />} />
    </Routes>
  );
};

export default memo(Pages);
