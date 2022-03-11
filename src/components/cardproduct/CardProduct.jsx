import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import "./cardproduct.scss";

const CardProduct = ({ item }) => {
  return (
    <Col xs={3} className="card-product">
      <Link to={`/`} className="card-product__img">
        <img src={item.img} alt="" />
      </Link>
      <Link to={`/`} className="card-product__name">
        {item.name}
      </Link>
      <div className="card-product__price">
        <div className="card-product__price-new">{item.newPrice}</div>
        <div className="card-product__price-old">{item.oldPrice}</div>
      </div>
    </Col>
  );
};

export default CardProduct;
