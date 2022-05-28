import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {
  API_CART_ITEM_URL,
  API_PRODUCT_URL,
  LIMIT_RECOMMEND_PRODUCT,
  PRODUCTS_SLIDER_VERTICAL,
} from "../../constants";
import { configAxiosAll } from "../../config/configAxios";
import { showToastMessage } from "../../redux/toastSlice";
import { addToCart } from "../../redux/cartSlice";
import "./ProductDetail.css";
import { formatThousandDigits } from "../../utils";
import { addToLatest } from "../../redux/productSlice";
import ProductDetailSlider from "../../components/ProductDetailSlider";
import Comments from "../../components/Comments";
import { SocketContext } from "../../context";
import Product from "../../components/Product";
import ProductSkeleton from "../../components/Skeleton/Product";
const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className={
      "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
    }
    aria-hidden="true"
    aria-disabled={currentSlide === 0 ? true : false}
    type="button"
  >
    <KeyboardArrowUpOutlinedIcon />
  </button>
);
const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className={
      "slick-next slick-arrow" +
      (currentSlide === slideCount - 1 ? " slick-disabled" : "")
    }
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - 1 ? true : false}
    type="button"
  >
    <KeyboardArrowDownOutlinedIcon />
  </button>
);
const ProductDetail = () => {
  const socket = useContext(SocketContext);

  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [product, setProduct] = useState();
  const [recommendedProduct, setRecommendedProduct] = useState();
  const [indexColor, setIndexColor] = useState(0);
  const [indexImage, setIndexImage] = useState(0);
  const [indexSize, setIndexSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [msgQuantity, setMsgQuantity] = useState("");

  const params = useParams();
  const { product_slug } = params;

  const hasDiscount =
    product && product.discounts && product.discounts.length > 0;
  console.log(product);

  useEffect(() => {
    if (product) {
      socket.emit("join-room", product.slug);
    }
  }, [socket, product]);

  useEffect(() => {
    (async function () {
      const data = await configAxiosAll(user, dispatch).get(
        `${API_PRODUCT_URL}/slug/${product_slug}`
      );
      document.title = data.name;
      setProduct(data);
      dispatch(addToLatest(data));
      setIndexSize(data.colors[0].sizes.findIndex((item) => item.amount > 0));
      const data2 = await configAxiosAll(user, dispatch).get(
        `${API_PRODUCT_URL}/category/${data.category.slug}?exceptId=${data.id}&limit=${LIMIT_RECOMMEND_PRODUCT}`
      );
      setRecommendedProduct(data2);
    })();
  }, [dispatch, product_slug, user]);

  const handleChangeQuantity = (value) => {
    try {
      let newQuantity = parseInt(value);
      if (isNaN(newQuantity)) {
        newQuantity = 1;
      } else {
        if (newQuantity === 0) {
          newQuantity = 1;
        } else if (
          newQuantity >
          product.product_colors[indexColor].product_color_sizes[indexSize]
            .amount
        ) {
          setMsgQuantity(
            `Mặt hàng này chỉ còn ${product.product_colors[indexColor].product_color_sizes[indexSize].amount}`
          );
        } else {
          setMsgQuantity("");
        }
      }
      setQuantity(newQuantity);
    } catch (error) {
      setQuantity(1);
    }
  };

  async function handleAddToCart() {
    if (quantity > product.colors[indexColor].sizes[indexSize].amount) {
      dispatch(
        showToastMessage({
          text: "Số lượng không hợp lệ",
          type: "info",
          isOpen: true,
        })
      );
    } else {
      try {
        const data = await configAxiosAll(user, dispatch).post(
          `${API_CART_ITEM_URL}`,
          {
            product_detail_id:
              product.colors[indexColor].sizes[indexSize].detail_id,
            quantity,
            cart_id: user.cart.id,
          }
        );
        dispatch(addToCart(data));
        dispatch(
          showToastMessage({
            type: "success",
            text: "Thêm thành công",
            isOpen: true,
          })
        );
      } catch (error) {}
    }
  }

  // const calculateAverageRating = () => {
  //   let result = 0;
  //   if (product && product.comments) {
  //     product.comments.forEach((comment) => {
  //       result += comment.rate;
  //     });
  //     result /= product.comments.length;
  //   }
  //   return result;
  // };

  // const averageRating = calculateAverageRating();
  if (!product) return "";

  return (
    <Box sx={{ minHeight: "100%", paddingBlock: "20px" }}>
      <Container sx={{ paddingInline: "120px !important" }}>
        <Grid container columnSpacing={3}>
          <Grid
            item
            lg={6}
            sx={{
              display: {
                xs: "none",
                lg: "flex",
              },
            }}
          >
            <Grid container columnSpacing={1}>
              <Grid
                item
                xs={2}
                sx={{
                  overflow: "hidden",
                  height: "520px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Slider
                  {...{
                    dot: true,
                    vertical: true,
                    arrows:
                      product?.colors[indexColor].images.length >
                      PRODUCTS_SLIDER_VERTICAL
                        ? true
                        : false,
                    slidesToShow:
                      product?.colors[indexColor].images.length >
                      PRODUCTS_SLIDER_VERTICAL
                        ? PRODUCTS_SLIDER_VERTICAL
                        : product?.colors[indexColor].images.length,
                    verticalSwiping: true,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    className: "slick-vertical-slider",
                    prevArrow: <SlickArrowLeft />,
                    nextArrow: <SlickArrowRight />,
                  }}
                >
                  {product?.colors[indexColor].images.map((item, index) => {
                    return (
                      <img
                        key={index}
                        src={item.url}
                        alt={""}
                        height={88}
                        onClick={() =>
                          setIndexImage(
                            product?.colors[indexColor].images.findIndex(
                              (el) => el.url === item.url
                            )
                          )
                        }
                      />
                    );
                  })}
                </Slider>
              </Grid>
              <Grid
                item
                lg={10}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img
                  src={product?.colors[indexColor]?.images[indexImage]?.url}
                  alt={product.name}
                  height="520"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              paddingBlock: "20px",
              display: {
                lg: "none",
              },
            }}
          >
            <ProductDetailSlider images={product?.colors[indexColor].images} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "600",
              }}
            >
              {product.name}
            </Typography>
            {/* <Box display="flex" alignItems="center">
            <Stars rate={averageRating} />
            <Typography>
              {product.comments.length === 0
                ? "Chưa có đánh giá"
                : `${product.comments.length} lượt đánh giá`}
            </Typography>
          </Box> */}
            <Typography variant="body1">
              {hasDiscount && (
                <span style={{ color: "var(--main-color)" }}>
                  {formatThousandDigits(product.discounts[0].new_price)}đ
                </span>
              )}
              <span
                style={
                  hasDiscount
                    ? {
                        textDecoration: "line-through",
                        marginLeft: "4px",
                        color: "gray",
                      }
                    : {}
                }
              >
                {formatThousandDigits(product.price)}đ
              </span>
            </Typography>
            <Typography variant="body1">
              SKU: {product?.colors[indexColor].sizes[indexSize].sku}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Màu sắc: {product?.colors[indexColor].value}
            </Typography>
            <div
              style={{
                display: "flex",
              }}
            >
              {product.colors.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      backgroundImage: `url("${item.images[0].url}")`,
                      width: "60px",
                      height: "60px",
                      cursor: "pointer",
                      border: `2px solid  ${
                        index === indexColor
                          ? "var(--main-color)"
                          : "transparent"
                      } `,
                      marginRight: "4px",
                      backgroundClip: "content-box",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      padding: "3px",
                      borderRadius: "50%",
                    }}
                    onClick={() => {
                      setIndexImage(0);
                      setIndexSize(
                        product.colors[index].sizes.findIndex(
                          (item) => item.amount > 0
                        )
                      );
                      setIndexColor(index);
                    }}
                  ></div>
                );
              })}
            </div>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Kích cỡ: {product.colors[indexColor].sizes[indexSize].value}
            </Typography>
            <Box
              style={{
                display: "flex",
              }}
            >
              {product.colors[indexColor].sizes.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    style={{
                      width: "40px",
                      height: "40px",
                      cursor: item.amount === 0 ? "default" : "pointer",
                      border: `1px solid ${
                        index === indexSize ? "var(--main-color)" : "#000"
                      }`,
                      userSelect: "none",
                      marginRight: "4px",
                      padding: "3px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: ` ${
                        index === indexSize
                          ? "var(--main-color)"
                          : "transparent"
                      }`,
                      position: "relative",
                    }}
                    onClick={() => {
                      if (item.amount > 0) {
                        setIndexSize(index);
                      }
                    }}
                    className={`${item.amount === 0 ? "size-stuck" : ""}`}
                  >
                    {item.value}
                  </div>
                );
              })}
            </Box>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Box className="product-quantity-wrapper">
                <button onClick={() => handleChangeQuantity(quantity - 1)}>
                  <RemoveOutlinedIcon />
                </button>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => handleChangeQuantity(e.target.value)}
                />
                <button onClick={() => handleChangeQuantity(quantity + 1)}>
                  <AddOutlinedIcon />
                </button>
              </Box>
            </Box>
            {msgQuantity !== "" && (
              <Typography variant="body2">{msgQuantity}</Typography>
            )}
            <Box
              sx={{
                display: "flex",
                marginTop: "10px",
                position: {
                  xs: "fixed",
                  lg: "unset",
                },
                width: "100%",
                bottom: "0",
                left: "0",
                justifyContent: "space-between",
                zIndex: 999,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  flex: "1",
                  marginRight: {
                    xs: "0",
                    lg: "2px",
                  },
                  backgroundColor: "#fff",
                  paddingBlock: "8px",
                }}
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </Button>
              <Button
                variant="contained"
                sx={{
                  flex: "1",
                  marginLeft: {
                    xs: "0",
                    lg: "2px",
                  },
                  paddingBlock: "8px",
                }}
              >
                Mua ngay
              </Button>
            </Box>
            <Box>
              <h3>Đặc điểm sản phẩm</h3>
              <div
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div>
            </Box>
          </Grid>
        </Grid>
        {product && <Comments product={product} />}
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
              Có thể bạn muốn mua
            </Typography>
          </Grid>
        </Grid>
        <Grid container columnSpacing={2} rowSpacing={2}>
          {recommendedProduct?.items?.length === 0 && (
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
          {recommendedProduct?.items?.length > 0
            ? recommendedProduct?.items?.map((product) => {
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
            : new Array(LIMIT_RECOMMEND_PRODUCT).fill(1).map((item, index) => (
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
      </Container>
    </Box>
  );
};

export default ProductDetail;