import { Box, Container, Grid } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import Product from "../../components/Product";
import Breadcrumbs from "../../components/Breadcrumbs";
import Pagination from "../../components/Pagination";
import Filter from "./Filter";
import {
  API_COLOR_URL,
  API_MATERIAL_URL,
  API_SIZE_URL,
  PRODUCTS_PER_PAGE,
} from "../../constants";
import { configAxiosAll, configAxiosResponse } from "../../config/configAxios";
import Sort from "./Sort";
import "./ProductCategory.css";
const ProductsCategory = ({
  category,
  groupCategory,
  genderCategory,
  query,
  title,
}) => {
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const [queryParams] = useSearchParams();
  const p = queryParams.get("p");
  const material = queryParams.get("material");
  const color = queryParams.get("color");
  const size = queryParams.get("size");
  const price = queryParams.get("price");
  const sortBy = queryParams.get("sortBy");
  const sortType = queryParams.get("sortType");

  const [product, setProduct] = useState();
  const [colorFilters, setColorFilters] = useState([]);
  const [sizeFilters, setSizeFilters] = useState([]);
  const [materialFilters, setMaterialFilters] = useState([]);
  const [page, setPage] = useState(() => {
    return initPage(p);
  });
  const [sort, setSort] = useState({ sortBy, sortType });
  const [queryString, setQueryString] = useState(queryParams.toString());
  const [filters, setFilters] = useState(() => {
    return (function () {
      try {
        return {
          color: color ? JSON.parse(color) : [],
          size: size ? JSON.parse(size) : [],
          price: price ? JSON.parse(price) : [],
          material: material ? JSON.parse(material) : [],
        };
      } catch (error) {
        return {
          color: [],
          size: [],
          material: [],
          price: [],
        };
      }
    })();
  });

  function initPage(_p) {
    try {
      let __p = parseInt(_p);
      if (isNaN(__p)) {
        return 1;
      }
      return __p;
    } catch (error) {
      return 1;
    }
  }

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    (async function () {
      try {
        const promises = [];
        promises.push(
          new Promise((resolve, reject) => {
            resolve(configAxiosResponse().get(`${API_COLOR_URL}`));
          })
        );
        promises.push(
          new Promise((resolve, reject) => {
            resolve(configAxiosResponse().get(`${API_SIZE_URL}`));
          })
        );
        promises.push(
          new Promise((resolve, reject) => {
            resolve(configAxiosResponse().get(`${API_MATERIAL_URL}`));
          })
        );
        const listRes = await Promise.allSettled(promises);
        if (listRes[0].status === "fulfilled") {
          setColorFilters(listRes[0].value);
        }
        if (listRes[1].status === "fulfilled") {
          setSizeFilters(listRes[1].value);
        }
        if (listRes[2].status === "fulfilled") {
          setMaterialFilters(listRes[2].value);
        }
      } catch (error) {}
    })();
  }, []);
  useEffect(() => {
    (async function () {
      try {
        let data = await configAxiosAll(user, dispatch).get(
          `${query}?include=true&limit=${PRODUCTS_PER_PAGE}${
            filters ? "&" + queryString : ""
          }`
        );
        setProduct(data);
      } catch (error) {}
    })();
  }, [dispatch, filters, query, queryString, user]);
  useEffect(() => {
    let url;
    const otherQueryParams = {};
    if (sort && sort.sortBy && sort.sortType) {
      // objQuery.sortBy = sort.sortBy;
      // objQuery.sortType = sort.sortType;
      queryParams.set("sortBy", sort.sortBy);
      queryParams.set("sortType", sort.sortType);
      otherQueryParams.sortBy = sort.sortBy;
      otherQueryParams.sortType = sort.sortType;
      if (
        sort.sortType.toLowerCase() !== "asc" &&
        sort.sortType.toLowerCase() !== "desc"
      ) {
        otherQueryParams.sortType = "desc";
      }
    } else {
      queryParams.delete("sortBy");
      queryParams.delete("sortType");
    }

    if (page > 1) {
      queryParams.set("p", page);
      otherQueryParams.p = page;
    } else {
      queryParams.delete("p");
    }

    if (filters) {
      for (const key in filters) {
        if (filters[key].length > 0) {
          queryParams.set(key, JSON.stringify(filters[key]));
          otherQueryParams[key] = JSON.stringify(filters[key]);
        } else {
          queryParams.delete(key);
        }
      }
    }

    url = queryParams.toString();
    setQueryString(new URLSearchParams(otherQueryParams).toString());
    if (url === "" && !window.location.href.endsWith(location.pathname)) {
      navigate(location.pathname);
    } else if (!window.location.href.endsWith(url)) {
      navigate(location.pathname + "?" + url);
    } else if (
      url !== location.pathname + "?" + location.search &&
      window.location.href.endsWith(location.pathname + "?" + location.search)
    ) {
      navigate(location.pathname + "?" + location.search);
    }
  }, [navigate, sort, location, page, filters, queryParams]);

  const showBreadCrumbs = useMemo(() => {
    let items = [{ text: "Trang chủ", to: "/" }];
    let text = "";
    if (category && groupCategory && genderCategory) {
      items = [
        ...items,
        {
          text: genderCategory.name,
          to: `/${genderCategory.slug}`,
        },
        {
          text: groupCategory.name,
          to: `/${groupCategory.slug}`,
        },
      ];
      text = category.name;
    } else if (groupCategory && genderCategory) {
      items = [
        ...items,
        {
          text: genderCategory.name,
          to: `/${genderCategory.slug}`,
        },
      ];
      text = groupCategory.name;
    } else if (genderCategory) {
      items = [
        ...items,
        {
          text: genderCategory.name,
          to: `/${genderCategory.slug}`,
        },
      ];
      text = `Thời trang ${genderCategory.name.toLowerCase()}`;
    } else {
      text = `Tất cả sản phẩm`;
    }

    return <Breadcrumbs items={items} text={text} />;
  }, [category, genderCategory, groupCategory]);

  return (
    <Box sx={{ paddingBlock: "20px" }}>
      <Container sx={{ backgroundColor: "#fff" }}>
        <Grid container>
          <Grid item lg={12}>
            {showBreadCrumbs}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBlock: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Filter
                    filters={filters}
                    setFilters={setFilters}
                    colorFilters={colorFilters.map((item) => item.value)}
                    sizeFilters={sizeFilters.map((item) => item.value)}
                    materialFilters={materialFilters.map((item) => item.value)}
                  />
                  {product?.items?.length > 0 && (
                    <span>{product?.total_result} mặt hàng</span>
                  )}
                </div>

                <Sort sortFilter={sort} setSortFilter={setSort} />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              {product && product.items && product.items.length === 0 && (
                <Grid
                  item
                  lg={12}
                  sx={{
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#ff9e49",
                      paddingBlock: "10px",
                    }}
                  >
                    Không có mặt hàng trong danh mục này
                  </div>
                </Grid>
              )}
              {product &&
                product.items &&
                product.items.length !== 0 &&
                product.items.map((product) => {
                  return (
                    <Grid
                      key={product.slug}
                      item
                      xs={6}
                      sm={4}
                      md={3}
                      sx={{
                        flexBasis: {
                          lg: "20% !important",
                        },
                        maxWidth: {
                          lg: "20% !important",
                        },
                        marginBottom: "8px",
                      }}
                    >
                      <Product product={product} />
                    </Grid>
                  );
                })}
              {product && product.total_page > 1 && (
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Pagination
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    totalPage={product.total_page}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductsCategory;
