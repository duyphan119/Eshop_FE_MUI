import { Box, Container, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { EXAMPLE_STARS_ARRAY_REVERSE } from "../constants";
import Comments from "./Comments";
import Stars from "./Stars";
const ProductRating = ({ averageRating }) => {
  const product = useSelector((state) => state.product.current);

  const filterProductRating = (star) => {
    if (product && product.comments) {
      const array = [...product.comments].filter((item) => item.rate === star);
      return array.length;
    }
    return 0;
  };

  return (
    <Box>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ mt: 1 }}>
              Đánh giá
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize: "40px",
                  lineHeight: "40px",
                }}
              >
                {averageRating}
                <Typography>
                  {product.comments.length === 0
                    ? "Chưa có đánh giá"
                    : `${product.comments.length} lượt đánh giá`}
                </Typography>
                <Stars rate={averageRating} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <ul
                  style={{
                    listStyle: "none",
                  }}
                >
                  {EXAMPLE_STARS_ARRAY_REVERSE.map((item) => {
                    const count = filterProductRating(item);
                    return (
                      <li
                        key={Math.random() + item}
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            transform: "translateY(-1px)",
                            marginRight: "6px",
                          }}
                        >
                          {item}
                        </div>
                        <div
                          style={{
                            width: "104px",
                            height: "10px",
                            backgroundColor: "var(--main-color)",
                            position: "relative",
                            border: "2px solid var(--main-color)",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              top: "0px",
                              left: "0px",
                              height: "6px",
                              width: `${
                                100 * (count / product.comments.length)
                              }px`,
                              background: "#fff",
                            }}
                          ></div>
                        </div>
                        {count !== 0 && (
                          <div
                            style={{
                              transform: "translateY(-1px)",
                              marginLeft: "6px",
                            }}
                          >
                            {count} lượt
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Comments />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductRating;
