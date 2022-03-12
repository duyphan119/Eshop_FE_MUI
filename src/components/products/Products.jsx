import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useSelector } from "react-redux";
import CardProduct from "../cardproduct/CardProduct";
import "./products.scss";
const Products = () => {
  const products = useSelector((state) => state.product.list);
  return (
    <Container>
      <Row className="products">
        {products.map((item, index) => {
          return <CardProduct item={item} key={item.id} />;
        })}
      </Row>
    </Container>
  );
};

export default Products;
