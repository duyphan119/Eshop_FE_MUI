import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Box, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { configAxiosAll } from "../../config/configAxios";
// import {
//   apiAddToFavoriteList,
//   apiRemoveFavoriteItem,
// } from "../api/apiProductUser";
import { API_PRODUCT_USER_URL, PRODUCT_COLORS_PREVIEW } from "../../constants";
import { formatThousandDigits } from "../../utils";
import { showToastMessage } from "../../redux/toastSlice";
import "./Product.css";
import { addToWishlist, removeWishlistItem } from "../../redux/wishlistSlice";

const Product = ({ product }) => {
  const user = useSelector((state) => state.auth.currentUser);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();

  // const [isLoved, setIsLoved] = useState(
  //   favoriteList.find((item) => item.product_id === product.id) ? true : false
  // );
  const [indexColor, setIndexColor] = useState(0);
  const [productUser, setProductUser] = useState();

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

  const checkIsNewProduct = () => {
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
  };
  if (!product || product?.colors?.length === 0) {
    return "";
  }
  return (
    <Box className="product">
      <div className="product-tags">
        {product && product.discounts && product.discounts.length > 0 && (
          <div className="product-tag product-tag-sale">
            -
            {Math.round(
              ((product.price - product.discounts[0].new_price) /
                product.price) *
                100
            )}
            %
          </div>
        )}
        {checkIsNewProduct() && (
          <div className="product-tag product-tag-new">Mới</div>
        )}

        {/* <div className="product-tag product-tag-hot">Hot</div> */}
      </div>
      <Link to={`/product/${product.slug}`} className="product-img-link">
        <img
          src={product?.colors[indexColor]?.images[0]?.url}
          alt={product?.name}
        />
      </Link>
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
      <Link
        to={`/product/${product.slug}`}
        className="product-name three-dot three-dot-2"
        style={{
          height: "45px",
          marginTop: "1px",
        }}
      >
        {product.name}
      </Link>
      <Typography variant="body2">
        {product && product.discounts && product.discounts.length > 0 && (
          <span className="product-new-price">
            {formatThousandDigits(product.discounts[0].new_price)}đ
          </span>
        )}
        <span
          className={`${
            product && product.discounts && product.discounts.length > 0
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
            <div
              className="product-color-preview"
              key={color.id + Math.random()}
              style={{
                width: "36px",
                height: "36px",
                cursor: "pointer",
                marginRight: "6px",
                backgroundImage: `url("${color.images[0].url}")`,
                backgroundClip: "content-box",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: "50%",
              }}
              onClick={() => setIndexColor(index)}
            ></div>
          ) : (
            <></>
          )
        )}
      </div>
    </Box>
  );
};

export default Product;
