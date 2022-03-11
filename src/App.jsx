import { Routes, Route } from "react-router-dom";
import BannerTop from "./components/bannertop/BannerTop";
import TopBar from "./components/topbar/TopBar";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/homepage/HomePage";
import OAuthPage from "./pages/oauthpage/OAuthPage";
import Footer from "./components/footer/Footer";
import "./App.scss";
import LoginPage from "./pages/login-register/LoginPage";
import RegisterPage from "./pages/login-register/RegisterPage";
import PersonalInfoPage from "./pages/personalinfopage/PersonalInfoPage";
import ToastMessage from "./components/toastmessage/ToastMessage";
import ProductsPage from "./pages/productspage/ProductsPage";
const App = () => {
  return (
    <>
      <BannerTop />
      <header>
        <TopBar />
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/oauth/success" element={<OAuthPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<PersonalInfoPage />} />
        <Route path="/:categorySlug" element={<ProductsPage />} />
      </Routes>
      <Footer />
      <ToastMessage />
    </>
  );
};

export default App;
