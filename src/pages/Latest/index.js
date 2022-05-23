import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Product from "../../components/Product";
import { LIMIT_LATEST } from "../../constants";

const Latest = () => {
  const latest = useSelector((state) => state.product.latest);

  const [limit, setLimit] = useState(LIMIT_LATEST);

  useEffect(() => {
    document.title = "Đã xem gần đây";
  }, []);

  if (!latest) return "";

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
        borderBottom="1px solid black"
      >
        <Typography color="var(--main-color)">Đã xem gần đây</Typography>
        <Typography>{latest.length} sản phẩm</Typography>
      </Box>
      <Box py={1} px={2}>
        <Grid container columnSpacing={2} sx={{ marginTop: "8px" }}>
          {latest.length !== 0 ? (
            [...latest].splice(0, limit).map((product, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Product product={product} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <div className="no-result">
                Không có sản phẩm trong danh mục này
              </div>
            </Grid>
          )}
          {latest.length > LIMIT_LATEST && (
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                onClick={() => {
                  if (latest.length <= limit) {
                    setLimit(LIMIT_LATEST);
                  } else {
                    setLimit(limit + LIMIT_LATEST);
                  }
                }}
              >
                {limit >= latest.length ? "Thu gọn" : "Xem thêm"}
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Latest;
