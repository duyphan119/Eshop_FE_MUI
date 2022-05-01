import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Product from "../components/Product";

const FavoriteListPage = () => {
  const products = useSelector((state) => state.product.favoriteList);
  useEffect(() => {
    document.title = "Danh sách yêu thích";
  }, []);
  return (
    <Box sx={{ paddingBlock: "20px" }}>
      <Container>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">DANH SÁCH YÊU THÍCH</Typography>
          </Grid>
        </Grid>
        <Grid container rowSpacing={2} columnSpacing={2}>
          {products.map((item) => {
            return (
              <Grid
                key={item.product.slug}
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
                <Product product={item.product} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default FavoriteListPage;
