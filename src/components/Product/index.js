import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Box, Tooltip, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { configAxiosAll } from "../../config/configAxios";
import { API_PRODUCT_USER_URL, PRODUCT_COLORS_PREVIEW } from "../../constants";
import { showModalAddToCart } from "../../redux/cartSlice";
import { getCurrentProduct } from "../../redux/productSlice";
import { showToastMessage } from "../../redux/toastSlice";
import { addToWishlist, removeWishlistItem } from "../../redux/wishlistSlice";
import { formatThousandDigits, getNewPrice } from "../../utils";
import "./Product.css";

const Product = ({ product }) => {
  const user = useSelector((state) => state.auth.currentUser);
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const dispatch = useDispatch();

  const [indexColor, setIndexColor] = useState(0);
  const [productUser, setProductUser] = useState();

  const productRef = useRef();

  useEffect(() => {
    // setProductUser(wishlist.findIndex((item) => item.id === product.id) !== -1);
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

  if (!product || product?.colors?.length === 0) {
    return "";
  }
  return (
    <Box className="product">
      <div className="product-tags">
        {/* {product &&
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
          <div className="product-tag product-tag-new">Mới</div>
        )} */}

        {/* <div className="product-tag product-tag-hot">Hot</div> */}
      </div>
      <div
        className="product-img-wrapper"
        ref={productRef}
        // style={{
        // height: productRef.current
        //   ? `${(productRef.current.getBoundingClientRect().width * 3) / 2}px`
        //   : "0",
        // }}
      >
        <Link to={`/${product.slug}`} className="product-img-link">
          <img src={product?.avatar} alt={product?.name} />
        </Link>
        <div
          className="product-add-to-cart-btn"
          onClick={() => {
            dispatch(getCurrentProduct(product));
            dispatch(showModalAddToCart(true));
          }}
        >
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
      <Typography variant="body2">
        {/* {product &&
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
              {formatThousandDigits(
                product.discounts[product.discounts.length - 1].new_price
              )}
              đ
            </span>
          )
        )} */}
        <span
          // className={`${
          //   product &&
          //   ((product.category.discounts &&
          //     product.category.discounts.length > 0) ||
          //     (product.discounts && product.discounts.length > 0))
          //     ? "product-old-price"
          //     : "product-price"
          // }`}
          className="product-price"
        >
          {formatThousandDigits(product.initPrice)} ₫
        </span>
      </Typography>
      {/* <div className="product-colors-preview">
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
      </div> */}
    </Box>
  );
};

export default Product;
