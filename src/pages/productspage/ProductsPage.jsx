import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  apiGetProductsByCategorySlug,
  apiGetProductsByGroupCategorySlug,
} from "../../api/apiProduct";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import Paginations from "../../components/pagination/Pagination";
import Products from "../../components/products/Products";
import ProductsFilter from "../../components/productsfilter/ProductsFilter";
import NotFoundPage from "../notfoundpage/NotFoundPage";
import "./productspage.scss";
const sortFilters = [
  {
    text: "Mặc định",
    name: "",
    type: "",
  },
  {
    text: "Từ A-Z",
    name: "name",
    type: "asc",
  },
  {
    text: "Từ Z-A",
    name: "name",
    type: "desc",
  },
  {
    text: "Rẻ nhất",
    name: "price",
    type: "asc",
  },
  {
    text: "Giá giảm dần",
    name: "price",
    type: "desc",
  },
  {
    text: "Mới nhất",
    name: "createdAt",
    type: "asc",
  },
];
const limitProductsInPage = 20;
const ProductsPage = ({ groupCategory, category, collectionProduct }) => {
  const products = useSelector((state) => state.product.list);
  const user = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  const location = useLocation();
  const [queries] = useSearchParams();
  const p = queries.get("p");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(p ? parseInt(p) : 1);
  const [sortBy, setSortBy] = useState({
    name: queries.get("sortBy") ? queries.get("sortBy") : sortFilters[0].name,
    type: queries.get("sortType")
      ? queries.get("sortType")
      : sortFilters[0].type,
  });

  const slug = groupCategory
    ? groupCategory.slug
    : category
    ? category.slug
    : "";
  const [filters, setFilters] = useState([
    {
      name: "color",
      values: [],
    },
    {
      name: "size",
      values: [],
    },
    {
      name: "price",
      values: [],
    },
  ]);
  const dispatch = useDispatch();

  // useEffect(()=>{

  // }, [sortBy])

  useEffect(() => {
    document.title = groupCategory
      ? groupCategory.full_name
      : category
      ? category.full_name
      : collectionProduct.full_name;
  }, [groupCategory, category, collectionProduct]);

  useEffect(() => {
    if (products) {
      setTotalPages(Math.round(products.length / limitProductsInPage) + 1);
    }
  }, [products]);

  useEffect(() => {
    let url = `/${slug === "" ? collectionProduct.slug : slug}`;
    let _filters = [...filters].filter((item) => item.values.length !== 0);
    let urlSearchParams = {};
    if (sortBy.name !== "") {
      urlSearchParams.sortBy = sortBy.name;
    }
    if (sortBy.name !== "") {
      urlSearchParams.sortType = sortBy.type;
    }
    if (_filters.length !== 0) {
      _filters.forEach((filter, index) => {
        urlSearchParams[filter.name] = JSON.stringify(filter.values);
      });
    }
    if (p || currentPage !== 1) {
      urlSearchParams.p = currentPage;
    }
    url += "?" + new URLSearchParams(urlSearchParams).toString();
    if (!window.location.href.endsWith(url)) navigate(url);
  }, [sortBy, slug, filters, navigate, currentPage, p, collectionProduct]);
  useEffect(() => {
    if (collectionProduct) {
      // apiGetProductsByCollectionId(
      //   user,
      //   collectionProduct.id,
      //   location.search,
      //   dispatch
      // );
    } else {
      if (category) {
        apiGetProductsByCategorySlug(user, slug, location.search, dispatch);
      } else if (groupCategory) {
        apiGetProductsByGroupCategorySlug(
          user,
          slug,
          location.search,
          dispatch
        );
      }
    }
  }, [
    dispatch,
    location.search,
    slug,
    user,
    collectionProduct,
    category,
    groupCategory,
  ]);

  // useEffect(()=>{
  //   if(collectionSlug){
  //     apiGetProductsByCollectionSlug(user, collectionSlug, location.search, dispatch);
  //   }

  // }, [collectionSlug, dispatch, location.search, user])
  if (products && (currentPage - 1) * limitProductsInPage > products.length) {
    return <NotFoundPage />;
  }
  if (!products) return "";
  return (
    <Container className="products-page__container">
      <Row className="products-page">
        <Col
          xs={12}
          style={{
            fontSize: "1.6rem",
          }}
        >
          {groupCategory && (
            <BreadCrumb
              items={[
                {
                  name: "Trang chủ",
                  link: "/",
                },
                {
                  name: groupCategory.Gender_Category.short_name,
                  link: `/${groupCategory.Gender_Category.slug}`,
                },
              ]}
            />
          )}
          {category && (
            <BreadCrumb
              items={[
                {
                  name: "Trang chủ",
                  link: "/",
                },
                {
                  name: category.Group_Category.Gender_Category.short_name,
                  link: `/${category.Group_Category.Gender_Category.slug}`,
                },
                {
                  name: category.Group_Category.short_name,
                  link: `/${category.Group_Category.slug}`,
                },
              ]}
            />
          )}
          {collectionProduct && (
            <BreadCrumb
              items={[
                {
                  name: "Trang chủ",
                  link: "/",
                },
                {
                  name: "Bộ sưu tập",
                  link: `/${collectionProduct.slug}`,
                },
              ]}
            />
          )}
        </Col>
        <Col xs={12} className="products-page__title">
          {groupCategory
            ? groupCategory.full_name.toUpperCase()
            : category
            ? category.full_name.toUpperCase()
            : collectionProduct.full_name.toUpperCase()}
        </Col>
        <ProductsFilter filters={filters} setFilters={setFilters} />
        <Col xs={9}>
          <Container>
            <div className="products-page__sort">
              <div className="products-page__sort-left">
                {products.length} sản phẩm
              </div>
              <div className="products-page__sort-right">
                Sắp xếp theo
                <div className="products-page__sort-filter">
                  <div className="products-page__sort-filter-content">
                    Mặc định <BsChevronDown />
                  </div>
                  <ul className="products-page__sort-filter-list">
                    {sortFilters.map((item) => {
                      return (
                        <li
                          className={`products-page__sort-filter-item ${
                            sortBy.name === item.name &&
                            sortBy.type === item.type
                              ? "active"
                              : ""
                          }`}
                          key={item.text + item.name}
                          onClick={() =>
                            setSortBy({ name: item.name, type: item.type })
                          }
                        >
                          {item.text}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
          <Products
            // products={[...products].splice(
            //   (currentPage - 1) * limitProductsInPage,
            //   limitProductsInPage
            // )}
            products={products}
          />
          <Paginations
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsPage;
