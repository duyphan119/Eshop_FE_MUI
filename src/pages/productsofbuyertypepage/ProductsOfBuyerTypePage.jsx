import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiGetCategoriesByBuyerTypeSlug } from "../../api/apiCategory";
import { apiGetGroupCategoriesByBuyerTypeSlug } from "../../api/apiGroupCategory";
import { apiGetProductsByCategorySlug } from "../../api/apiProduct";
import BannerSlider from "../../components/banner-slider/BannerSlider";
import Categories from "../../components/categories/Categories";
import Products from "../../components/products/Products";
import Services from "../../components/services/Services";
import * as constants from "../../constants";
import "./productsofbuyertypepage.scss";
const ProductsOfBuyerTypePage = ({ buyerType }) => {
  const products = useSelector((state) => state.product.list);
  const user = useSelector((state) => state.auth.currentUser);
  const categories = useSelector((state) => state.category.list);
  const groupCategories = useSelector((state) => state.groupCategory.list);
  const [indexGroup, setIndexGroup] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    apiGetCategoriesByBuyerTypeSlug(buyerType.slug, dispatch);
    apiGetGroupCategoriesByBuyerTypeSlug(buyerType.slug, dispatch);
  }, [buyerType, dispatch]);
  useEffect(() => {
    groupCategories.length !== 0 &&
      apiGetProductsByCategorySlug(
        user,
        groupCategories[indexGroup].slug,
        "",
        dispatch
      );
  }, [user, groupCategories, indexGroup, dispatch]);
  const handleClickCategory = (index) => {
    setIndexGroup(index);
  };
  return (
    <>
      <BannerSlider />
      <Services />
      <Container className="category-icons__container">
        <Row className="category-icons__main">
          <Col xs={12} className="category-icons__title">
            MUA THEO THỂ LOẠI
          </Col>
          {categories.map(
            (category) =>
              category.icon && (
                <Col xs={3} className="category-icons__card" key={category.id}>
                  <Link
                    to={`/${category.slug}`}
                    className="category-icons__card-link"
                  >
                    <img
                      src={
                        category.icon && constants.SERVER_URL + category.icon
                      }
                      alt=""
                    />
                    <span>
                      {
                        category.name.split(
                          ` ${buyerType.name.toLowerCase()}`
                        )[0]
                      }
                    </span>
                  </Link>
                </Col>
              )
          )}
        </Row>
      </Container>
      <div className="products__title">DÀNH CHO BẠN</div>
      <Categories
        array={groupCategories.map((item) => {
          return {
            ...item,
            name: item.name.split(` ${buyerType.name.toLowerCase()}`)[0],
          };
        })}
        indexClick={indexGroup}
        onClick={(i) => handleClickCategory(i)}
      />
      <Products products={products} />
    </>
  );
};

export default ProductsOfBuyerTypePage;
