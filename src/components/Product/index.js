import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Box, Tooltip, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { configAxiosAll } from "../../config/configAxios";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  API_CART_ITEM_URL,
  API_PRODUCT_USER_URL,
  PRODUCT_COLORS_PREVIEW,
} from "../../constants";
import { formatThousandDigits, getNewPrice } from "../../utils";
import { showToastMessage } from "../../redux/toastSlice";
import "./Product.css";
import { addToWishlist, removeWishlistItem } from "../../redux/wishlistSlice";
import { addToCart } from "../../redux/cartSlice";

const Product = ({ product }) => {
  const user = useSelector((state) => state.auth.currentUser);
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const dispatch = useDispatch();

  const [indexColor, setIndexColor] = useState(0);
  const [productUser, setProductUser] = useState();

  const productRef = useRef();

  useEffect(() => {
    setProductUser(wishlist.findIndex((item) => item.id === product.id) !== -1);
  }, [product.id, wishlist]);

  async function handleAddToFavoriteList() {
    if (user) {
      try {
        if (!productUser) {
          await configAxiosAll(user, dispatch).post(`${API_PRODUCT_USER_URL}`, {
            product_id: product.id,
            user_id: user.id,
          });
          dispatch(addToWishlist(product));
          dispatch(
            showToastMessage({
              type: "success",
              text: "Đã thêm vào danh sách yêu thích",
              isOpen: true,
            })
          );
        } else {
          await configAxiosAll(user, dispatch).delete(
            `${API_PRODUCT_USER_URL}/product/${product.id}`
          );
          dispatch(removeWishlistItem(product.id));
          dispatch(
            showToastMessage({
              type: "success",
              text: "Đã xoá khỏi danh sách yêu thích",
              isOpen: true,
            })
          );
        }
        setProductUser(!productUser);
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
  async function handleAddToCart() {
    if (user) {
      const indexSize = product.colors[indexColor].sizes.findIndex(
        (el) => el.amount > 0
      );
      if (indexSize === -1) {
        dispatch(
          showToastMessage({
            text: "Sản phẩm thuộc màu này hiện đã hết",
            type: "info",
            isOpen: true,
          })
        );
      } else {
        if (1 > product.colors[indexColor].sizes[indexSize].amount) {
          dispatch(
            showToastMessage({
              text: "Số lượng không hợp lệ",
              type: "info",
              isOpen: true,
            })
          );
        } else {
          try {
            const data = await configAxiosAll(user, dispatch).post(
              `${API_CART_ITEM_URL}`,
              {
                product_detail_id:
                  product.colors[indexColor].sizes[indexSize].detail_id,
                quantity: 1,
                cart_id: user.cart.id,
              }
            );
            dispatch(addToCart(data));
            dispatch(
              showToastMessage({
                type: "success",
                text: "Thêm thành công",
                isOpen: true,
              })
            );
          } catch (error) {}
        }
      }
    } else {
      dispatch(
        showToastMessage({
          text: "Bạn cần phải đăng nhập để thêm giỏ hàng",
          type: "info",
          isOpen: true,
        })
      );
    }
  }
  if (!product || product?.colors?.length === 0) {
    return "";
  }
  return (
    <Box className="product">
      <div className="product-tags">
        {product &&
        product.category.discounts &&
        product.category.discounts.length > 0 ? (
          <div className="product-tag product-tag-sale">
            -{product.category.discounts[0].percent}%
          </div>
        ) : (
          product.discounts &&
          product.discounts.length > 0 && (
            <div className="product-tag product-tag-sale">
              -
              {Math.round(
                ((product.price - product.discounts[0].new_price) /
                  product.price) *
                  100
              )}
              %
            </div>
          )
        )}
        {checkIsNewProduct && (
          <div className="product-tag product-tag-new">Mới</div>
        )}

        {/* <div className="product-tag product-tag-hot">Hot</div> */}
      </div>
      <div
        className="product-img-wrapper"
        ref={productRef}
        style={{
          height: productRef.current
            ? `${(productRef.current.getBoundingClientRect().width * 3) / 2}px`
            : "0",
        }}
      >
        <Link to={`/product/${product.slug}`} className="product-img-link">
          <img
            src={product?.colors[indexColor]?.images[0]?.url}
            alt={product?.name}
          />
        </Link>
        <div className="product-add-to-cart-btn" onClick={handleAddToCart}>
          <Tooltip title="Thêm vào giỏ hàng">
            <AddShoppingCartIcon className="product-add-to-cart-icon" />
          </Tooltip>
        </div>
      </div>
      <div
        className="product-favorite-btn"
        style={{
          color: `${productUser ? "#f11" : "#000"}`,
        }}
        onClick={handleAddToFavoriteList}
      >
        {productUser ? (
          <Tooltip title="Huỷ bỏ yêu thích">
            <FavoriteIcon className="product-favorite-icon" />
          </Tooltip>
        ) : (
          <Tooltip title="Yêu thích">
            <FavoriteBorderOutlinedIcon className="product-favorite-icon" />
          </Tooltip>
        )}
      </div>
      <Tooltip title={product.name}>
        <Link
          to={`/product/${product.slug}`}
          className="product-name three-dot three-dot-2 hover-color-main-color"
          style={{
            height: "45px",
            marginTop: "1px",
          }}
        >
          {product.name}
        </Link>
      </Tooltip>
      <Typography variant="body2">
        {product &&
        product.category.discounts &&
        product.category.discounts.length > 0 ? (
          <span className="product-new-price">
            {formatThousandDigits(
              getNewPrice(product.price, product.category.discounts[0].percent)
            )}
            đ
          </span>
        ) : (
          product.discounts &&
          product.discounts.length > 0 && (
            <span className="product-new-price">
              {formatThousandDigits(product.discounts[0].new_price)}đ
            </span>
          )
        )}
        <span
          className={`${
            product &&
            ((product.category.discounts &&
              product.category.discounts.length > 0) ||
              (product.discounts && product.discounts.length > 0))
              ? "product-old-price"
              : "product-price"
          }`}
        >
          {formatThousandDigits(product.price)}đ
        </span>
      </Typography>
      <div className="product-colors-preview">
        {product.colors.map((color, index) =>
          index < PRODUCT_COLORS_PREVIEW ? (
            <Tooltip title={`Màu ${color.value.toLowerCase()}`} key={index}>
              <div
                className="product-color-preview"
                style={{
                  backgroundImage: `url("${color.images[0].url}")`,
                }}
                onClick={() => setIndexColor(index)}
              ></div>
            </Tooltip>
          ) : (
            <></>
          )
        )}
      </div>
    </Box>
  );
};

export default Product;
