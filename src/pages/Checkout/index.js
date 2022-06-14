/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Container, Grid } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import config from "../../config";
import { configAxiosAll, configAxiosResponse } from "../../config/configAxios";
import {
  API_COUPON_URL,
  API_NOTIFICATION_URL,
  API_ORDER_URL,
} from "../../constants";
// import { SocketContext } from "../../context";
import { getSelectedCartItems } from "../../redux/cartSlice";
import { showToastMessage } from "../../redux/toastSlice";
import { getFinalPrice, getTotalPrice, validateTelephone } from "../../utils";
import "./Checkout.css";
import Form from "./Form";
import Result from "./Result";

const Checkout = () => {
  // const socket = useContext(SocketContext);

  const user = useSelector((state) => state.auth.currentUser);
  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [order, setOrder] = useState({
    addressNo: "",
    city: "",
    street: "",
    ward: "",
    district: "",
    phoneNumber: "",
    fullName: user ? user.full_name : "",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [coupon, setCoupon] = useState();

  const finalPrice = getFinalPrice(totalPrice, coupon);

  useEffect(() => {
    document.title = "Thanh toán";
  }, []);
  // useEffect(() => {
  //   (async function () {
  //     try {
  //       const data = await configAxiosResponse().get(
  //         `${API_COUPON_URL}?percent=0`
  //       );
  //       setCoupon(data.items[0]);
  //     } catch (error) {}
  //   })();
  // }, []);
  useEffect(() => {
    setTotalPrice(getTotalPrice(cart));
  }, [cart]);

  const handleCheckout = useCallback(async () => {
    try {
      if (order) {
        if (validateTelephone(order.telephone) && finalPrice !== 0) {
          const data = await configAxiosAll(user, dispatch).post(
            `${API_ORDER_URL}`,
            {
              userId: user.id,
              cart: cart,
              address: `${order.street} ${order.ward}, ${order.district}, ${order.city}`,
              total: finalPrice,
              deliveryPrice: 0,
              tempPrice: totalPrice,
              telephone: order.telephone,
              fullName: order.fullName,
              couponId: coupon.id,
              description: order.description,
            }
          );
          if (data) {
            //dispatch(getSelectedCartItems({ items: [], count: 0 }));
            // const notify = await configAxiosAll(user, dispatch).post(
            //   `${API_NOTIFICATION_URL}`,
            //   {
            //     title: `${user.full_name} đã đặt một đơn hàng`,
            //     href: `/dashboard/order`,
            //     isRead: false,
            //     sender_id: user.id,
            //     notify_type: "order",
            //   }
            // );
            // socket.emit("send-notify", {
            //   roomId: "admin",
            //   ...notify,
            // });
            //navigate(config.routes.checkoutSuccess);
          }
        } else {
          dispatch(
            showToastMessage({
              type: "info",
              text: "Số điện thoại không hợp lệ",
              title: "Thông tin",
              isOpen: true,
            })
          );
        }
      } else {
        dispatch(
          showToastMessage({
            type: "error",
            text: "Vui lòng chọn đầy đủ thông tin",
            title: "Thất bại",
            isOpen: true,
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        showToastMessage({
          type: "error",
          text: "Vui lòng chọn đầy đủ thông tin",
          title: "Thất bại",
          isOpen: true,
        })
      );
    }
  }, [coupon, order]);
  // if (selectedCartItems.count === 0)
  //   return <Navigate to={config.routes.cart} />;

  return (
    <Box px={6} py={3}>
      <Box sx={{ borderBottom: "1px solid #000", pb: 3, fontSize: 20 }}>
        Thanh toán giỏ hàng
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Form order={order} setOrder={setOrder} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Result
            onCheckout={handleCheckout}
            totalPrice={totalPrice}
            finalPrice={finalPrice}
            setCoupon={setCoupon}
            coupon={coupon}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;
