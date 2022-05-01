import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { apiSearch } from "../api/apiProduct";
import { PRODUCTS_PER_PAGE } from "../constants";

const ProductSearchPage = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [queryParams] = useSearchParams();
  const q = queryParams.get("q");

  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(PRODUCTS_PER_PAGE);

  useEffect(() => {
    document.title = `Kết quả tìm kiếm từ khoá ${q}`;
  }, [q]);

  useEffect(() => {
    const callApi = async () => {
      const data = await apiSearch(user, `?limit=${limit}&q=${q}`, dispatch);
      setProducts(data);
    };
    callApi();
  }, [q, limit, user, dispatch]);

  return (
    <Box sx={{ paddingBlock: "20px" }}>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ marginBottom: "10px" }}>
              KẾT QUẢ TÌM KIẾM TỪ KHOÁ "{q}"
            </Typography>
          </Grid>
        </Grid>
        <Grid container columnSpacing={2}>
          {products && products.products && products.products.length === 0 && (
            <Grid item xs={12}>
              <div className="no-result">Không tìm thấy kết quả</div>
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
                    marginBlock: "5px",
                  }}
                >
                  <Product product={product} />
                </Grid>
              );
            })}
        </Grid>
        {products &&
        products.products &&
        products.total_page &&
        products.products.length * products.total_page !== PRODUCTS_PER_PAGE ? (
          <Grid
            container
            columnSpacing={2}
            rowSpacing={2}
            sx={{ marginTop: "8px" }}
          >
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {products?.total_page !== 1 ? (
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setLimit(limit + PRODUCTS_PER_PAGE)}
                >
                  Xem thêm
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setLimit(PRODUCTS_PER_PAGE)}
                >
                  Thu gọn
                </Button>
              )}
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
      </Container>
    </Box>
  );
};

export default ProductSearchPage;
