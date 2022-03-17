import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiGetWishListByUser } from "../../api/apiWishlist";
import Profile from "../../components/profile/Profile";
import * as constants from "../../constants";
import { convertSizeStringToNumber, separateThousands } from "../../utils";
import "./wishlistpage.scss";
const WishListPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const wishlist = useSelector((state) => state.wishlist.list);
  const [indexColor, setIndexColor] = useState(0);
  const [size, setSize] = useState({
    value: "",
    index: -1,
  });
  useEffect(() => {
    document.title = "Yêu thích";
  }, []);
  useEffect(() => {
    user && apiGetWishListByUser(user, dispatch);
  }, [user, dispatch]);
  if (!wishlist) return "";
  return (
    <div className="wishlist-page">
      <Container className="wishlist-page__container">
        <Row className="wishlist-page__main">
          <Profile user={user} />
          <Col xs={9} className="wishlist-page__body">
            <div className="wishlist-page__header">
              <div>Sản phẩm yêu thích</div>
              <div>2 sản phẩm</div>
            </div>
            <hr />
            <div className="wishlist-page__list">
              {wishlist.map((item) => (
                <div className="wishlist-page__item" key={item.id}>
                  <Link to={`/`} className="wishlist-page__item-img">
                    <img
                      src={
                        constants.SERVER_URL +
                        item.product.productColors[indexColor].images[0].image
                      }
                      alt=""
                    />
                  </Link>
                  <div className="wishlist-page__item-main">
                    <div className="wishlist-page__item-main-info">
                      <div className="wishlist-page__item-main-info">
                        {item.product.name}
                      </div>
                      <div className="wishlist-page__item-main-info-price">
                        <div className="wishlist-page__item-main-info-price-new">
                          {separateThousands(item.product.newPrice)}đ
                        </div>
                        <div className="wishlist-page__item-main-info-price-old">
                          {separateThousands(item.product.oldPrice)}đ
                        </div>
                      </div>
                      <div className="wishlist-page__item-main-info-colors">
                        {item.product.productColors.map(
                          (productColor, index) => (
                            <div
                              className={`wishlist-page__item-main-info-color ${index === indexColor ? "active" : ""}`}
                              key={index + new Date()}
                            >
                              <img
                                src={
                                  constants.SERVER_URL +
                                  productColor.images[0].image
                                }
                                alt=""
                              />
                            </div>
                          )
                        )}
                      </div>
                      <div className="wishlist-page__item-main-info-sizes">
                        {[...item.product.productColors[indexColor].sizes]
                          .sort(
                            (a, b) =>
                              convertSizeStringToNumber(a.size) -
                              convertSizeStringToNumber(b.size)
                          )
                          .map((s, index) => (
                            <div
                              className={`wishlist-page__item-main-info-size ${
                                index === size.index ? "active" : ""
                              }`}
                              key={index + new Date()}
                              onClick={() => setSize({ ...size, index })}
                            >
                              {s.size}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="wishlist-page__item-main-actions">
                    <button>XOÁ</button>
                    <button>THÊM VÀO GIỎ HÀNG</button>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WishListPage;
