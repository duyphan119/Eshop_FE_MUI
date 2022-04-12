import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiGetProductsByCollectionIdNotUpdateStore } from "../../api/apiProduct";
import CardProduct from "../cardproduct/CardProduct";
import Slider from "../slider/Slider";
import "./productslider.scss";
const ProductSlider = () => {

  const [products, setProducts] = useState([]);
  const collectionProducts = useSelector((state) => state.collectionProduct.list);
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const api = async () => {
      if (collectionProducts.length !== 0) {
        const data = await apiGetProductsByCollectionIdNotUpdateStore(user, collectionProducts[0].id, dispatch)
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
        <Row style={{
          marginBlock: "8px"
        }}>
          <Slider spaceItems={8} breakpoints={{
            0: {
              slidesPerView: 2,
            },
            560: {
              slidesPerView: 3,
            },
            1000: {
              slidesPerView: 4,
            },
            1130: {
              slidesPerView: 5,
            },
            1280: {
              slidesPerView: 6,
            }
          }}>
            {products.map((item, index) => (
              <CardProduct item={item} key={index} />
            ))}
          </Slider>
        </Row>
        <div className="product-slider__view-all">
          <Link to={`/${collectionProducts.length === 0 ? "" : collectionProducts[0].slug}`}>Xem tất cả</Link>
        </div>

      </Container>
    </div >
  );
};

export default ProductSlider;
