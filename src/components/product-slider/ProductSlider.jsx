import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { IoCaretBackSharp, IoCaretForwardSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./productslider.scss";
const products = [
  {
    id: Math.random(),
    name: "Áo Polo Nữ Cafe Phối Nẹp Siêu Nhẹ Siêu Mát",
    img: "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/qjn4014-tru-apn3700-gre-3.jpg?v=1641958600000",
    oldPrice: "329.000đ",
    newPrice: "299.000đ",
  },
  {
    id: Math.random(),
    name: "Áo Polo Nữ Cafe Phối Nẹp Siêu Nhẹ Siêu Mát",
    img: "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/qjn4014-tru-apn3700-gre-3.jpg?v=1641958600000",
    oldPrice: "329.000đ",
    newPrice: "299.000đ",
  },
  {
    id: Math.random(),
    name: "Áo Polo Nữ Cafe Phối Nẹp Siêu Nhẹ Siêu Mát",
    img: "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/apn3340-vag-qjn3102-xah-3.jpg?v=1644283529000",
    oldPrice: "329.000đ",
    newPrice: "299.000đ",
  },
  {
    id: Math.random(),
    name: "Áo Polo Nữ Cafe Phối Nẹp Siêu Nhẹ Siêu Mát",
    img: "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/qjn4014-tru-apn3700-gre-3.jpg?v=1641958600000",
    oldPrice: "329.000đ",
    newPrice: "299.000đ",
  },
  {
    id: Math.random(),
    name: "Áo Polo Nữ Tay Ngắn Pique Mắt Chim Phối Bo Thoáng Khí",
    img: "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/qjn4014-tru-apn3700-gre-3.jpg?v=1641958600000",
    oldPrice: "",
    newPrice: "289.000đ",
  },
  {
    id: Math.random(),
    name: "Áo Polo Nữ Cafe Phối Nẹp Siêu Nhẹ Siêu Mát",
    img: "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/qjn4014-tru-apn3700-gre-3.jpg?v=1641958600000",
    oldPrice: "329.000đ",
    newPrice: "299.000đ",
  },
  {
    id: Math.random(),
    name: "Áo Polo Nữ Cafe Phối Nẹp Siêu Nhẹ Siêu Mát",
    img: "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/qjn4014-tru-apn3700-gre-3.jpg?v=1641958600000",
    oldPrice: "329.000đ",
    newPrice: "299.000đ",
  },
  {
    id: Math.random(),
    name: "Áo Polo Nữ Cafe Phối Nẹp Siêu Nhẹ Siêu Mát",
    img: "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/qjn4014-tru-apn3700-gre-3.jpg?v=1641958600000",
    oldPrice: "329.000đ",
    newPrice: "299.000đ",
  },
  {
    id: Math.random(),
    name: "Áo Polo Nữ Cafe Phối Nẹp Siêu Nhẹ Siêu Mát",
    img: "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/qjn4014-tru-apn3700-gre-3.jpg?v=1641958600000",
    oldPrice: "329.000đ",
    newPrice: "299.000đ",
  },
];
const ProductSlider = () => {
  const [indexSlider, setIndexSlider] = useState(0);
  const handleChangeSlide = (step) => {
    if (indexSlider + step < 0) {
      setIndexSlider(products.length - 6 < 0 ? 0 : products.length - 6);
    } else if (indexSlider + step >= products.length - 6) {
      setIndexSlider(0);
    } else {
      setIndexSlider(indexSlider + step);
    }
  };
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
          <div
            className="product-slider__prev"
            onClick={() => handleChangeSlide(-1)}
          >
            <IoCaretBackSharp />
          </div>
          <Row
            className="product-slider__list"
            style={{
              transform: `translateX(calc(-100% * ${indexSlider} / 6))`,
            }}
          >
            {products.map((item, index) => (
              <Col xs={2} className="product-slider__item" key={item.id}>
                <Link to={`/`} className="product-slider__item-img">
                  <img src={item.img} alt="" />
                </Link>
                <Link to={`/`} className="product-slider__item-name">
                  {item.name}
                </Link>
                <div className="product-slider__item-price">
                  <div className="product-slider__item-price-new">
                    {item.newPrice}
                  </div>
                  <div className="product-slider__item-old">
                    {item.oldPrice}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <div
            className="product-slider__next"
            onClick={() => handleChangeSlide(1)}
          >
            <IoCaretForwardSharp />
          </div>
        </div>
        <div className="product-slider__view-all">
          <button>Xem tất cả</button>
        </div>
      </Container>
    </div>
  );
};

export default ProductSlider;
