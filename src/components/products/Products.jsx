import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import CardProduct from "../cardproduct/CardProduct";
import "./products.scss";
const Products = ({ products }) => {
  if (!products) return "";
  return (
    <Container>
      <Row className="products">
        {products.length !== 0 ? (
          products.map((item, index) => {
            return <Col xs={3} className="card-product" key={index}>
              <CardProduct item={item} key={item.id} />
            </Col>
          })
        ) : (
          <Col xs={12} className="products__not-found">
            Không có sản phẩm trong danh mục này
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Products;
