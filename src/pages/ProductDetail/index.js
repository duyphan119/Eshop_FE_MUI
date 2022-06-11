import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StraightenIcon from "@mui/icons-material/Straighten";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  Button,
  Container,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {
  API_CART_ITEM_URL,
  API_PRODUCT_URL,
  API_PRODUCT_USER_URL,
  LIMIT_RECOMMEND_PRODUCT,
  PRODUCTS_SLIDER_VERTICAL,
} from "../../constants";
import { configAxiosAll } from "../../config/configAxios";
import { showToastMessage } from "../../redux/toastSlice";
import { addToCart } from "../../redux/cartSlice";
import "./ProductDetail.css";
import Breadcrumbs from "../../components/Breadcrumbs";
import { formatThousandDigits } from "../../utils";
import { addToLatest } from "../../redux/productSlice";
import ProductDetailSlider from "../../components/ProductDetailSlider";
import Comments from "../../components/Comments";
import { SocketContext } from "../../context";
import Product from "../../components/Product";
import ProductSkeleton from "../../components/Skeleton/Product";
import Stars from "../../components/Stars";
import { addToWishlist, removeWishlistItem } from "../../redux/wishlistSlice";
import ModalSizeGuide from "./ModalSizeGuide";
import SizeGuide from "./SizeGuide";
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
const ProductDetail = ({ query }) => {
  const socket = useContext(SocketContext);

  const user = useSelector((state) => state.auth.currentUser);
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const dispatch = useDispatch();

  const [product, setProduct] = useState();
  const [recommendedProduct, setRecommendedProduct] = useState();
  const [indexColor, setIndexColor] = useState(0);
  const [indexImage, setIndexImage] = useState(0);
  const [indexSize, setIndexSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [msgQuantity, setMsgQuantity] = useState("");
  const [productUser, setProductUser] = useState();
  const [openModalSizeGuide, setOpenModalSizeGuide] = useState(false);
  const [openSizeGuide, setOpenSizeGuide] = useState(false);

  const params = useParams();
  const { product_slug } = params;

  const hasDiscount =
    product && product.discounts && product.discounts.length > 0;

  useEffect(() => {
    if (product) {
      socket.emit("join-room", product.slug);
    }
  }, [socket, product]);

  useEffect(() => {
    (async function () {
      const data = await configAxiosAll(user, dispatch).get(query);
      document.title = data.name;
      setProduct(data);
      dispatch(addToLatest(data));
      setIndexSize(data.colors[0].sizes.findIndex((item) => item.amount > 0));
      const data2 = await configAxiosAll(user, dispatch).get(
        `${API_PRODUCT_URL}/category/${data.category.slug}?exceptId=${data.id}&limit=${LIMIT_RECOMMEND_PRODUCT}`
      );
      setRecommendedProduct(data2);
    })();
  }, [dispatch, product_slug, user, query]);

  useEffect(() => {
    if (product) {
      setProductUser(
        wishlist.findIndex((item) => item.id === product.id) !== -1
      );
    }
  }, [product, wishlist]);

  const handleChangeQuantity = (value) => {
    try {
      let newQuantity = parseInt(value);
      if (isNaN(newQuantity)) {
        newQuantity = 1;
      } else {
        if (newQuantity === 0) {
          newQuantity = 1;
        } else if (
          newQuantity > product.colors[indexColor].sizes[indexSize].amount
        ) {
          setMsgQuantity(
            `Mặt hàng này chỉ còn ${product.colors[indexColor].sizes[indexSize].amount}`
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
  async function handleAddToFavoriteList() {
    if (user) {
      try {
        if (!productUser) {
          await configAxiosAll(user, dispatch).post(`${API_PRODUCT_USER_URL}`, {
            product_id: product.id,
            user_id: user.id,
          });
          dispatch(addToWishlist(product));
          dispatch(
            showToastMessage({
              type: "success",
              text: "Đã thêm vào danh sách yêu thích",
              isOpen: true,
            })
          );
        } else {
          await configAxiosAll(user, dispatch).delete(
            `${API_PRODUCT_USER_URL}/product/${product.id}`
          );
          dispatch(removeWishlistItem(product.id));
          dispatch(
            showToastMessage({
              type: "success",
              text: "Đã xoá khỏi danh sách yêu thích",
              isOpen: true,
            })
          );
        }
        setProductUser(!productUser);
      } catch (error) {
        console.log(error);
      }
    }
  }
  if (!product) return "";

  return (
    <Box sx={{ minHeight: "100%", paddingBlock: "20px" }}>
      <Container
        sx={{
          paddingInline: {
            lg: "100px !important",
            xs: "24px !important",
          },
        }}
      >
        <Box sx={{ mb: 1 }}>
          <Breadcrumbs
            items={[
              {
                to: "/",
                text: "Trang chủ",
              },
              {
                to: `/${product.category.group_category.gender.slug}`,
                text: product.category.group_category.gender.name,
              },
              {
                to: `/${product.category.group_category.slug}`,
                text: product.category.group_category.name,
              },
              {
                to: `/${product.category.slug}`,
                text: product.category.name,
              },
            ]}
            text={product.name}
          />
        </Box>
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
          {/* Slider hình ảnh khi ở mobile và tablet */}
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
            <ProductDetailSlider images={product.colors[indexColor].images} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <div className="product-name">
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                }}
              >
                {product.name}
              </Typography>
              <div
                className="add-to-favorite"
                onClick={handleAddToFavoriteList}
              >
                {productUser ? (
                  <Tooltip title="Huỷ bỏ yêu thích">
                    <FavoriteIcon
                      sx={{ fontSize: 20, color: "var(--error-color)" }}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Yêu thích">
                    <FavoriteBorderOutlinedIcon sx={{ fontSize: 20 }} />
                  </Tooltip>
                )}
              </div>
            </div>
            <div className="product-rate">
              <Stars
                rate={
                  product.rate.total_rate && product.rate.count > 0
                    ? product.rate.total_rate / product.rate.count
                    : 0
                }
              />
              <div className="">
                &nbsp;(
                {product.rate.count === 0 ? "Chưa có" : product.rate.count}
                &nbsp;đánh giá)
              </div>
            </div>
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
                  {formatThousandDigits(
                    product.discounts[product.discounts.length - 1].new_price
                  )}
                  đ
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
            {product.colors[indexColor].sizes[indexSize].code !== "0" && (
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1">
                  Kích cỡ: {product.colors[indexColor].sizes[indexSize].value}
                </Typography>
                {product.category.guides.length > 0 && (
                  <>
                    <div
                      onClick={() => setOpenSizeGuide(!openSizeGuide)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                    >
                      <StraightenIcon sx={{ color: "var(--main-color)" }} />
                      Hướng dẫn chọn size
                      <KeyboardArrowDownIcon />
                    </div>
                    <Typography
                      variant="body1"
                      sx={{
                        textDecoration: "underline",
                        color: "var(--main-color)",
                        cursor: "pointer",
                      }}
                      onClick={() => setOpenModalSizeGuide(true)}
                    >
                      Bảng chọn size
                    </Typography>
                  </>
                )}
              </Box>
            )}
            {openSizeGuide && (
              <SizeGuide
                handleClose={() => setOpenSizeGuide(false)}
                guides={product.category.guides}
              />
            )}

            <Box
              style={{
                display: "flex",
              }}
            >
              {product.colors[indexColor].sizes.map((item, index) => {
                if (item.code === "0") return "";
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
                variant="contained"
                sx={{
                  flex: "1",
                  marginRight: {
                    xs: "0",
                    lg: "2px",
                  },
                  backgroundColor: "#fff !important",
                  color: "var(--main-color)",
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
        <Box mb={2}>{product && <Comments product={product} />}</Box>
        {recommendedProduct && recommendedProduct.items.length === 0 ? (
          <></>
        ) : (
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
        )}

        <Grid container spacing={2}>
          {recommendedProduct
            ? recommendedProduct.items.length > 0 &&
              recommendedProduct.items.map((product) => {
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
      {openModalSizeGuide && (
        <ModalSizeGuide
          handleClose={() => setOpenModalSizeGuide(false)}
          open={openModalSizeGuide}
          category={product.category}
        />
      )}
    </Box>
  );
};

export default ProductDetail;
