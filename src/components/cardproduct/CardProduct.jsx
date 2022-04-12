import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiAddToWishlist, apiRemoveWishlistItem } from "../../api/apiWishlist";
import { separateThousands } from "../../utils";
import "./cardproduct.scss";
const CardProduct = ({ item }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const handleAddToWishList = () => {
    if (item.isWished) {
      apiRemoveWishlistItem(
        user,
        { productSlug: item.slug, userId: user.id },
        dispatch
      );
    } else {
      apiAddToWishlist(
        user,
        { productSlug: item.slug, userId: user.id },
        dispatch
      );
    }
  };
  return (
    <div className="card-product">
      <div
        className={`card-product__wish ${item.isWished ? "is-wished" : ""}`}
        onClick={handleAddToWishList}
      >
        {item.isWished ? <BsHeartFill /> : <BsHeart />}
      </div>
      <Link to={`/${item.slug}`} className="card-product__img">
        <img
          src={
            item.Product_Colors[0].Product_Color_Images.find(
              (item) => item.is_thumbnail
            ).url
          }
          alt=""
        />
      </Link>
      <Link to={`/${item.slug}`} className="card-product__name">
        {item.name}
      </Link>
      <div className="card-product__price">
        <div className="card-product__price-new">
          {separateThousands(item.price)}đ
        </div>
        {item.price === 0 && (
          <div className="card-product__price-old">
            {separateThousands(item.price)}đ
          </div>
        )}
      </div>
    </div>
  );
};

export default CardProduct;
