import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate, useSearchParams
} from "react-router-dom";
import { apiGetCategoryBySlug } from "../../api/apiCategory";
import { apiGetGroupCategoryBySlug } from "../../api/apiGroupCategory";
import {
  apiGetProductsByCategorySlug,
  apiGetTotalPages
} from "../../api/apiProduct";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import Paginations from "../../components/pagination/Pagination";
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
const limitProductsInPage = 2;
const ProductsPage = ({ groupCategory, category }) => {
  const products = useSelector((state) => state.product.list);
  const user = useSelector((state) => state.auth.currentUser);
  const [titleProducts, setTitleProducts] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [queries] = useSearchParams();
  const p = queries.get("page")
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(p ? parseInt(p) : 1);
  const [sortBy, setSortBy] = useState({
    name: queries.get("sortBy") ? queries.get("sortBy") : sortFilters[0].name,
    type: queries.get("sortType")
      ? queries.get("sortType")
      : sortFilters[0].type,
  });
  const slug = groupCategory ? groupCategory.slug : category.slug;
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
    const api = async () => {
      const totalPages = await apiGetTotalPages(
        slug,
        location.search,
        limitProductsInPage
      );
      setTotalPages(totalPages);
    };
    api();
  }, [slug, location]);

  useEffect(() => {
    let url = `/${slug}`;
    let _filters = [...filters].filter((item) => item.values.length !== 0);
    let urlSearchParams = {}
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
    if (p) {
      urlSearchParams.page = currentPage
    }
    url += "?" + new URLSearchParams(urlSearchParams).toString();
    if (!window.location.href.endsWith(url)) navigate(url);
  }, [sortBy, slug, filters, navigate, currentPage, p]);

  useEffect(() => {
    const api = async () => {
      let data = await apiGetGroupCategoryBySlug(slug);
      if (!data) {
        data = await apiGetCategoryBySlug(slug);
        if (data) {
          document.title = data.name;
          setTitleProducts(data.name);
        }
      } else {
        document.title = data.name;
        setTitleProducts(data.name);
      }
    };
    api();
  }, [slug]);

  useEffect(() => {
    let query = "";
    if (location.search === "") {
      query += `?num=${limitProductsInPage}&p=${currentPage}`;
    } else {
      query += `${location.search}&num=${limitProductsInPage}&p=${currentPage}`;
    }
    apiGetProductsByCategorySlug(user, slug, query, dispatch);
  }, [user, slug, location, dispatch, currentPage]);
  console.log(groupCategory)
  return (
    <Container className="products-page__container">
      <Row className="products-page">
        {groupCategory &&
          <Col Col xs={12} style={{
            fontSize:"1.6rem"
          }}>
            <BreadCrumb items={
              [
                {
                  name: "Trang chủ",
                  link: "/",
                },
                {
                  name: groupCategory.buyerType.name,
                  link: `/${groupCategory.buyerType.slug}`,
                },
              ]
            } />
          </Col>}
        <Col xs={12} className="products-page__title">
          {titleProducts.toUpperCase()}
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
                          className={`products-page__sort-filter-item ${sortBy.name === item.name &&
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
          <Products products={products} />
          <Paginations
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Col>
      </Row>
    </Container >
  );
};

export default ProductsPage;
