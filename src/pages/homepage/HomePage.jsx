import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BannerSlider from "../../components/banner-slider/BannerSlider";
import Banners from "../../components/banners/Banners";
import Categories from "../../components/categories/Categories";
import ProductSlider from "../../components/product-slider/ProductSlider";
import Products from "../../components/products/Products";
import Services from "../../components/services/Services";
import "./homepage.scss";
const HomePage = () => {
  const products = useSelector((state) => state.product.list);
  useEffect(()=>{
    document.title = "Trang chủ";
  },[])
  return (
    <>
      <BannerSlider />
      <Services />
      <ProductSlider />
      <Banners />
      <div className="products__title">DÀNH CHO BẠN</div>
      <Categories />
      <Products products={products}/>
      <div className="products__view-more">
        <Link to={`/`}>Xem thêm</Link>
      </div>
    </>
  );
};

export default HomePage;
