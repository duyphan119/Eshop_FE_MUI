import { Box, Button, Container, Grid, Typography } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";

import { configAxiosAll } from "../../config/configAxios";
import {
  API_CART_ITEM_URL,
  PRODUCTS_SLIDER_VERTICAL_MODAL_ADD_TO_CART,
} from "../../constants";
import { addToCart, showModalAddToCart } from "../../redux/cartSlice";
import { addToLatest } from "../../redux/productSlice";
import { showToastMessage } from "../../redux/toastSlice";
import { formatThousandDigits } from "../../utils";
import Modal from "../Modal";
import ProductDetailSlider from "../ProductDetailSlider";
import Stars from "../Stars";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./ModalAddToCart.css";
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
const ModalAddToCart = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const product = useSelector((state) => state.product.current);
  const open = useSelector((state) => state.cart.modal.open);

  const dispatch = useDispatch();

  const [indexColor, setIndexColor] = useState(0);
  const [indexImage, setIndexImage] = useState(0);
  const [indexSize, setIndexSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [msgQuantity, setMsgQuantity] = useState("");

  const hasDiscount =
    product && product.discounts && product.discounts.length > 0;

  useEffect(() => {
    if (product) {
      dispatch(addToLatest(product));
      setIndexSize(
        product.colors[0].sizes.findIndex((item) => item.amount > 0)
      );
    }
  }, [dispatch, product]);

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
  if (!product) return "";

  return (
    <Modal
      open={open}
      width={800}
      height={660}
      handleClose={() => dispatch(showModalAddToCart(false))}
    >
      <Box sx={{ minHeight: "100%", paddingBlock: "10px" }}>
        <Container>
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
                    height: "384px",
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
                        PRODUCTS_SLIDER_VERTICAL_MODAL_ADD_TO_CART
                          ? true
                          : false,
                      slidesToShow:
                        product?.colors[indexColor].images.length >
                        PRODUCTS_SLIDER_VERTICAL_MODAL_ADD_TO_CART
                          ? PRODUCTS_SLIDER_VERTICAL_MODAL_ADD_TO_CART
                          : product?.colors[indexColor].images.length,
                      verticalSwiping: true,
                      slidesToScroll: 1,
                      initialSlide: 0,
                      className: "slick-vertical-slider-modal",
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
                          height={78}
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
                    alt={product?.name}
                    height="384"
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
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontSize: 18,
                }}
              >
                {product.name}
              </Typography>
              <div className="product-rate">
                <Stars
                  rate={
                    product.rate &&
                    product.rate.total_rate &&
                    product.rate.count > 0
                      ? product.rate.total_rate / product.rate.count
                      : 0
                  }
                  fontSize="18px"
                />
                <Typography variant="body2" className="">
                  &nbsp;(
                  {product.rate
                    ? product.rate.count === 0
                      ? "Chưa có"
                      : product.rate.count
                    : "Chưa có"}
                  &nbsp;đánh giá)
                </Typography>
              </div>
              <Typography variant="body2">
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
              <Typography variant="body2">
                SKU: {product?.colors[indexColor].sizes[indexSize].sku}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
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
                        width: "48px",
                        height: "48px",
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
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Kích cỡ: {product.colors[indexColor].sizes[indexSize].value}
                </Typography>
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
                        width: "28px",
                        height: "28px",
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
                        fontSize: 12,
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
                <Box className="product-quantity-modal-wrapper">
                  <button onClick={() => handleChangeQuantity(quantity - 1)}>
                    <RemoveOutlinedIcon sx={{ fontSize: 14 }} />
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => handleChangeQuantity(e.target.value)}
                  />
                  <button onClick={() => handleChangeQuantity(quantity + 1)}>
                    <AddOutlinedIcon sx={{ fontSize: 14 }} />
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
                    paddingBlock: "8px",
                  }}
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Modal>
  );
};

export default ModalAddToCart;
