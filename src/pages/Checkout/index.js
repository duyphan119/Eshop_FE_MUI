/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Grid } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import config from "../../config";
import { configAxiosAll, configAxiosResponse } from "../../config/configAxios";
import {
  API_COUPON_URL,
  API_NOTIFICATION_URL,
  API_ORDER_URL,
} from "../../constants";
import { getSelectedCartItems } from "../../redux/cartSlice";
import { showToastMessage } from "../../redux/toastSlice";
import { getFinalPrice, getTotalPrice } from "../../utils";
import CheckoutSuccess from "../CheckoutSuccess";
import "./Checkout.css";
import Form from "./Form";
import Result from "./Result";
import { SocketContext } from "../../context";

const Checkout = () => {
  const socket = useContext(SocketContext);

  const user = useSelector((state) => state.auth.currentUser);
  const selectedCartItems = useSelector(
    (state) => state.cart.selectedCartItems
  );

  const dispatch = useDispatch();

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
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [coupon, setCoupon] = useState();

  const finalPrice = getFinalPrice(totalPrice, coupon);

  useEffect(() => {
    document.title = "Thanh toán";
  }, []);
  useEffect(() => {
    (async function () {
      try {
        const data = await configAxiosResponse().get(
          `${API_COUPON_URL}?percent=0`
        );
        setCoupon(data[0]);
      } catch (error) {}
    })();
  }, []);
  useEffect(() => {
    setTotalPrice(getTotalPrice(selectedCartItems));
  }, [selectedCartItems]);

  const handleCheckout = useCallback(async () => {
    if (order) {
      const data = await configAxiosAll(user, dispatch).post(
        `${API_ORDER_URL}`,
        {
          user_id: user.id,
          cart_id: user.cart.id,
          cart: selectedCartItems,
          address: `${order.addressNo} ${order.street} ${order.ward}, ${order.district}, ${order.city}`,
          total: finalPrice,
          telephone: order.phoneNumber,
          full_name: order.fullName,
          coupon_id: coupon.id,
        }
      );
      if (data) {
        dispatch(getSelectedCartItems({ items: [], count: 0 }));
        setIsSuccessful(true);
        const notify = await configAxiosAll(user, dispatch).post(
          `${API_NOTIFICATION_URL}`,
          {
            title: `${user.full_name} đã đặt một đơn hàng`,
            href: `/dashboard/order`,
            isRead: false,
            sender_id: user.id,
            notify_type: "order",
          }
        );
        socket.emit("send-notify", {
          roomId: "admin",
          ...notify,
        });
      } else {
        setIsSuccessful(false);
        dispatch(
          showToastMessage({
            type: "error",
            text: "Đặt hàng thất bại",
            title: "Thất bại",
            isOpen: true,
          })
        );
      }
    } else {
      setIsSuccessful(false);
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
  if (isSuccessful) return <CheckoutSuccess />;
  else if (!isSuccessful && selectedCartItems.count === 0)
    return <Navigate to={config.routes.cart} />;

  return (
    <Container>
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
    </Container>
  );
};

export default Checkout;
