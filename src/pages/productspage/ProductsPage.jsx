import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { apiGetProductsByCategorySlug } from "../../api/apiProduct";
import Products from "../../components/products/Products";
import ProductsFilter from "../../components/productsfilter/ProductsFilter";
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
    name: "newPrice",
    type: "asc",
  },
  {
    text: "Giá giảm dần",
    name: "newPrice",
    type: "desc",
  },
  {
    value: "newest",
    text: "Mới nhất",
    name: "createdAt",
    type: "desc",
  },
];
const ProductsPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { categorySlug } = params;
  const [queries] = useSearchParams();
  const [sortBy, setSortBy] = useState({
    name: queries.get("sortBy") ? queries.get("sortBy") : sortFilters[0].name,
    type: queries.get("sortType")
      ? queries.get("sortType")
      : sortFilters[0].type,
  });
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
      name: "newPrice",
      values: [],
    },
  ]);
  const dispatch = useDispatch();
  useEffect(() => {
    let url = "";
    let _filters = [...filters].filter((item) => item.values.length !== 0);
    if (sortBy.name === "" && sortBy.type === "") {
      url = `/${categorySlug}`;
    } else {
      url = `/${categorySlug}?sortBy=${sortBy.name}&sortType=${sortBy.type}`;
    }
    if (_filters.length !== 0) {
      _filters.forEach((filter, index) => {
        if (index === 0 && url === `/${categorySlug}`) {
          url += `?${filter.name}=${JSON.stringify(filter.values)}`;
        } else {
          url += `&${filter.name}=${JSON.stringify(filter.values)}`;
        }
      });
    }
    if (!window.location.href.endsWith(url)) navigate(url);
  }, [sortBy, categorySlug, filters, navigate]);
  useEffect(() => {
    apiGetProductsByCategorySlug(categorySlug, location.search, dispatch);
  }, [categorySlug, location, dispatch]);

  return (
    <Container className="products-page__container">
      <Row className="products-page">
        <Col xs={12} className="products-page__title">
          ÁO SƠ MI NAM
        </Col>
        <ProductsFilter filters={filters} setFilters={setFilters} />
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
          <Products />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsPage;
