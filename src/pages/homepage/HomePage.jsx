import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiGetAllCategories } from "../../api/apiCategory";
import BannerSlider from "../../components/banner-slider/BannerSlider";
import Banners from "../../components/banners/Banners";
import Categories from "../../components/categories/Categories";
import ProductSlider from "../../components/product-slider/ProductSlider";
import Products from "../../components/products/Products";
import Services from "../../components/services/Services";
import "./homepage.scss";
const HomePage = () => {
  return (
    <>
      <BannerSlider />
      <Services />
      <ProductSlider />
      <Banners />
      <div className="products__title">DÀNH CHO BẠN</div>
      <Categories />
      <Products />
      <div className="products__view-more">
        <Link to={`/`}>Xem thêm</Link>
      </div>
    </>
  );
};

export default HomePage;
