import { Box, Container, Grid, Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { API_PRODUCT_URL } from "../../constants";
import Filter from "./Filter";
import Product from "../../components/Product";
import { PRODUCTS_PER_PAGE } from "../../constants";
import { configAxiosAll } from "../../config/configAxios";
import "./ProductCategory.css";
import Sort from "./Sort";
const ProductsCategory = ({ category, groupCategory, genderCategory }) => {
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();
  const { category_slug } = useParams();

  const [queryParams] = useSearchParams();
  const p = queryParams.get("p");
  const material = queryParams.get("material");
  const color = queryParams.get("color");
  const size = queryParams.get("size");
  const price = queryParams.get("price");
  const sortBy = queryParams.get("sortBy");
  const sortType = queryParams.get("sortType");
  const [product, setProduct] = useState();
  const [page, setPage] = useState(initPage(p));
  const [sort, setSort] = useState({ sortBy, sortType });
  const [queryString, setQueryString] = useState(queryParams.toString());
  const [filters, setFilters] = useState(
    (function () {
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
    })()
  );

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
    document.title = category ? category.name : groupCategory.name;
  }, [category, groupCategory.name]);

  useEffect(() => {
    (async function () {
      try {
        const data = await configAxiosAll(user, dispatch).get(
          `${API_PRODUCT_URL}/${
            category ? "category" : "group-category"
          }/${category_slug}?include=true&limit=${PRODUCTS_PER_PAGE}${
            filters ? "&" + queryString : ""
          }`
        );
        setProduct(data);
      } catch (error) {}
    })();
  }, [
    queryParams,
    category,
    category_slug,
    user,
    dispatch,
    filters,
    queryString,
  ]);

  useEffect(() => {
    let url;
    const otherQueryParams = {};
    if (sort && sort.sortBy && sort.sortType) {
      // objQuery.sortBy = sort.sortBy;
      // objQuery.sortType = sort.sortType;
      queryParams.set("sortBy", sort.sortBy);
      queryParams.set("sortType", sort.sortType);
      otherQueryParams.sortBy = sort.sortBy;
      if (
        sort.sortType.toLowerCase() !== "asc" ||
        sort.sortType.toLowerCase() !== "desc"
      ) {
        otherQueryParams.sortType = "desc";
        setQueryString(new URLSearchParams(otherQueryParams).toString());
      }
    } else {
      queryParams.delete("sortBy");
      queryParams.delete("sortType");
    }

    if (page > 1) {
      queryParams.set("p", page);
    } else {
      queryParams.delete("p");
    }

    if (filters) {
      for (const key in filters) {
        if (filters[key].length > 0) {
          queryParams.set(key, JSON.stringify(filters[key]));
        } else {
          queryParams.delete(key);
        }
      }
    }

    url = queryParams.toString();
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

  return (
    <Box sx={{ paddingBlock: "20px" }}>
      <Container sx={{ backgroundColor: "#fff" }}>
        <Grid container>
          <Grid item lg={12}>
            <Grid container>
              <Grid
                item
                lg={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBlock: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Filter filters={filters} setFilters={setFilters} />
                  {product?.items?.length > 0 && (
                    <span>{product?.total_result} mặt hàng</span>
                  )}
                </div>

                <Sort sortFilter={sort} setSortFilter={setSort} />
              </Grid>
            </Grid>
            <Grid container columnSpacing={2} rowSpacing={2}>
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
              {product?.total_page > 1 && (
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Stack spacing={2}>
                    <Pagination
                      count={product.total_page}
                      color="primary"
                      page={page > 0 ? page : 1}
                      onChange={(e, value) => {
                        setPage(value);
                      }}
                    />
                  </Stack>
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
