/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Grid } from "@mui/material";
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
import { SocketContext } from "../../context";
import { getSelectedCartItems } from "../../redux/cartSlice";
import { showToastMessage } from "../../redux/toastSlice";
import { getFinalPrice, getTotalPrice, validateTelephone } from "../../utils";
import "./Checkout.css";
import Form from "./Form";
import Result from "./Result";

const Checkout = () => {
  const socket = useContext(SocketContext);

  const user = useSelector((state) => state.auth.currentUser);
  const selectedCartItems = useSelector(
    (state) => state.cart.selectedCartItems
  );

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
  useEffect(() => {
    (async function () {
      try {
        const data = await configAxiosResponse().get(
          `${API_COUPON_URL}?percent=0`
        );
        setCoupon(data.items[0]);
      } catch (error) {}
    })();
  }, []);
  useEffect(() => {
    setTotalPrice(getTotalPrice(selectedCartItems));
  }, [selectedCartItems]);

  const handleCheckout = useCallback(async () => {
    try {
      if (order) {
        if (validateTelephone(order.phoneNumber) && finalPrice !== 0) {
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
              description: order.description,
            }
          );
          if (data) {
            dispatch(getSelectedCartItems({ items: [], count: 0 }));
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
            navigate(config.routes.checkoutSuccess);
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
  if (selectedCartItems.count === 0)
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
