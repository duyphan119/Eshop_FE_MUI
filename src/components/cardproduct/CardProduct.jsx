import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { separateThousands } from "../../utils";
import * as constants from "../../constants";
import "./cardproduct.scss";
import { apiAddToWishlist, apiRemoveWishlistItem } from "../../api/apiWishlist";
const CardProduct = ({ item }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const handleAddToWishList = () => {
    if (item.isWished) {
      apiRemoveWishlistItem(user,
        { productSlug: item.slug, userId: user.id },
        dispatch)
    } else {
      apiAddToWishlist(
        user,
        { productSlug: item.slug, userId: user.id },
        dispatch
      );
    }
  };
  return (
    <>
      <div
        className={`card-product__wish ${item.isWished ? "is-wished" : ""}`}
        onClick={handleAddToWishList}
      >
        {item.isWished ? <BsHeartFill /> : <BsHeart />}
      </div>
      <Link to={`/${item.slug}`} className="card-product__img">
        <img
          src={(() => {
            try {
              return `${item.productColors[0].images[0].image}`;
            } catch (error) {
              return constants.IMAGE_IS_NOT_AVAILABLE_URL;
            }
          })()}
          alt=""
        />
      </Link>
      <Link to={`/${item.slug}`} className="card-product__name">
        {item.name}
      </Link>
      <div className="card-product__price">
        <div className="card-product__price-new">
          {separateThousands(item.newPrice)}đ
        </div>
        {item.oldPrice !== item.newPrice && (
          <div className="card-product__price-old">
            {separateThousands(item.oldPrice)}đ
          </div>
        )}
      </div></>
  );
};

export default CardProduct;
