import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import CardProduct from "../cardproduct/CardProduct";
import "./products.scss";
const Products = ({ products, hasLoadMore, numPerLoadMode, col }) => {
  const [productsPerLoadMore, setProductsPerLoadMore] = useState(numPerLoadMode ? numPerLoadMode : 0);

  const handleLoadMore = () => {
    let a = productsPerLoadMore + 10;
    if (a > products.length) {
      a = 10;
    } else {
      if (a > products.length)
        a = products.length
    }
    setProductsPerLoadMore(a)
  }

  useEffect(()=>{
    if(numPerLoadMode){
      setProductsPerLoadMore(numPerLoadMode)
    }
  }, [products, numPerLoadMode])
  if (!products) return "";
  return (
    <Container>
      <Row className="products">
        {products.length !== 0 ? (
          [...products].splice(0, hasLoadMore ? productsPerLoadMore: products.length).map((item, index) => {
            return <Col lg={col ? col : 3} sm={6} md={col ? col : 3} className="card-product" key={index}>
              <CardProduct item={item} key={item.id} />
            </Col>
          })
        ) : (
          <Col xs={12} className="products__not-found">
            Không có sản phẩm trong danh mục này
          </Col>
        )}
      </Row>
      {hasLoadMore && products.length > numPerLoadMode &&
        <Row>
          <Col xs={12} className="products__load-more">
            <button onClick={handleLoadMore}>
              {productsPerLoadMore === products.length ? "Thu gọn" : "Xem thêm"}
            </button>
          </Col>
        </Row>
      }
    </Container>
  );
};

export default Products;
