import React, { useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { apiGetProductsByCategorySlug } from "../../api/apiProduct";
import Products from "../../components/products/Products";
import ProductsFilter from "../../components/productsfilter/ProductsFilter";
import "./productspage.scss";
const ProductsPage = () => {
  const params = useParams();
  const { categorySlug } = params;
  const products = useSelector((state) => state.product.list);
  const dispatch = useDispatch();
  useEffect(() => {
    apiGetProductsByCategorySlug(categorySlug, dispatch);
  }, [categorySlug, dispatch]);
  return (
    <Container className="products-page__container">
      <Row className="products-page">
        <ProductsFilter />
        <Col xs={9}>
          <Products />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsPage;
