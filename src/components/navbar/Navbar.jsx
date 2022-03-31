import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { AiOutlineUser } from "react-icons/ai";
import { BsBag, BsHeart } from "react-icons/bs";
import { MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { apiGetAllBuyerTypes } from "../../api/apiBuyerType";
import { apiLogout } from "../../api/apiAuth";
import { apiSearch } from "../../api/apiSearch";
import NotificationCategories from "../notificationcategories/NotificationCategories";
import ProductsSearch from "../productssearch/ProductsSearch";
import "./navbar.scss";
import { apiGetAllCollectionProducts } from "../../api/apiCollectionProduct";
const Navbar = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const buyerTypes = useSelector((state) => state.buyerType.list);
  const cart = useSelector((state) => state.cart.list);
  const collectionProducts = useSelector((state) => state.collectionProduct.list);
  const wishlist = useSelector((state) => state.wishlist.list);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([])
  const [keyword, setKeyword] = useState("")
  const navigate = useNavigate();
  const handleLogout = () => {
    apiLogout(dispatch);
  };
  
  useEffect(() => {
    apiGetAllBuyerTypes(dispatch);
    apiGetAllCollectionProducts(dispatch);
  }, [dispatch]);
  useEffect(() => {
    const api = async () => {
      if(keyword === ""){
        setProducts([]);
      }else{
        const data = await apiSearch(user, keyword, "product", dispatch);
        setProducts(data);
      }
    }
    api();
  }, [user, keyword, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${keyword}`)
    setKeyword("")
  }
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
              <Link to={`/ao-polo-yody`} className="my-navbar__middle-category-link">
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
          <form className="my-navbar__middle-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="my-navbar__middle-form-input"
              placeholder="Tìm sản phẩm"
              required={true}
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
            />
            <div className="my-navbar__middle-form-icon">
              <MdSearch />
            </div>
            <ProductsSearch keyword={keyword} products={products} />
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
                      <Link to={`/orders`}>Lịch sử mua hàng</Link>
                      <Link to={`/wishlist`}>Sản phẩm yêu thích</Link>
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
