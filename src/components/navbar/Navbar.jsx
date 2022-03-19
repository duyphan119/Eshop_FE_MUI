import Container from "react-bootstrap/esm/Container";
import { BsBag, BsHeart } from "react-icons/bs";
import { MdSearch } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./navbar.scss";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useDispatch, useSelector } from "react-redux";
import { apiLogout } from "../../api/apiAuth";
import { useEffect } from "react";
import { apiGetAllBuyerTypes } from "../../api/apiBuyerType";
import NotificationCategories from "../notificationcategories/NotificationCategories";
const Navbar = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const buyerTypes = useSelector((state) => state.buyerType.list);
  const cart = useSelector((state) => state.cart.list);
  const wishlist = useSelector((state) => state.wishlist.list);
  const dispatch = useDispatch();
  const handleLogout = () => {
    apiLogout(dispatch);
  };
  useEffect(() => {
    apiGetAllBuyerTypes(dispatch);
  }, [dispatch]);
  return (
    <Row>
      <Col xs={12} className="my-navbar">
        <div className="my-navbar__left">
          <Link to="/">
            <img
              src="https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/logo.svg?1646486842767"
              alt=""
            />
          </Link>
        </div>
        <div className="my-navbar__middle">
          <ul className="my-navbar__middle-categories">
            <li className="my-navbar__middle-category">
              <Link to={`/`} className="my-navbar__middle-category-link">
                SALE UP TO 66%
              </Link>
            </li>
            {buyerTypes.map((item) => {
              return (
                <li
                  className="my-navbar__middle-category has-child"
                  key={item.id}
                >
                  <Link
                    to={`/${item.slug}`}
                    className="my-navbar__middle-category-link"
                  >
                    {item.name.toUpperCase()}
                  </Link>
                  <NotificationCategories
                    groups={item.groups}
                    buyerType={item}
                  />
                </li>
              );
            })}

            <li className="my-navbar__middle-category">
              <Link to={`/`} className="my-navbar__middle-category-link">
                POLO YODY
              </Link>
            </li>
            <li className="my-navbar__middle-category">
              <Link to={`/`} className="my-navbar__middle-category-link">
                BỘ SƯU TẬP
              </Link>
            </li>
            <li className="my-navbar__middle-category">
              <Link to={`/`} className="my-navbar__middle-category-link">
                YOLO LOVE
              </Link>
            </li>
            <li className="my-navbar__middle-category">
              <Link to={`/`} className="my-navbar__middle-category-link">
                ĐỒNG PHỤC
              </Link>
            </li>
          </ul>
          <form className="my-navbar__middle-form">
            <input
              type="text"
              className="my-navbar__middle-form-input"
              placeholder="Tìm sản phẩm"
            />
            <div className="my-navbar__middle-form-icon">
              <MdSearch />
            </div>
          </form>
        </div>
        <div className="my-navbar__right">
          <ul className="my-navbar__right-icons">
            <li className="my-navbar__right-icon">
              <div className="my-navbar__right-icon-link">
                <AiOutlineUser />
                <div className="my-navbar__right-icon-link-notification">
                  {!user ? (
                    <>
                      <Link to={`/register`}>Đăng ký</Link>
                      <Link to={`/login`}>Đăng nhập</Link>
                    </>
                  ) : (
                    <>
                      <Link to={`/account`}>Thông tin cá nhân</Link>
                      <div onClick={handleLogout}>Đăng xuất</div>
                    </>
                  )}
                </div>
              </div>
            </li>
            <li className="my-navbar__right-icon">
              <Link to={`/wishlist`} className="my-navbar__right-icon-link">
                <BsHeart />
                {wishlist &&
                  (wishlist.length === 0 ? "" : <span>{wishlist.length}</span>)}
              </Link>
            </li>
            <li className="my-navbar__right-icon">
              <Link to={`/cart`} className="my-navbar__right-icon-link">
                <BsBag />
                {cart && (cart.length === 0 ? "" : <span>{cart.length}</span>)}
              </Link>
            </li>
          </ul>
        </div>
      </Col>
    </Row>
  );
};

export default Navbar;
