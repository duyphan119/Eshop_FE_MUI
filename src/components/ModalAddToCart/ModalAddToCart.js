import { Box, Container, Grid, Typography } from "@mui/material";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";
import { axiosToken } from "../../config/configAxios";
import { API_CART_ITEM_URL, API_PRODUCT_URL } from "../../constants";
import { addToCart, showModalAddToCart } from "../../redux/cartSlice";
import { addToLatest } from "../../redux/productSlice";
import { showToast } from "../../redux/toastSlice";
import { formatThousandDigits, getURL } from "../../utils";
import Modal from "../Modal";
import Stars from "../Stars";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styles from "./ModalAddToCart.module.css";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
const ModalAddToCart = () => {
  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const modal = useSelector((state) => state.cart.modal);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [product, setProduct] = useState();
  const [indexColor, setIndexColor] = useState(0);
  const [indexSize, setIndexSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [msgQuantity, setMsgQuantity] = useState("");

  useEffect(() => {
    (async function () {
      const res = await axiosToken(token.accessToken, dispatch, navigate).get(
        `${API_PRODUCT_URL}/slug/${modal.productSlug}`
      );
      setProduct(res.item);
      dispatch(addToLatest(res.item));
      let i = 0;
      while (i >= res.item.colors.length) {
        let index = res.item.colors[i].sizes.findIndex(
          (item) => item.amount > 0
        );
        if (index !== -1) {
          setIndexSize(index);
          break;
        } else {
          i++;
        }
      }
      setIndexColor(i);
    })();
  }, [dispatch, navigate, modal, token]);

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
        const data = await axiosToken(
          token.accessToken,
          dispatch,
          navigate
        ).post(`${API_CART_ITEM_URL}`, {
          product_detail_id:
            product.colors[indexColor].sizes[indexSize].detail_id,
          quantity,
          cart_id: currentUser.cart.id,
        });
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
  console.log({ product });
  if (!product) return "";

  return (
    <Modal
      open={modal.open}
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
                  lg={10}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <img
                    className={cx("avatar")}
                    src={getURL(product?.colors[indexColor]?.avatar)}
                    alt={product?.name}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={6}>
              <div className={cx("name")}>{product.name}</div>
              <div className={cx("rate")}>
                <Stars
                  rate={
                    // product.rate &&
                    // product.rate.total_rate &&
                    // product.rate.count > 0
                    //   ? product.rate.total_rate / product.rate.count
                    //   : 0
                    0
                  }
                  fontSize="18px"
                />
                <Typography variant="body2" className={cx("rate-count")}>
                  &nbsp;(
                  {product.rate
                    ? product.rate.count === 0
                      ? "Chưa có"
                      : product.rate.count
                    : "Chưa có"}
                  &nbsp;đánh giá)
                </Typography>
              </div>
              {/* <Typography variant="body2">
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
                  {formatThousandDigits(product.price)} ₫
                </span>
              </Typography> */}
              <div className={cx("price")}>
                {formatThousandDigits(product.initPrice)} ₫
              </div>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Màu sắc: {product?.colors[indexColor].value}
              </Typography>
              <div
                style={{
                  display: "flex",
                }}
              >
                {product.colors.map((item, index) => {
                  const initIndexSize = product.colors[index].sizes.findIndex(
                    (item) => item.amount > 0
                  );
                  return (
                    <div
                      className={`${cx("color-preview-item")} ${
                        index === indexColor ? cx("active") : ""
                      } ${initIndexSize === -1 ? cx("size-stuck") : ""}`}
                      key={index}
                      style={{
                        backgroundImage: `url("${getURL(item.avatar)}")`,
                      }}
                      onClick={() => {
                        if (initIndexSize !== -1) {
                          setIndexSize(initIndexSize);
                          setIndexColor(index);
                        }
                      }}
                    ></div>
                  );
                })}
              </div>
              <Box display="flex" mt={2}>
                <Box>
                  {product.colors[indexColor].sizes[indexSize].shortValue !==
                    "0" && (
                    <Typography variant="body2">
                      Kích cỡ:{" "}
                      {product.colors[indexColor].sizes[indexSize].value}
                    </Typography>
                  )}
                  <Box
                    style={{
                      display: "flex",
                    }}
                  >
                    {product.colors[indexColor].sizes.map((item, index) => {
                      if (item.shortValue === "0") return "";
                      return (
                        <div
                          className={`${cx("size-preview-item")} ${
                            index === indexSize ? cx("active") : ""
                          } ${item.amount === 0 ? cx("size-stuck") : ""}`}
                          key={item.id}
                          onClick={() => {
                            if (item.amount > 0) {
                              setIndexSize(index);
                            }
                          }}
                        >
                          {item.value}
                        </div>
                      );
                    })}
                  </Box>
                </Box>
                <Box ml={6}>
                  <Box>
                    <Typography variant="body2">Số lượng:</Typography>
                  </Box>
                  <Box className={cx("quantity-wrapper")}>
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => handleChangeQuantity(e.target.value)}
                    />
                    <div className={cx("quantity-btn-wrapper")}>
                      <button
                        onClick={() => handleChangeQuantity(quantity + 1)}
                      >
                        <ArrowDropUpRoundedIcon />
                      </button>

                      <button
                        onClick={() => handleChangeQuantity(quantity - 1)}
                      >
                        <ArrowDropDownRoundedIcon />
                      </button>
                    </div>
                  </Box>
                </Box>
              </Box>
              {msgQuantity !== "" && (
                <Typography variant="body2" color="red">
                  {msgQuantity}
                </Typography>
              )}
              <Box
                className={cx("btn-group")}
                sx={{
                  position: {
                    xs: "fixed",
                    lg: "unset",
                  },
                }}
              >
                <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Modal>
  );
};

export default ModalAddToCart;
