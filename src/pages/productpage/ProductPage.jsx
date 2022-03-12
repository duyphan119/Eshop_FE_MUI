import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { apiAddToCart } from "../../api/apiCart";
import { apiGetProductBySlug } from "../../api/apiProduct";
import * as constants from "../../constants";
import { convertSizeStringToNumber } from "../../utils";
import "./productpage.scss";
const ProductPage = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const [product, setProduct] = useState();
  const [indexSize, setIndexSize] = useState(0);
  const [indexColor, setIndexColor] = useState(0);
  const [indexImage, setIndexImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const dispatch = useDispatch();
  const { productSlug } = params;
  useEffect(() => {
    const callApi = async () => {
      const data = await apiGetProductBySlug(productSlug);
      setProduct(data);
    };
    callApi();
  }, [productSlug]);
  const handleChangeQuantity = (e, step) => {
    try {
      let amount = product.productColors[indexColor].sizes[indexSize].amount;
      let newQuantity = e ? parseInt(e.target.value) : quantity + step;
      if (!isNaN(newQuantity)) {
        if (newQuantity < 1) {
          newQuantity = 1;
        } else if (newQuantity > amount) {
          newQuantity = amount;
        }
        setQuantity(newQuantity);
      }
    } catch (error) {}
  };
  const handleAddToCart = () => {
    apiAddToCart(
      user,
      { size: product.productColors[indexColor].sizes[indexSize], quantity },
      dispatch
    );
  };
  if (!product) {
    return "";
  }
  return (
    <div className="product-page">
      <Container className="product-page__container">
        <Row className="product-page__main">
          <Col xs={1}>
            <div className="product-page__main-slider"></div>
          </Col>
          <Col xs={5}>
            <div className="product-page__main-image">
              <img
                src={(() => {
                  try {
                    return `${constants.SERVER_URL}${product.productColors[indexColor].images[indexImage].image}`;
                  } catch (error) {
                    return constants.IMAGE_IS_NOT_AVAILABLE_URL;
                  }
                })()}
                alt=""
              />
            </div>
          </Col>
          <Col xs={6} className="product-page__main-info">
            <div className="product-page__main-info-name">{product.name}</div>
            <div className="product-page__main-info-stars stars"></div>
            <div className="product-page__main-info-price">
              {product.newPrice}đ
            </div>
            <hr className="product-page__main-info-separate" />
            <div className="product-page__main-info-color">
              <div className="product-page__main-info-color-text">
                Màu sắc: {product.productColors[indexColor].color}
              </div>
              <div className="product-page__main-info-color-details">
                {product.productColors.map((item, index) => {
                  return (
                    <div
                      className={`product-page__main-info-color-detail ${
                        index === indexColor ? "active" : ""
                      }`}
                      key={item.color}
                      onClick={() => setIndexColor(index)}
                    >
                      <img
                        src={(() => {
                          try {
                            return `${constants.SERVER_URL}${item.images[indexImage].image}`;
                          } catch (error) {
                            return constants.IMAGE_IS_NOT_AVAILABLE_URL;
                          }
                        })()}
                        alt=""
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="product-page__main-info-size">
              <div className="product-page__main-info-size-text">
                Kích thước:{" "}
                {(() => {
                  try {
                    product.productColors[indexColor].sizes.sort(
                      (a, b) =>
                        convertSizeStringToNumber(a.size) -
                        convertSizeStringToNumber(b.size)
                    );
                    return product.productColors[indexColor].sizes[indexSize]
                      .size;
                  } catch (error) {
                    return "M";
                  }
                })()}
              </div>
              <div className="product-page__main-info-size-details">
                {(() => {
                  try {
                    product.productColors[indexColor].sizes.sort(
                      (a, b) =>
                        convertSizeStringToNumber(a.size) -
                        convertSizeStringToNumber(b.size)
                    );
                    return product.productColors[indexColor].sizes;
                  } catch (error) {
                    return [];
                  }
                })().map((item, index) => {
                  return (
                    <div
                      className={`product-page__main-info-size-detail ${
                        item.amount === 0
                          ? "out-of-stock"
                          : index === indexSize
                          ? "active"
                          : ""
                      }`}
                      key={item.id}
                      onClick={() => setIndexSize(index)}
                    >
                      {item.size}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="product-page__main-info-quantity">
              <div className="product-page__main-info-quantity-container">
                <div
                  className="product-page__main-info-quantity-decrease"
                  onClick={() => handleChangeQuantity(null, -1)}
                >
                  <AiOutlineMinus />
                </div>
                <div className="product-page__main-info-quantity-value">
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => handleChangeQuantity(e, 1)}
                  />
                </div>
                <div
                  className="product-page__main-info-quantity-increase"
                  onClick={() => handleChangeQuantity(null, 1)}
                >
                  <AiOutlinePlus />
                </div>
              </div>
              <div className="product-page__main-info-actions">
                <div
                  className="product-page__main-info-action product-page__main-info-action-add-to-cart"
                  onClick={handleAddToCart}
                >
                  <BsCartPlus />
                  Thêm vào giỏ hàng
                </div>
                <div className="product-page__main-info-action product-page__main-info-action-check-out">
                  Mua ngay
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductPage;
