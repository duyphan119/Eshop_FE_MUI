import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import "./cardproduct.scss";
import * as constants from "../../constants";
import { separateThousands } from "../../utils";
const CardProduct = ({ item }) => {
  return (
    <Col xs={3} className="card-product">
      <Link to={`/product/${item.slug}`} className="card-product__img">
        <img
          src={(() => {
            try {
              return `${constants.SERVER_URL}${item.productColors[0].images[0].image}`;
            } catch (error) {
              return constants.IMAGE_IS_NOT_AVAILABLE_URL;
            }
          })()}
          alt=""
        />
      </Link>
      <Link to={`/product/${item.slug}`} className="card-product__name">
        {item.name}
      </Link>
      <div className="card-product__price">
        <div className="card-product__price-new">{separateThousands(item.newPrice)}đ</div>
        <div className="card-product__price-old">{separateThousands(item.oldPrice)}đ</div>
      </div>
    </Col>
  );
};

export default CardProduct;
