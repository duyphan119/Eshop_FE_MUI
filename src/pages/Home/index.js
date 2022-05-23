import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BannerSlider from "../../components/BannerSlider";
import {
  ButtonLink,
  isShowCollapse,
  isShowLoadMore,
} from "../../components/Button";
import Product from "../../components/Product";
import ProductSkeleton from "../../components/Skeleton/Product";
import { configAxiosAll } from "../../config/configAxios";
import {
  API_PRODUCT_URL,
  LIMIT_BEST_SELLER,
  LIMIT_NEW_PRODUCT,
} from "../../constants";

const Home = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [bestSellerProduct, setBestSellerProduct] = useState();
  const [newestProduct, setNewestProduct] = useState();

  const [limit, setLimit] = useState(LIMIT_NEW_PRODUCT);

  useEffect(() => {
    document.title = "Trang chủ";
  }, []);

  useEffect(() => {
    (async function () {
      const promiseBestSellerProduct = new Promise((resolve, reject) => {
        resolve(
          configAxiosAll(user, dispatch).get(
            `${API_PRODUCT_URL}?type=best-seller&limit=${LIMIT_BEST_SELLER}`
          )
        );
      });
      const promiseNew = new Promise((resolve, reject) => {
        resolve(
          configAxiosAll(user, dispatch).get(
            `${API_PRODUCT_URL}?include=true&limit=${LIMIT_NEW_PRODUCT}`
          )
        );
      });
      Promise.allSettled([promiseNew, promiseBestSellerProduct]).then(
        (values) => {
          setNewestProduct(values[0].value);
          setBestSellerProduct(values[1].value);
        }
      );
    })();
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
              textAlign: "center",
              marginBlock: "5px",
            }}
          >
            <Typography
              variant="h6"
              textTransform="uppercase"
              color="var(--main-color)"
            >
              Mới nhất
            </Typography>
          </Grid>
        </Grid>
        <Grid container columnSpacing={2} rowSpacing={2}>
          {newestProduct?.items?.length === 0 && (
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
          {newestProduct?.items?.length > 0
            ? newestProduct?.items?.map((product) => {
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
            : new Array(LIMIT_NEW_PRODUCT).fill(1).map((item, index) => (
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
                  key={index}
                >
                  <ProductSkeleton />
                </Grid>
              ))}
        </Grid>
        <Box sx={{ textAlign: "center" }} my={1}>
          {isShowLoadMore(newestProduct, LIMIT_NEW_PRODUCT, () =>
            setLimit(limit + LIMIT_NEW_PRODUCT)
          )}
          {isShowCollapse(newestProduct, LIMIT_NEW_PRODUCT, () =>
            setLimit(LIMIT_NEW_PRODUCT)
          )}
        </Box>
        <Grid container columnSpacing={2} rowSpacing={2}>
          <Grid
            item
            md={12}
            sx={{
              textAlign: "center",
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
          {bestSellerProduct?.items?.length === 0 && (
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
          {bestSellerProduct?.items?.length > 0
            ? bestSellerProduct?.items?.map((product) => {
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
            : new Array(LIMIT_BEST_SELLER).fill(1).map((item, index) => (
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
                  key={index}
                >
                  <ProductSkeleton />
                </Grid>
              ))}
        </Grid>
        <Box sx={{ textAlign: "center" }} my={1}>
          <ButtonLink link={`/`} label="Xem thêm" />
        </Box>
      </Container>
    </>
  );
};

export default Home;
