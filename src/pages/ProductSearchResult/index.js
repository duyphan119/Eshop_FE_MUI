import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { isShowCollapse, isShowLoadMore } from "../../components/Button";
import { API_PRODUCT_URL, LIMIT_PRODUCT_SEARCH_RESULT } from "../../constants";
import { configAxiosAll } from "../../config/configAxios";
import Product from "../../components/Product";

const ProductSearchResult = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [queryParams] = useSearchParams();
  const q = queryParams.get("q");

  const [product, setProduct] = useState([]);
  const [limit, setLimit] = useState(LIMIT_PRODUCT_SEARCH_RESULT);

  useEffect(() => {
    document.title = `Kết quả tìm kiếm từ khoá ${q}`;
  }, [q]);

  useEffect(() => {
    (async function () {
      const data = await configAxiosAll(user, dispatch).get(
        `${API_PRODUCT_URL}/search?include=true&q=${q}&limit=${limit}`
      );
      setProduct(data);
    })();
  }, [q, limit, user, dispatch]);

  return (
    <Box sx={{ paddingBlock: "20px" }}>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ marginBottom: "10px" }}>
              {product?.total_result} KẾT QUẢ VỚI TỪ KHOÁ "{q}"
            </Typography>
          </Grid>
        </Grid>
        <Grid container columnSpacing={2}>
          {product && product.items && product.items.length === 0 && (
            <Grid item xs={12}>
              <div className="no-result">Không tìm thấy kết quả</div>
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
                    marginBlock: "5px",
                  }}
                >
                  <Product product={product} />
                </Grid>
              );
            })}
        </Grid>
        <Box textAlign="center" my={1}>
          {isShowLoadMore(product, LIMIT_PRODUCT_SEARCH_RESULT, () =>
            setLimit(limit + LIMIT_PRODUCT_SEARCH_RESULT)
          )}
          {isShowCollapse(product, LIMIT_PRODUCT_SEARCH_RESULT, () =>
            setLimit(LIMIT_PRODUCT_SEARCH_RESULT)
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default ProductSearchResult;
