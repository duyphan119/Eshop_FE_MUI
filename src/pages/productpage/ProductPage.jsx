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
import { apiAddToCart } from "../../api/apiCart";
import { apiGetProductBySlug } from "../../api/apiProduct";
import Comments from "../../components/comments/Comments";
import * as constants from "../../constants";
import { SocketContext } from "../../context";
import { convertSizeStringToNumber, separateThousands } from "../../utils";
import "./productpage.scss";
const ProductPage = ({ categorySlug }) => {
  const user = useSelector((state) => state.auth.currentUser);
  const [indexSize, setIndexSize] = useState(0);
  const [indexColor, setIndexColor] = useState(0);
  const [indexImage, setIndexImage] = useState(0);
  const [indexSlide, setIndexSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState();
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  // useEffect(() => {
  //   product.productColors[indexColor];
  // }, [product, indexColor]);

  useEffect(() => {
    const api = async () => {
      const data = await apiGetProductBySlug(user, categorySlug, dispatch);
      setProduct(data);
    };
    api();
  }, [user, categorySlug, dispatch]);
  useEffect(() => {
    product && socket.emit("join-room", product.slug);
  }, [socket, product]);

  useEffect(() => {
    if (product) {
      document.title = product.name;
    }
  }, [product]);
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
  const handleChangeSlide = (step) => {
    let newIndex = indexSlide + step;
    if (
      newIndex >= 0 &&
      newIndex < product.productColors[indexColor].images.length * 3
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
                  product.productColors[indexColor].images.length < 5 &&
                  "0 10px"
                }`,
              }}
            >
              <div
                className="product-page__main-slider-prev-btn"
                style={{
                  display: `${
                    product.productColors[indexColor].images.length < 5 &&
                    "none"
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
                      product.productColors[indexColor].images.length * 3 - 4 &&
                    indexSlide * 134
                  }px)`,
                }}
              >
                <div className="product-page__main-slider-list">
                  {product.productColors[indexColor].images.map(
                    (item, index) => (
                      <div
                        className={`product-page__main-slider-item ${
                          index === indexImage ? "active" : ""
                        }`}
                        key={item.id}
                        onClick={() => setIndexImage(index)}
                      >
                        <img
                          src={(() => {
                            try {
                              return `${constants.SERVER_URL}${item.image}`;
                            } catch (error) {
                              return constants.IMAGE_IS_NOT_AVAILABLE_URL;
                            }
                          })()}
                          alt=""
                        />
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
                    product.productColors[indexColor].images.length < 5 &&
                    "none"
                  }`,
                }}
              >
                <BsChevronDown />
              </div>
            </Col>
            <Col xs={10} className="product-page__main-image">
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
            </Col>
          </Col>
          <Col xs={6} className="product-page__main-info">
            <div className="product-page__main-info-name">{product.name}</div>
            <div className="product-page__main-info-stars stars">
              {(() => {
                const n = product.comments.length;
                const rating = product.comments.reduce(
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
              {separateThousands(product.newPrice)}đ
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
