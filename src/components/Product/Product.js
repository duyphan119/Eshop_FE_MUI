import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Box, Tooltip, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { axiosToken } from "../../config/configAxios";
import { API_PRODUCT_USER_URL } from "../../constants";
import { showModalAddToCart } from "../../redux/cartSlice";
import { showToast } from "../../redux/toastSlice";
import { addToWishlist, removeWishlistItem } from "../../redux/wishlistSlice";
import { formatThousandDigits, getFinalPrice, getURL } from "../../utils";
import styles from "./Product.module.css";

const cx = classNames.bind(styles);
const Product = ({ product }) => {
  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // const [indexColor, setIndexColor] = useState(0);

  const productRef = useRef();

  const checkIsLoved = useMemo(() => {
    return wishlist.findIndex((item) => item.id === product.id) !== -1;
  }, [product, wishlist]);

  async function handleAddToFavoriteList() {
    if (token) {
      try {
        if (!checkIsLoved) {
          await axiosToken(token.accessToken, dispatch, navigate).post(
            `${API_PRODUCT_USER_URL}`,
            {
              productId: product.id,
              userId: currentUser.id,
            }
          );
          dispatch(addToWishlist(product));
          dispatch(
            showToast({
              type: "success",
              text: "Đã thêm vào danh sách yêu thích",
              isOpen: true,
            })
          );
        } else {
          await axiosToken(token.accessToken, dispatch, navigate).delete(
            `${API_PRODUCT_USER_URL}?productId=${product.id}&userId=${currentUser.id}`
          );
          dispatch(removeWishlistItem(product.id));
          dispatch(
            showToast({
              type: "success",
              text: "Đã xoá khỏi danh sách yêu thích",
              isOpen: true,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const checkIsNewProduct = useMemo(() => {
    if (product) {
      const date1 = new Date();
      const date2 = new Date(product.createdAt);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays < 7) {
        return true;
      }
    }
    return false;
  }, [product]);

  if (!product || product?.colors?.length === 0) {
    return "";
  }
  return (
    <Box className={cx("box")}>
      <div className={cx("tags")}>
        {/* {product &&
        product.category.discounts &&
        product.category.discounts.length > 0 ? (
          <div className={`${cx("tag") ${cx("tag-sale")`}}>
            -{product.category.discounts[0].percent}%
          </div>
        ) : (
          product.discounts &&
          product.discounts.length > 0 && (
            <div className={`${cx("tag") ${cx("tag-sale")`}}>
              -
              {Math.round(
                ((product.price -
                  product.discounts[product.discounts.length - 1].new_price) /
                  product.price) *
                  100
              )}
              %
            </div>
          )
        )}
        {checkIsNewProduct && (
          <div className={`${cx("tag") ${cx("tag-new")`}}>Mới</div>
        )} */}

        {/* <div className={`${cx("tag") ${cx("tag-hot")`}}>Hot</div> */}
        {product?.groupProduct?.discounts[0]?.percent && (
          <div className={`${cx("tag")} ${cx("tag-sale")}`}>
            -{product.groupProduct.discounts[0].percent}%
          </div>
        )}
        {checkIsNewProduct && (
          <div className={`${cx("tag")} ${cx("tag-new")}`}>Mới</div>
        )}
      </div>
      <div
        className={cx("img-wrapper")}
        ref={productRef}
        style={{
          height: productRef.current
            ? `${(productRef.current.getBoundingClientRect().width * 3) / 2}px`
            : "400px",
        }}
      >
        <Link to={`/${product.slug}`} className={cx("img-link")}>
          <img src={getURL(product?.avatar)} alt={product?.name} />
        </Link>
        <div
          className={cx("btn-add-to-cart")}
          onClick={() => {
            dispatch(
              showModalAddToCart({
                open: true,
                productSlug: product.slug,
              })
            );
          }}
        >
          <Tooltip title="Thêm vào giỏ hàng">
            <AddShoppingCartIcon className={cx("add-to-cart-icon")} />
          </Tooltip>
        </div>
      </div>
      <div
        className={cx("btn-favorite")}
        style={{
          color: `${checkIsLoved ? "#f11" : "#000"}`,
        }}
        onClick={handleAddToFavoriteList}
      >
        {checkIsLoved ? (
          <Tooltip title="Huỷ bỏ yêu thích">
            <FavoriteIcon className={cx("favorite-icon")} />
          </Tooltip>
        ) : (
          <Tooltip title="Yêu thích">
            <FavoriteBorderOutlinedIcon className={cx("favorite-icon")} />
          </Tooltip>
        )}
      </div>
      {/* <Tooltip title={product.name}>
        <Link
          to={`/${product.slug}`}
          className="product-name three-dot three-dot-2 hover-color-main-color"
          style={{
            height: "45px",
            marginTop: "1px",
          }}
        >
          {product.name}
        </Link>
      </Tooltip> */}

      <div className={cx("price-wrapper")}>
        <span
          className={cx("price")}
          style={{
            textDecoration: product?.groupProduct?.discounts[0]?.percent
              ? "line-through"
              : "none",
          }}
        >
          {formatThousandDigits(product.initPrice)} ₫
        </span>
        {product?.groupProduct?.discounts[0]?.percent && (
          <span className={cx("new-price")} style={{ marginLeft: 8 }}>
            {formatThousandDigits(
              getFinalPrice(
                product.initPrice,
                product.groupProduct.discounts[0]
              )
            )}{" "}
            ₫
          </span>
        )}
      </div>
    </Box>
  );
};

export default Product;
