import React, { useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { apiGetProductsByCategorySlug } from "../../api/apiProduct";
import Products from "../../components/products/Products";
import ProductsFilter from "../../components/productsfilter/ProductsFilter";
import "./productspage.scss";
const ProductsPage = () => {
  const params = useParams();
  const { categorySlug } = params;
  const dispatch = useDispatch();
  useEffect(() => {
    apiGetProductsByCategorySlug(categorySlug, dispatch);
  }, [categorySlug, dispatch]);
  return (
    <Container className="products-page__container">
      <Row className="products-page">
        <Col xs={12} className="products-page__title">ÁO SƠ MI NAM</Col>
        <ProductsFilter />
        <Col xs={9}>
          <Container>
            <div className="products-page__sort">
              <div className="products-page__sort-left">20 sản phẩm</div>
              <div className="products-page__sort-right">
                Sắp xếp theo
                <div className="products-page__sort-filter">
                  <div className="products-page__sort-filter-content">
                    Mặc định <BsChevronDown />
                  </div>
                  <ul className="products-page__sort-filter-list">
                    <li className="products-page__sort-filter-item active">
                      Mặc định
                    </li>
                    <li className="products-page__sort-filter-item">Từ A-Z</li>
                    <li className="products-page__sort-filter-item">Từ Z-A</li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
          <Products />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsPage;
