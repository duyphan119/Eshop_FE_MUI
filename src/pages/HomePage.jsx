import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiGetAllProducts } from "../api/apiProduct";
import BannerSlider from "../components/BannerSlider";
import Product from "../components/Product";
import ProductSkeleton from "../components/ProductSkeleton";
import { PRODUCTS_PER_PAGE } from "../constants";

const HomePage = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(PRODUCTS_PER_PAGE);

  useEffect(() => {
    document.title = "Trang chủ";
  }, []);

  console.log(products?.total_page);
  useEffect(() => {
    const callApi = async () => {
      const data = await apiGetAllProducts(user, `?type=best-seller`, dispatch);
      setProducts(data);
    };
    callApi();
  }, [user, dispatch]);
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
            <Typography
              variant="h6"
              textTransform="uppercase"
              color="var(--main-color)"
            >
              Bán chạy nhất
            </Typography>
          </Grid>
        </Grid>
        <Grid container columnSpacing={2} rowSpacing={2}>
          {products?.items?.length === 0 && (
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
          {products?.items?.length > 0 ? (
            products?.items?.map((product) => {
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
        products.items &&
        products.total_page &&
        products.items.length * products.total_page > limit ? (
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
