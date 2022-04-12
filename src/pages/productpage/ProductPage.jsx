import React, { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  BsCartPlus,
  BsChevronDown,
  BsChevronUp,
  BsStar,
  BsStarFill,
  BsStarHalf,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { apiAddToCart } from "../../api/apiCart";
import { apiGetProductBySlug } from "../../api/apiProduct";
import Comments from "../../components/comments/Comments";
import { SocketContext } from "../../context";
import { separateThousands } from "../../utils";
import "./productpage.scss";
const ProductPage = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const [indexSize, setIndexSize] = useState(0);
  const [indexColor, setIndexColor] = useState(0);
  const [indexImage, setIndexImage] = useState(0);
  const [indexSlide, setIndexSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState();
  const params = useParams();
  const { productSlug } = params;
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  useEffect(() => {
    const api = async () => {
      const data = await apiGetProductBySlug(user, productSlug, dispatch);
      if (data) {
        setProduct(data);
      }
    };
    api();
  }, [user, productSlug, dispatch]);

  useEffect(() => {
    if (product) {
      document.title = product.name;
    }
  }, [product]);

  const handleChangeQuantity = (e, step) => {
    try {
      let amount =
        product.Product_Colors[indexColor].Product_Color_Sizes[indexSize]
          .amount;
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
      {
        product_color_size_id:
          product.Product_Colors[indexColor].Product_Color_Sizes[indexSize].id,
        amount:
          product.Product_Colors[indexColor].Product_Color_Sizes[indexSize]
            .amount,
        quantity,
      },
      dispatch
    );
  };
  const handleChangeSlide = (step) => {
    let newIndex = indexSlide + step;
    if (
      newIndex >= 0 &&
      newIndex <
        product.Product_Colors[indexColor].Product_Color_Images.length - 4
    ) {
      setIndexSlide(newIndex);
    }
  };
  if (!product) {
    return "";
  }
  return (
    <div className="product-page">
      <Container className="product-page__container">
        <Row className="product-page__main">
          <Col xs={6} className="product-page__main-info-product-image">
            <Col
              xs={2}
              className="product-page__main-slider"
              style={{
                padding: `${
                  product.Product_Colors[indexColor].Product_Color_Images
                    .length < 5 && "0 10px"
                }`,
              }}
            >
              <div
                className="product-page__main-slider-prev-btn"
                style={{
                  display: `${
                    product.Product_Colors[indexColor].Product_Color_Images
                      .length < 5 && "none"
                  }`,
                }}
                onClick={() => handleChangeSlide(-1)}
              >
                <BsChevronUp />
              </div>
              <div
                className="product-page__main-slider-wrapper"
                style={{
                  transform: `translateY(-${
                    indexSlide >= 0 &&
                    indexSlide <
                      product.Product_Colors[indexColor].Product_Color_Images
                        .length *
                        3 -
                        4 &&
                    indexSlide * 134
                  }px)`,
                }}
              >
                <div className="product-page__main-slider-list">
                  {product.Product_Colors[indexColor].Product_Color_Images.map(
                    (item, index) => (
                      <div
                        className="product-page__main-slider-item"
                        key={item.id}
                        onClick={() => setIndexImage(index)}
                        onMouseEnter={() => setIndexImage(index)}
                      >
                        <img src={item.url} alt="" />
                      </div>
                    )
                  )}
                </div>
              </div>
              <div
                className="product-page__main-slider-next-btn"
                onClick={() => handleChangeSlide(1)}
                style={{
                  display: `${
                    product.Product_Colors[indexColor].Product_Color_Images
                      .length < 5 && "none"
                  }`,
                }}
              >
                <BsChevronDown />
              </div>
            </Col>
            <Col xs={10} className="product-page__main-image">
              <img
                src={
                  product.Product_Colors[indexColor].Product_Color_Images[
                    indexImage
                  ].url
                }
                alt=""
                className="image-need-zoom"
              />
              <div className="cursor-zoom-image"></div>
              <div className="zoom-image-result"></div>
            </Col>
          </Col>
          <Col xs={6} className="product-page__main-info">
            <div className="product-page__main-info-name">{product.name}</div>
            <div className="product-page__main-info-stars stars">
              {(() => {
                const n = product.Comments.length;
                const rating = product.Comments.reduce(
                  (prev, cur) => prev + cur.rate / n,
                  0
                );
                return [1, 2, 3, 4, 5].map((item, index) => {
                  return (
                    <div
                      className="product-page__main-info-star star"
                      key={new Date().getTime() + index}
                    >
                      {item <= rating ? (
                        <BsStarFill />
                      ) : item - 1 >= rating ? (
                        <BsStar />
                      ) : (
                        <BsStarHalf />
                      )}
                    </div>
                  );
                });
              })()}
            </div>
            <div className="product-page__main-info-price">
              {separateThousands(product.price)}đ
            </div>
            <hr className="product-page__main-info-separate" />
            <div className="product-page__main-info-color">
              <div className="product-page__main-info-color-text">
                Màu sắc: {product.Product_Colors[indexColor].color}
              </div>
              <div className="product-page__main-info-color-details">
                {product.Product_Colors.map((item, index) => {
                  return (
                    <div
                      className={`product-page__main-info-color-detail ${
                        index === indexColor ? "active" : ""
                      }`}
                      key={item.color}
                      onClick={() => setIndexColor(index)}
                    >
                      <img
                        src={item.Product_Color_Images[indexImage].url}
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
                    product.Product_Colors[indexColor].Product_Color_Sizes.sort(
                      (a, b) => a.size_value - b.size_value
                    );
                    return product.Product_Colors[indexColor]
                      .Product_Color_Sizes[indexSize].size_text;
                  } catch (error) {
                    return "M";
                  }
                })()}
              </div>
              <div className="product-page__main-info-size-details">
                {product.Product_Colors[indexColor].Product_Color_Sizes.sort(
                  (a, b) => a.size_value - b.size_value
                ).map((item, index) => {
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
                      {item.size_text}
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
        <Comments
          user={user}
          socket={socket}
          product={product}
          setProduct={setProduct}
        />
      </Container>
    </div>
  );
};

export default ProductPage;
