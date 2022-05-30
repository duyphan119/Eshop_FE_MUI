import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import config from "../../config";
import { configAxiosAll, configAxiosResponse } from "../../config/configAxios";
import { API_COUPON_URL, API_ORDER_URL } from "../../constants";
import { getSelectedCartItems } from "../../redux/cartSlice";
import { showToastMessage } from "../../redux/toastSlice";
import { getTotalPage } from "../../utils";
import CheckoutSuccess from "../CheckoutSuccess";
import "./Checkout.css";
import Form from "./Form";
import Result from "./Result";

const Checkout = () => {
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

  const finalPrice = calculatePrice();

  function calculatePrice() {
    let divide1000 = totalPrice / 1000;
    if (!coupon) return 0;
    return (
      (divide1000 - Math.floor((divide1000 * coupon.percent) / 100)) * 1000
    );
  }

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
    setTotalPrice(getTotalPage(selectedCartItems));
  }, [selectedCartItems]);

  const handleCheckout = async () => {
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
  };
  if (isSuccessful) return <CheckoutSuccess />;
  else if (!isSuccessful && selectedCartItems.count === 0)
    return <Navigate to={config.routes.cart} />;

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Form order={order} setOrder={setOrder} />
        </Grid>
        <Grid item xs={4}>
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
