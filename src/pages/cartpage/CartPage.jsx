import { useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsArrowRightShort, BsHeart } from "react-icons/bs";
import { GoTrashcan } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiRemoveCartItem, apiUpdateCart } from "../../api/apiCart";
import * as constants from "../../constants";
import { separateThousands } from "../../utils";
import "./cartpage.scss";
const CartPage = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const cart = useSelector((state) => state.cart.list);
  const dispatch = useDispatch();
  const handleChangeQuantity = (item, step) => {
    const newQuantity = item.quantity + step;
    if (newQuantity >= 0 && newQuantity <= item.size.amount) {
      apiUpdateCart(user, { ...item, quantity: newQuantity }, dispatch);
    }
  };
  const onChangeQuantity = (item, target) => {
    let newQuantity = parseInt(target.value);
    if (isNaN(newQuantity)) newQuantity = 0;
    if (newQuantity > item.size.amount) newQuantity = item.size.amount;
    apiUpdateCart(user, { ...item, quantity: newQuantity }, dispatch);
  };
  const handleRemoveItem = (id) => {
    apiRemoveCartItem(user, id, dispatch);
  };
  const getTotalPrice = () =>{
    let result = 0;
    cart.forEach(item=>{
      result += (item.quantity * item.product.newPrice);
    })
    return result;
  }
  useEffect(()=>{
    document.title = "Giỏ hàng";
  },[])
  return (
    <div className="cart-page">
      <Container className="cart-page__container">
        <Row className="cart-page__main">
          {cart.length === 0 ? (
            <Col xs={12} className="cart-page__main-empty-cart">
              <img
                src="https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/blank_cart.svg?1646970639778"
                alt=""
              />
              <div>Giỏ hàng của bạn trống</div>
              {!user && (
                <Link
                  className="cart-page__main-empty-cart-login"
                  to={`/login`}
                >
                  Đăng nhập
                </Link>
              )}
              <Link to={`/`}>Mua ngay</Link>
            </Col>
          ) : (
            <>
              <Col xs={8} className="cart-page__main-cart">
                <div className="cart-page__main-header">
                  <div className="cart-page__main-header-title">
                    Đơn hàng của bạn <span>({cart.length}) sản phẩm</span>
                  </div>
                  <Link to={`/`} className="cart-page__main-header-route">
                    <span>Tiếp tục mua hàng</span>
                    <BsArrowRightShort />
                  </Link>
                </div>
                <div className="cart-page__main-cart-headers">
                  <div className="cart-page__main-cart-header-product">
                    Sản phẩm
                  </div>
                  <div className="cart-page__main-cart-header-price">
                    Đơn giá
                  </div>
                  <div className="cart-page__main-cart-header-quantity">
                    Số lượng
                  </div>
                  <div className="cart-page__main-cart-header-total-price">
                    Thành tiền
                  </div>
                </div>
                {cart.map((item) => {
                  return (
                    <div className="cart-page__main-cart-items" key={item.id}>
                      <div className="cart-page__main-cart-item-product">
                        <img
                          src={(() => {
                            try {
                              return `${constants.SERVER_URL}${item.product.images[0].image}`;
                            } catch (error) {
                              return constants.IMAGE_IS_NOT_AVAILABLE_URL;
                            }
                          })()}
                          alt=""
                        />
                        <div className="cart-page__main-cart-item-product-infos-and-actions">
                          <div className="cart-page__main-cart-item-product-infos">
                            <Link
                              to={`/product/${item.product.slug}`}
                              className="cart-page__main-cart-item-product-info-name"
                            >
                              {item.product.name}
                            </Link>
                            <span className="cart-page__main-cart-item-product-info-color-and-size">
                              {item.product.color} / {item.size.size}
                            </span>
                          </div>
                          <div className="cart-page__main-cart-item-product-actions">
                            <div
                              className="cart-page__main-cart-item-product-action-delete"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <GoTrashcan /> Xoá
                            </div>
                            <div className="cart-page__main-cart-item-product-action-add-to-wishlist">
                              <BsHeart />
                              Lưu trong danh sách yêu thích
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="cart-page__main-cart-item-price">
                        {separateThousands(item.product.newPrice)}đ
                      </div>
                      <div className="cart-page__main-cart-item-quantity">
                        <div className="cart-page__main-cart-item-quantity-container">
                          <div
                            className="cart-page__main-cart-item-quantity-decrease"
                            onClick={() => handleChangeQuantity(item, -1)}
                          >
                            <AiOutlineMinus />
                          </div>
                          <form className="cart-page__main-cart-item-quantity-value">
                            <input
                              type="text"
                              name="quantity"
                              value={item.quantity}
                              onChange={(e) => onChangeQuantity(item, e.target)}
                            />
                          </form>
                          <div
                            className="cart-page__main-cart-item-quantity-increase"
                            onClick={() => handleChangeQuantity(item, 1)}
                          >
                            <AiOutlinePlus />
                          </div>
                        </div>
                      </div>
                      <div className="cart-page__main-cart-item-total-price">
                      {separateThousands(item.product.newPrice * item.quantity)}đ
                      </div>
                    </div>
                  );
                })}
              </Col>
              <Col xs={4}>
                <div className="cart-page__result">
                  <div className="cart-page__service">
                    <img
                      src="https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/ship-cart.svg"
                      alt=""
                    />
                    <div className="cart-page__service-info">
                      <div className="cart-page__service-name">
                        Miễn phí giao hàng
                      </div>
                      <div className="cart-page__service-detail">
                        Đủ điều kiện nhận <span>vận chuyển miễn phí!</span>
                      </div>
                    </div>
                  </div>
                  <div className="cart-page__total-price">
                    <div className="cart-page__total-price-key">Tổng cộng:</div>
                    <div className="cart-page__total-price-value">{separateThousands(getTotalPrice())}đ</div>
                  </div>
                  <button className="cart-page__btn-check-out">
                    Thanh toán (2)
                  </button>
                  <p>Dùng mã giảm giá của YODY trong bước tiếp theo</p>
                </div>
              </Col>
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default CartPage;
