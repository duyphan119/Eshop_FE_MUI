import { Routes, Route } from "react-router-dom";
import CartPage from "../pages/cartpage/CartPage";
import HomePage from "../pages/homepage/HomePage";
import LoginPage from "../pages/login-register/LoginPage";
import RegisterPage from "../pages/login-register/RegisterPage";
import NotFoundPage from "../pages/notfoundpage/NotFoundPage";
import OAuthPage from "../pages/oauthpage/OAuthPage";
import PaymentPage from "../pages/paymentpage/PaymentPage";
import PersonalInfoPage from "../pages/personalinfopage/PersonalInfoPage";
import ProductFormPage from "../pages/productformpage/ProductFormPage";
import ProductPage from "../pages/productpage/ProductPage";
import ProductsPage from "../pages/productspage/ProductsPage";
import WishListPage from "../pages/wishlistpage/WishListPage";

export const routes = () => {
  return (
    <Routes>
      <Route path="/cart" element={<CartPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/oauth/success" element={<OAuthPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/account" element={<PersonalInfoPage />} />
      <Route path="/product/add" element={<ProductFormPage />} />
      <Route path="/product/:productSlug" element={<ProductPage />} />
      <Route path="/:categorySlug" element={<ProductsPage />} />
      <Route path="/wishlist" element={<WishListPage />} />
    </Routes>
  );
};
