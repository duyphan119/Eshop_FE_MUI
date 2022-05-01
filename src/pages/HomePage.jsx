import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  apiGetProductsByGenderCategorySlug,
  apiGetProductsByStatistics,
} from "../api/apiProduct";
import BannerSlider from "../components/BannerSlider";
import Product from "../components/Product";
import ProductSkeleton from "../components/ProductSkeleton";
import { PRODUCTS_PER_PAGE } from "../constants";

const HomePage = () => {
  const genderCategories = useSelector((state) => state.genderCategory.list);
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [indexCategory, setIndexCategory] = useState(0);
  const [oneCallApi, setOneCallApi] = useState(false);
  const [limit, setLimit] = useState(PRODUCTS_PER_PAGE);

  useEffect(() => {
    document.title = "Trang chủ";
  }, []);

  console.log(products?.total_page);
  useEffect(() => {
    if (!oneCallApi) {
      const callApi = async () => {
        const data = await apiGetProductsByStatistics(
          user,
          `?type=best-seller`,
          dispatch
        );
        setProducts(data);
        setOneCallApi(true);
      };
      callApi();
    }
  }, [user, oneCallApi, dispatch]);

  useEffect(() => {
    const callApi = async () => {
      let data;
      if (oneCallApi) {
        if (indexCategory === 0) {
          data = await apiGetProductsByStatistics(
            user,
            `?type=best-seller&limit=${limit}`,
            dispatch
          );
          setProducts(data);
        } else {
          data = await apiGetProductsByGenderCategorySlug(
            user,
            genderCategories[indexCategory - 1].slug,
            `?limit=${limit}`,
            dispatch
          );
          console.log(data.products[0].name);
          setProducts(data);
        }
      }
    };
    callApi();
  }, [dispatch, genderCategories, indexCategory, limit, oneCallApi, user]);
  return (
    <>
      <Box
        sx={{
          display: {
            sm: "block",
            xs: "none",
          },
        }}
      >
        <BannerSlider />
      </Box>
      <Container>
        <Grid container columnSpacing={2} rowSpacing={2}>
          <Grid
            item
            md={12}
            sx={{
              display: {
                md: "flex",
                xs: "none",
              },
              justifyContent: "center",
              marginBlock: "5px",
            }}
          >
            <Button
              variant={`${indexCategory === 0 ? "contained" : "outlined"}`}
              sx={{
                marginInline: "2px",
              }}
              onClick={() => setIndexCategory(0)}
            >
              Bán chạy nhất
            </Button>
            {genderCategories.map((genderCategory, index) => {
              return (
                <Button
                  key={genderCategory.slug}
                  variant={`${
                    indexCategory === index + 1 ? "contained" : "outlined"
                  }`}
                  sx={{
                    marginInline: "2px",
                  }}
                  onClick={() => {
                    setIndexCategory(index + 1);
                    setLimit(PRODUCTS_PER_PAGE);
                  }}
                >
                  {genderCategory.full_name}
                </Button>
              );
            })}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: {
                md: "none",
                xs: "flex",
              },
              justifyContent: "center",
              marginBlock: "5px",
            }}
          >
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                value={indexCategory}
                onChange={(e) => setIndexCategory(e.target.value)}
              >
                <MenuItem value={0}>Bán chạy nhất</MenuItem>
                {genderCategories.map((genderCategory, index) => {
                  return (
                    <MenuItem value={index + 1} key={index + 1}>
                      {genderCategory.full_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container columnSpacing={2} rowSpacing={2}>
          {oneCallApi && products?.products?.length === 0 && (
            <Grid
              item
              xs={12}
              sx={{
                marginBottom: "8px",
              }}
            >
              <div className="no-result">
                Không có sản phẩm trong danh mục này
              </div>
            </Grid>
          )}
          {products?.products?.length > 0 ? (
            products?.products?.map((product) => {
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
                    marginBlock: "5px",
                  }}
                >
                  <Product product={product} />
                </Grid>
              );
            })
          ) : (
            <Grid
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
                marginBlock: "5px",
              }}
            >
              <ProductSkeleton />
            </Grid>
          )}
        </Grid>
        {products &&
        products.products &&
        products.total_page &&
        products.products.length * products.total_page > limit ? (
          <Grid
            container
            columnSpacing={2}
            rowSpacing={2}
            sx={{ marginBlock: "8px" }}
          >
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => setLimit(limit + PRODUCTS_PER_PAGE)}
              >
                Xem thêm
              </Button>
            </Grid>
          </Grid>
        ) : (
          limit !== PRODUCTS_PER_PAGE && (
            <Grid
              container
              columnSpacing={2}
              rowSpacing={2}
              sx={{ marginBlock: "8px" }}
            >
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setLimit(PRODUCTS_PER_PAGE)}
                >
                  Thu gọn
                </Button>
              </Grid>
            </Grid>
          )
        )}
      </Container>
    </>
  );
};

export default HomePage;
