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
import { Link, useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import BannerSlider from "../../components/BannerSlider";
import { ButtonLink } from "../../components/Button";
import Product from "../../components/Product";
import BannerSkeleton from "../../components/Skeleton/Banner";
import CategoryIconSkeleton from "../../components/Skeleton/CategoryIcon";
import ProductSkeleton from "../../components/Skeleton/Product";
import { TitleCenter } from "../../components/Title";
import { configAxiosAll, configAxiosResponse } from "../../config/configAxios";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import {
  API_BANNER_URL,
  API_PRODUCT_URL,
  PRODUCTS_PER_PAGE,
} from "../../constants";
import "./ProductGender.css";

const ProductGender = ({ genderCategory }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [categories, setCategories] = useState();
  const [product, setProduct] = useState();
  const [banners, setBanners] = useState();
  const [queryString, setQueryString] = useState(
    `${API_PRODUCT_URL}/gender/${genderCategory.slug}?type=best-seller&limit=${PRODUCTS_PER_PAGE}`
  );
  const [valueSelect, setValueSelect] = useState(
    `${API_PRODUCT_URL}/gender/${genderCategory.slug}?type=best-seller&limit=${PRODUCTS_PER_PAGE}`
  );

  const [index, setIndex] = useState(0);

  const location = useLocation();

  useEffect(() => {
    setQueryString(valueSelect);
    setProduct(null);
  }, [valueSelect]);

  useEffect(() => {
    let array = [];
    document.title = `Thời trang ${genderCategory.name.toLowerCase()}`;
    genderCategory.group_categories.forEach((group_category) => {
      group_category.categories.forEach((category) => {
        array.push(category);
      });
    });
    setQueryString(
      `${API_PRODUCT_URL}/gender/${genderCategory.slug}?type=best-seller&limit=${PRODUCTS_PER_PAGE}`
    );
    if (array.length > 0) {
      setCategories(array);
    } else {
      setCategories([]);
    }
  }, [genderCategory]);

  useEffect(() => {
    (async function () {
      try {
        const data = await configAxiosResponse().get(
          `${API_BANNER_URL}?page=${location.pathname}&position=under-header&isShow=true`
        );
        setBanners(data);
      } catch (error) {
        setBanners([]);
      }
    })();
  }, [location.pathname]);

  useEffect(() => {
    (async function () {
      try {
        const data = await configAxiosAll(user, dispatch).get(queryString);
        setProduct(data);
      } catch (error) {}
    })();
  }, [dispatch, queryString, user]);
  console.log(genderCategory);
  function handleClick(i, q) {
    setIndex(i);
    setQueryString(q);
    setProduct(null);
  }

  return (
    <>
      <Box>
        {banners ? <BannerSlider banners={banners} /> : <BannerSkeleton />}
      </Box>
      <Box>
        <Container>
          <TitleCenter>Mua theo thể loại</TitleCenter>
          <Grid container spacing={2}>
            {categories
              ? categories.map((category) => {
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
                          className="category-icon-link"
                        >
                          <img src={category.icon} alt="" />
                          {category.name}
                        </Link>
                      </Box>
                    </Grid>
                  );
                })
              : new Array(5).fill(1).map((item, index) => (
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
                    key={index}
                  >
                    <CategoryIconSkeleton />
                  </Grid>
                ))}
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
                        className="category-icon-link"
                      >
                        <img src={category.icon} alt="" />
                        {category.name}
                      </Link>
                    </Box>
                  );
                })}
              </Slider>
            </Grid>
          </Grid>
          <TitleCenter>Đề xuất cho bạn</TitleCenter>
          <Box
            className="category-list"
            mb={2}
            sx={{
              display: matches ? "flex" : "none",
            }}
          >
            <Button
              variant={index === 0 ? "contained" : "outlined"}
              onClick={() =>
                handleClick(
                  0,
                  `${API_PRODUCT_URL}/gender/${genderCategory.slug}?type=best-seller&limit=${PRODUCTS_PER_PAGE}`
                )
              }
            >
              Bán chạy nhất
            </Button>
            <Button
              variant={index === 1 ? "contained" : "outlined"}
              sx={{ ml: 1 }}
              onClick={() =>
                handleClick(
                  1,
                  `${API_PRODUCT_URL}/gender/${genderCategory.slug}?limit=${PRODUCTS_PER_PAGE}`
                )
              }
            >
              Mới nhất
            </Button>
            {genderCategory.group_categories.map((item, i) => (
              <Button
                variant={index === i + 2 ? "contained" : "outlined"}
                sx={{ ml: 1 }}
                key={i}
                onClick={() =>
                  handleClick(
                    i + 2,
                    `${API_PRODUCT_URL}/group-category/${item.slug}?limit=${PRODUCTS_PER_PAGE}`
                  )
                }
              >
                {
                  item.name
                    .toLowerCase()
                    .split(genderCategory.name.toLowerCase())[0]
                }
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              display: matches ? "none" : "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <FormControl size="small">
              <Select
                value={valueSelect}
                onChange={(e) => setValueSelect(e.target.value)}
              >
                <MenuItem
                  value={`${API_PRODUCT_URL}/gender/${genderCategory.slug}?type=best-seller&limit=${PRODUCTS_PER_PAGE}`}
                >
                  BÁN CHẠY NHẤT
                </MenuItem>
                <MenuItem
                  value={`${API_PRODUCT_URL}/gender/${genderCategory.slug}?limit=${PRODUCTS_PER_PAGE}`}
                >
                  MỚI NHẤT\that-lung-nam
                </MenuItem>
                {genderCategory.group_categories.map((item, i) => (
                  <MenuItem
                    key={i}
                    value={`${API_PRODUCT_URL}/group-category/${item.slug}?limit=${PRODUCTS_PER_PAGE}`}
                  >
                    {
                      item.name
                        .toUpperCase()
                        .split(genderCategory.name.toUpperCase())[0]
                    }
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Grid container spacing={2}>
            {product ? (
              product.items.length !== 0 ? (
                product.items?.map((product) => (
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
              )
            ) : (
              new Array(PRODUCTS_PER_PAGE).fill(1).map((item, i) => (
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
                  key={i}
                >
                  <ProductSkeleton />
                </Grid>
              ))
            )}
          </Grid>
          <Box textAlign="center" my={1}>
            <ButtonLink
              label="Xem thêm"
              link={`/thoi-trang-${genderCategory.slug}`}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProductGender;
