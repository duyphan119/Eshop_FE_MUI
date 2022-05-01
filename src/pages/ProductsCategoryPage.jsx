import { Box, Container, Grid, Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  apiGetProductsByCategorySlug,
  apiGetProductsByGroupCategorySlug,
} from "../api/apiProduct";
import FilterProduct from "../components/FilterProduct";
import Product from "../components/Product";
import SortProduct from "../components/SortProduct";
import { PRODUCTS_PER_PAGE } from "../constants";
import "./style/products_category.css";
const ProductsCategoryPage = ({ category, groupCategory }) => {
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const [queryParams] = useSearchParams();
  const p = queryParams.get("p");

  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState();
  const [sortFilter, setSortFilter] = useState();
  const [filters, setFilters] = useState({
    color: queryParams.get("color")
      ? JSON.parse(queryParams.get("color")).map((item) => {
          return { color: item };
        })
      : [],
    size: queryParams.get("size") ? JSON.parse(queryParams.get("size")) : [],
    price: queryParams.get("price") ? JSON.parse(queryParams.get("price")) : [],
  });
  const [page, setPage] = useState(
    (() => {
      try {
        const _p = parseInt(p);
        if (isNaN(_p)) {
          return 0;
        }
        return _p;
      } catch (error) {
        return 0;
      }
    })()
  );

  useEffect(() => {
    if (groupCategory) {
      document.title = groupCategory.full_name;
    } else if (category) {
      document.title = category.full_name;
    }
  }, [category, groupCategory]);

  // Lấy sản phẩm theo category hoặc group category
  useEffect(() => {
    const callApi = async () => {
      if (category) {
        const data = await apiGetProductsByCategorySlug(
          user,
          category.slug,
          location.search === ""
            ? `?limit=${PRODUCTS_PER_PAGE}`
            : `${location.search}&limit=${PRODUCTS_PER_PAGE}`,
          dispatch
        );
        setProducts(data);
      } else if (groupCategory) {
        const data = await apiGetProductsByGroupCategorySlug(
          user,
          groupCategory.slug,
          location.search === ""
            ? `?limit=${PRODUCTS_PER_PAGE}`
            : `${location.search}&limit=${PRODUCTS_PER_PAGE}`,
          dispatch
        );
        setProducts(data);
      }
    };
    callApi();
  }, [user, category, groupCategory, dispatch, location.search]);
  // Thay đổi url khi chọn sort filter
  useEffect(() => {
    let url = "";

    let urlSearchParams = {};

    if (sortFilter && sortFilter.name && sortFilter.type) {
      urlSearchParams.sortBy = sortFilter.name;
      urlSearchParams.sortType = sortFilter.type;
    }
    if (filters.color.length !== 0)
      urlSearchParams.color = JSON.stringify(
        filters.color.map((item) => item.color)
      );
    if (filters.size.length !== 0)
      urlSearchParams.size = JSON.stringify(filters.size);
    if (filters.price.length !== 0)
      urlSearchParams.price = JSON.stringify(filters.price);
    if (page > 0) {
      urlSearchParams.p = page;
    }
    url = new URLSearchParams(urlSearchParams).toString();
    if (!window.location.href.endsWith(url)) navigate("?" + url);
    else if (!window.location.href.endsWith(location.pathname) && url === "") {
      navigate(location.pathname);
    }
  }, [navigate, sortFilter, filters, page, location.pathname]);

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
                  <FilterProduct filters={filters} setFilters={setFilters} />
                  {products?.products?.length > 0 && (
                    <span>{products.products.length} mặt hàng</span>
                  )}
                </div>

                <SortProduct
                  sortFilter={sortFilter}
                  setSortFilter={setSortFilter}
                />
              </Grid>
            </Grid>
            <Grid container columnSpacing={2} rowSpacing={2}>
              {products && products.products && products.products.length === 0 && (
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
              {products &&
                products.products &&
                products.products.length !== 0 &&
                products.products.map((product) => {
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
              {products?.total_page > 1 && (
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
                      count={products.total_page}
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

export default ProductsCategoryPage;
