import { Box, Button, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiGetProductsByGenderCategorySlug } from "../api/apiProduct";
import Product from "../components/Product";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { PRODUCTS_PER_PAGE } from "../constants";

const ProductGenderPage = ({ genderCategory }) => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState();
  const [limit, setLimit] = useState(PRODUCTS_PER_PAGE);

  useEffect(() => {
    let array = [];
    document.title = genderCategory.name;
    genderCategory.group_categories.forEach((group_category) => {
      group_category.categories.forEach((category) => {
        array.push(category);
      });
    });
    if (array?.length > 0) {
      setCategories(array);
    }
  }, [genderCategory]);

  useEffect(() => {
    const callApi = async () => {
      const data = await apiGetProductsByGenderCategorySlug(
        user,
        genderCategory.slug,
        `?limit=${limit}`,
        dispatch
      );
      if (data) {
        setProducts(data);
      }
    };
    callApi();
  }, [genderCategory, dispatch, limit, user]);

  return (
    <Box sx={{ paddingBlock: "20px" }}>
      <Container>
        <Grid container columnSpacing={2} rowSpacing={2}>
          {categories?.map((category) => {
            if (!category.icon) return "";
            return (
              <Grid
                item
                sm={3}
                sx={{
                  maxWidth: {
                    lg: "20% !important",
                  },
                  flexBasis: {
                    lg: "20% !important",
                  },
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
                key={category.slug + Math.random()}
              >
                <Box
                  sx={{
                    height: "120px",
                    textTransform: "capitalize",
                    backgroundColor: "#e3dede7a",
                  }}
                >
                  <Link
                    to={`/${category.slug}`}
                    style={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textDecoration: "none",
                      color: "#000",
                      flexDirection: "column",
                    }}
                  >
                    <img
                      src={category.icon}
                      alt=""
                      style={{
                        marginBottom: "5px",
                      }}
                    />
                    {category.name}
                  </Link>
                </Box>
              </Grid>
            );
          })}
          <Grid
            item
            xs={12}
            sx={{
              display: {
                sm: "none",
              },
            }}
          >
            <Slider
              {...{
                arrows: false,
                draggable: true,
                slidesToShow: 3,
                autoplay: true,
                autoplaySpeed: 3000,
              }}
            >
              {categories?.map((category) => {
                return (
                  <Box
                    key={category.slug + Math.random()}
                    sx={{
                      height: "120px",
                      textTransform: "capitalize",
                      backgroundColor: "#e3dede7a",
                    }}
                  >
                    <Link
                      to={`/${category.slug}`}
                      style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                        color: "#000",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        src={category.icon}
                        alt=""
                        style={{
                          marginBottom: "5px",
                        }}
                      />
                      {category.name}
                    </Link>
                  </Box>
                );
              })}
            </Slider>
          </Grid>
        </Grid>
        <Grid
          container
          columnSpacing={2}
          rowSpacing={2}
          sx={{ marginTop: "8px" }}
        >
          {products && products.items?.length !== 0 ? (
            products.items?.map((product) => (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                sx={{
                  maxWidth: {
                    lg: "20% !important",
                  },
                  flexBasis: {
                    lg: "20% !important",
                  },
                }}
                key={product.id + Math.random()}
              >
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
        </Grid>
        {products &&
        products.items &&
        products.total_page &&
        products.items?.length * products.total_page > limit ? (
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
    </Box>
  );
};

export default ProductGenderPage;
