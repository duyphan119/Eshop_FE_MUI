import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { IoCaretBackSharp, IoCaretForwardSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiGetProductsByCollectionIdNotUpdateStore } from "../../api/apiProduct";
import Products from "../../components/products/Products";
import CardProduct from "../cardproduct/CardProduct";
import "./productslider.scss";
const maxProductsInSlider = 6;
const ProductSlider = () => {

  const [indexSlider, setIndexSlider] = useState(0);
  const [products, setProducts] = useState([]);
  const collectionProducts = useSelector((state) => state.collectionProduct.list);
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const handleChangeSlide = (step) => {
    if (indexSlider + step < 0) {
      setIndexSlider(products.length - maxProductsInSlider < 0 ? 0 : products.length - maxProductsInSlider);
    } else if (indexSlider + step >= products.length - maxProductsInSlider) {
      setIndexSlider(0);
    } else {
      setIndexSlider(indexSlider + step);
    }
  };
  useEffect(() => {
    const api = async () => {
      if (collectionProducts.length !== 0) {
        const data = await apiGetProductsByCollectionIdNotUpdateStore(user, collectionProducts[0].id, dispatch)
        console.log(data);
        setProducts(data)
      }
    }
    api();
  }, [user, collectionProducts, dispatch])
  return (
    <div className="product-slider">
      <Container>
        <div className="product-slider__title">
          EVERY WEAR
        </div>
        <a
          href={`https://yody.vn/ao-polo-yody`}
          className="product-slider__link"
        >
          <img
            src="https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/banner_hangngay_1.jpg?1646486842767"
            alt=""
          />
        </a>
        <div className="product-slider__wrapper">
          {products.length > maxProductsInSlider &&
            <div
              className="product-slider__prev"
              onClick={() => handleChangeSlide(-1)}
            >
              <IoCaretBackSharp />
            </div>
          }
          <Row
            className="product-slider__list"
            style={{
              transform: `translateX(calc(-100% * ${indexSlider} / ${maxProductsInSlider}))`,
            }}
          >
            {products.map((item, index) => (
              <Col xs={12 / maxProductsInSlider} className="product-slider__item" key={item.id}>
                <CardProduct item={item} key={item.id} />
              </Col>
            ))}
          </Row>
          {products.length > maxProductsInSlider && <div
            className="product-slider__next"
            onClick={() => handleChangeSlide(1)}
          >
            <IoCaretForwardSharp />
          </div>}
        </div>
        <div className="product-slider__view-all">
          <Link to={`/${collectionProducts.length === 0 ? "" : collectionProducts[0].slug}`}>Xem tất cả</Link>
        </div>

      </Container>
    </div>
  );
};

export default ProductSlider;
