import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showToastMessage } from "../../redux/toastSlice";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { getTotalPage } from "../../utils";
import { configAxiosAll } from "../../config/configAxios";
import { API_ORDER_URL, API_PROVINCE_URL } from "../../constants";
import CheckoutSuccess from "../CheckoutSuccess";
import axios from "axios";
import { getCart } from "../../redux/cartSlice";

const Checkout = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [addressNo, setAddressNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(
    user && user.phone_number ? user.phone_number : ""
  );
  const [optionsCity, setOptionsCity] = useState([]);
  const [optionsDistrict, setOptionsDistricts] = useState([]);
  const [optionsWards, setOptionsWards] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSuccessful, setIsSuccessful] = useState(false);
  // const [deliveryPrice, setDeliveryPrice] = useState(23000);

  useEffect(() => {
    document.title = "Thanh toán";
  }, []);

  useEffect(() => {
    setTotalPrice(getTotalPage(cart));
  }, [cart]);

  useEffect(() => {
    (async function () {
      const res = await axios.get(`${API_PROVINCE_URL}?depth=3`);
      setOptionsCity(res.data);
    })();
  }, []);

  useEffect(() => {
    if (optionsCity.length !== 0) {
      const _item = optionsCity.find((item) => item.name === city);
      setOptionsDistricts(_item ? _item.districts : []);
    }
  }, [city, optionsCity]);

  useEffect(() => {
    if (optionsDistrict.length !== 0) {
      const _item = optionsDistrict.find((item) => item.name === district);
      setOptionsWards(_item ? _item.wards : []);
    }
  }, [district, optionsDistrict]);

  const handleCheckout = async () => {
    if (
      city !== "" &&
      district !== "" &&
      ward !== "" &&
      addressNo !== "" &&
      street !== "" &&
      phoneNumber !== ""
    ) {
      const data = await configAxiosAll(user, dispatch).post(
        `${API_ORDER_URL}`,
        {
          user_id: user.id,
          cart: cart,
          address: `${addressNo} ${street}, ${ward}, ${district}, ${city}`,
          total: totalPrice,
          telephone: phoneNumber,
        }
      );
      if (data) {
        dispatch(getCart({ items: [], count: 0 }));
        setIsSuccessful(!isSuccessful);
      } else {
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
  if (cart.count === 0) return <Navigate to="/cart" />;

  return (
    <Box sx={{ paddingBlock: "20px" }}>
      <Container>
        <Grid container columnSpacing={2} rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ fontWeight: "600" }}>
              THÔNG TIN ĐƠN HÀNG
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Grid container columnSpacing={2} rowSpacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2">THÔNG TIN KHÁCH HÀNG</Typography>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    defaultValue={user.email}
                    disabled={true}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <TextField
                    id="full_name"
                    label="Họ tên"
                    variant="outlined"
                    defaultValue={user.full_name}
                    disabled={true}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <TextField
                    id="phone"
                    label="Số điện thoại liện hệ"
                    variant="outlined"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="city">Tỉnh, Thành phố</InputLabel>
                  <Select
                    labelId="city"
                    id="select-city"
                    value={city}
                    label="Tỉnh, Thành phố"
                    onChange={(e) => setCity(e.target.value)}
                  >
                    {optionsCity.map((item) => {
                      return (
                        <MenuItem value={item.name} key={item.name}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="district">Quận, Huyện</InputLabel>
                  <Select
                    labelId="district"
                    id="select-district"
                    value={district}
                    label="Quận, Huyện"
                    disabled={optionsDistrict.length === 0}
                    onChange={(e) => setDistrict(e.target.value)}
                  >
                    {optionsDistrict.map((item) => {
                      return (
                        <MenuItem value={item.name} key={item.name}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="ward">Phường</InputLabel>
                  <Select
                    labelId="ward"
                    id="select-ward"
                    value={ward}
                    label="Phường"
                    disabled={optionsWards.length === 0}
                    onChange={(e) => setWard(e.target.value)}
                  >
                    {optionsWards.map((item) => {
                      return (
                        <MenuItem value={item.name} key={item.name}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <TextField
                    id="street"
                    label="Tên đường"
                    variant="outlined"
                    value={street}
                    disabled={optionsWards.length === 0}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <TextField
                    id="addressNo"
                    label="Số nhà"
                    variant="outlined"
                    value={addressNo}
                    disabled={optionsWards.length === 0}
                    onChange={(e) => setAddressNo(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Thanh toán khi giao hàng"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid
              container
              sx={{
                backgroundColor: "#fff",
              }}
            >
              <Grid
                item
                lg={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1">ĐƠN GIÁ</Typography>
              </Grid>
              <Grid
                item
                lg={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  paddingInline: "2px",
                }}
              >
                <div
                  style={{
                    flex: "1",
                    fontSize: "14px",
                  }}
                >
                  Thành tiền
                </div>
                <div
                  style={{
                    flex: "1",
                    fontSize: "14px",
                    textAlign: "right",
                  }}
                >
                  {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                </div>
              </Grid>
              <Grid
                item
                lg={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  paddingInline: "2px",
                }}
              >
                <div
                  style={{
                    flex: "1",
                    fontSize: "14px",
                  }}
                >
                  Vận chuyển
                </div>
                <div
                  style={{
                    flex: "1",
                    fontSize: "14px",
                    textAlign: "right",
                  }}
                >
                  0đ
                </div>
              </Grid>
              <Grid
                item
                lg={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  paddingInline: "2px",
                }}
              >
                <div
                  style={{
                    flex: "1",
                    fontWeight: "500",
                  }}
                >
                  Tổng cộng
                </div>
                <div
                  style={{
                    flex: "1",
                    fontWeight: "500",
                    textAlign: "right",
                  }}
                >
                  {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                </div>
              </Grid>
              <Grid
                item
                lg={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "10px 0",
                  flexDirection: "column",
                }}
              >
                <Button
                  color="primary"
                  variant="outlined"
                  sx={{
                    flex: "1",
                    marginTop: "5px",
                  }}
                  onClick={() => navigate("/cart")}
                >
                  QUAY VỀ GIỎ HÀNG
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    flex: "1",
                    marginTop: "5px",
                  }}
                  onClick={() => handleCheckout()}
                >
                  ĐẶT HÀNG
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;
