import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  apiAddToFavoriteList,
  apiRemoveFavoriteItem,
} from "../api/apiProductUser";
import { calculateProductSale } from "../utils";
import "./styles/product.css";

const Product = ({ product }) => {
  const user = useSelector((state) => state.auth.currentUser);
  const favoriteList = useSelector((state) => state.product.favoriteList);

  const dispatch = useDispatch();

  const [isLoved, setIsLoved] = useState(
    favoriteList.find((item) => item.product_id === product.id) ? true : false
  );
  const [indexColor, setIndexColor] = useState(0);

  const handleAddToFavoriteList = () => {
    if (user) {
      if (isLoved) {
        apiRemoveFavoriteItem(user, { product_id: product.id }, dispatch);
      } else {
        apiAddToFavoriteList(user, { product_id: product.id }, dispatch);
      }
      setIsLoved(!isLoved);
    }
  };
  const checkHasSale = () => {
    if (product && product.product_sales) {
      const sale = product.product_sales.find((item) => {
        const date1 = new Date();
        const date2 = new Date(item.finish);
        const diffDays = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));
        return diffDays > 0;
      });
      return sale ? sale.percent : null;
    }
    return null;
  };

  const sale = checkHasSale();

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
  if (!product || product?.product_colors?.length === 0) {
    return "";
  }
  return (
    <Box className="product">
      <div className="product-tags">
        {sale && <div className="product-tag product-tag-sale">-{sale}%</div>}
        {checkIsNewProduct() && (
          <div className="product-tag product-tag-new">Mới</div>
        )}

        {/* <div className="product-tag product-tag-hot">Hot</div> */}
      </div>
      <Link to={`/${product.slug}`} className="product-img-link">
        <img
          src={product.product_colors[indexColor].thumbnail}
          alt={product.name}
        />
      </Link>
      <div
        className="product-favorite-btn"
        style={{
          color: `${isLoved ? "#f11" : "#000"}`,
        }}
        onClick={handleAddToFavoriteList}
      >
        {isLoved ? (
          <FavoriteIcon className="product-favorite-icon" />
        ) : (
          <FavoriteBorderOutlinedIcon className="product-favorite-icon" />
        )}
      </div>
      <Link
        to={`/${product.slug}`}
        className="product-name three-dot three-dot-2"
      >
        {product.name}
      </Link>
      <Typography variant="body2">
        {sale && (
          <span className="product-new-price">
            {calculateProductSale(product.price, sale)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            đ
          </span>
        )}
        <span className={`${sale ? "product-old-price" : "product-price"}`}>
          {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
        </span>
      </Typography>
      <div className="product-colors-preview">
        {product.product_colors.map((product_color, index) => (
          <div
            className="product-color-preview"
            key={product_color.id + Math.random()}
            style={{
              backgroundColor: `${product_color.color_code}`,
            }}
            onClick={() => setIndexColor(index)}
          ></div>
        ))}
      </div>
    </Box>
  );
};

export default Product;
