import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StraightenIcon from "@mui/icons-material/Straighten";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  Button,
  Container,
  Grid,
  Tab,
  Tabs,
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
import { showToast } from "../../redux/toastSlice";
import { addToCart } from "../../redux/cartSlice";
import "./ProductDetail.css";
import Breadcrumbs from "../../components/Breadcrumbs";
import { formatThousandDigits } from "../../utils";
import { addToLatest } from "../../redux/productSlice";
import ProductDetailSlider from "../../components/ProductDetailSlider";
import Comments from "../../components/Comments";
// import { SocketContext } from "../../context";
import Product from "../../components/Product";
import ProductSkeleton from "../../components/Skeleton/Product";
import Stars from "../../components/Stars";
import { addToWishlist, removeWishlistItem } from "../../redux/wishlistSlice";
import ModalSizeGuide from "./ModalSizeGuide";
import SizeGuide from "./SizeGuide";
import TabPanel from "../../components/TabPanel";
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
  // const socket = useContext(SocketContext);

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
  const [tab, setTab] = useState(0);

  const params = useParams();
  const { product_slug } = params;

  const hasDiscount =
    product && product.discounts && product.discounts.length > 0;

  // useEffect(() => {
  //   if (product) {
  //     socket.emit("join-room", product.slug);
  //   }
  // }, [socket, product]);
  useEffect(() => {
    (async function () {
      const data = await configAxiosAll(user, dispatch).get(query);
      document.title = data.name;
      setProduct(data.item);
      dispatch(addToLatest(data));
      setIndexSize(
        data.item.colors[0].sizes.findIndex((item) => item.amount > 0)
      );
      // const data2 = await configAxiosAll(user, dispatch).get(
      //   `${API_PRODUCT_URL}/group-product/${data.item.groupProduct.slug}?exceptId=${data.item.id}&limit=${LIMIT_RECOMMEND_PRODUCT}`
      // );
      // setRecommendedProduct(data2);
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
        showToast({
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
            detailId: product.colors[indexColor].sizes[indexSize].detailId,
            quantity,
          }
        );
        dispatch(addToCart(data));
        dispatch(
          showToast({
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
            showToast({
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
            showToast({
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
  console.log({ product });
  if (!product) return "";

  return (
    <Box sx={{ minHeight: "100%" }}>
      <Box mb={1} py={3} px={6} bgcolor="lightgrey">
        <Breadcrumbs
          items={[
            {
              to: "/",
              text: "Trang chủ",
            },
            {
              to: `/${product.groupProduct.category.groupCategory.slug}`,
              text: product.groupProduct.category.groupCategory.name,
            },
            {
              to: `/${product.groupProduct.category.slug}`,
              text: product.groupProduct.category.name,
            },
            {
              text: product.groupProduct.name,
            },
          ]}
        />
      </Box>
      <Box py={5} pl={5} pr={8}>
        <Grid container columnSpacing={3}>
          <Grid
            item
            lg={4}
            sx={{
              display: {
                xs: "none",
                lg: "flex",
              },
            }}
          >
            <Box width="100%">
              <img src={product.avatar} alt="" width="100%" />
            </Box>
          </Grid>
          <Grid item xs={12} lg={8}>
            <div className="product-name">
              <div
                style={{
                  fontSize: 32,
                  textTransform: "uppercase",
                }}
              >
                {product.name}
              </div>
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
                  // product.rate.total_rate && product.rate.count > 0
                  //   ? product.rate.total_rate / product.rate.count
                  //   : 0
                  5
                }
              />
              <div className="">
                &nbsp;(
                {/* {product.rate.count === 0 ? "Chưa có" : product.rate.count} */}
                0 &nbsp;đánh giá)
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
            <div style={{ fontSize: 24 }}>
              {/* {hasDiscount && (
                <span style={{ color: "var(--main-color)" }}>
                  {formatThousandDigits(
                    product.discounts[product.discounts.length - 1].new_price
                  )}
                  đ
                </span>
              )} */}
              <span
                style={
                  // hasDiscount
                  //   ? {
                  //       textDecoration: "line-through",
                  //       marginLeft: "4px",
                  //       color: "gray",
                  //     }
                  //   :
                  { color: "red" }
                }
              >
                {formatThousandDigits(product.initPrice)} ₫
              </span>
            </div>
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
                      backgroundImage: `url(${item.avatar})`,
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
            {/* {product.category.guides.length > 0 && (
              <div
                onClick={() => setOpenSizeGuide(!openSizeGuide)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  userSelect: "none",
                  marginTop: "16px",
                }}
              >
                <StraightenIcon sx={{ color: "var(--main-color)" }} />
                Hướng dẫn chọn size
                <KeyboardArrowDownIcon />
              </div>
            )} */}
            {/* {openSizeGuide && (
              <SizeGuide
                handleClose={() => setOpenSizeGuide(false)}
                guides={product.category.guides}
              />
            )} */}
            <Box display="flex">
              <Box>
                {product.colors[indexColor].sizes[indexSize].code !== "0" && (
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body1">Kích cỡ:</Typography>
                  </Box>
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
                          width: "24px",
                          height: "24px",
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
                          fontSize: 10,
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
              </Box>
              <Box ml={6}>
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1">Số lượng:</Typography>
                </Box>
                <Box className="product-quantity-wrapper">
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => handleChangeQuantity(e.target.value)}
                  />
                  <div className="product-quantity-btn-wrapper">
                    <button onClick={() => handleChangeQuantity(quantity + 1)}>
                      <ArrowDropUpRoundedIcon />
                    </button>

                    <button onClick={() => handleChangeQuantity(quantity - 1)}>
                      <ArrowDropDownRoundedIcon />
                    </button>
                  </div>
                </Box>
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
                sx={{
                  flex: "1",
                  marginRight: {
                    xs: "0",
                    lg: "2px",
                  },
                  backgroundColor: "#fff !important",
                  paddingBlock: "8px",
                  border: "2px solid red",
                  borderRadius: "0",
                  color: "red",
                }}
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </Button>
              <Button
                sx={{
                  flex: "1",
                  marginLeft: {
                    xs: "0",
                    lg: "2px",
                  },
                  backgroundColor: "#fff !important",
                  paddingBlock: "8px",
                  border: "2px solid #000",
                  borderRadius: "0",
                  color: "#000",
                }}
              >
                Mua ngay
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Tabs
        value={tab}
        onChange={(e, value) => setTab(value)}
        sx={{
          ".MuiTab-root.Mui-selected": {
            color: "#000 ",
          },
          ".MuiTabs-indicator": {
            bgcolor: "#000",
          },
        }}
      >
        <Tab label="Mô tả" />
        <Tab label="Đánh giá" />
      </Tabs>
      <TabPanel index={0} value={tab}>
        <Box p={2}>
          {product?.colors[indexColor]?.images?.map((item, index) => (
            <img key={index} alt="" src={item.url} width="100%" />
          ))}
        </Box>
      </TabPanel>
      <TabPanel index={1} value={tab}>
        b
      </TabPanel>
      {/* <Box mb={2}>{product && <Comments product={product} />}</Box> */}
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
