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
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { TitleControl } from "../../components/Title";
import config from "../../config";
import { configAxiosAll } from "../../config/configAxios";
import { API_ORDER_URL, API_PROVINCE_URL } from "../../constants";
import { getSelectedCartItems } from "../../redux/cartSlice";
import { showToastMessage } from "../../redux/toastSlice";
import { getTotalPage } from "../../utils";
import CheckoutSuccess from "../CheckoutSuccess";

const Checkout = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const selectedCartItems = useSelector(
    (state) => state.cart.selectedCartItems
  );

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
  const [fullName, setFullName] = useState(
    user && user.full_name ? user.full_name : ""
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
    setTotalPrice(getTotalPage(selectedCartItems));
  }, [selectedCartItems]);

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
      phoneNumber !== "" &&
      fullName !== ""
    ) {
      const data = await configAxiosAll(user, dispatch).post(
        `${API_ORDER_URL}`,
        {
          user_id: user.id,
          cart: selectedCartItems,
          address: `${addressNo} ${street}, ${ward}, ${district}, ${city}`,
          total: totalPrice,
          telephone: phoneNumber,
          full_name: fullName,
        }
      );
      if (data) {
        dispatch(getSelectedCartItems({ items: [], count: 0 }));
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
  if (selectedCartItems.count === 0)
    return <Navigate to={config.routes.cart} />;

  return (
    <Box sx={{ paddingBlock: "20px" }}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TitleControl>Thông tin giao hàng</TitleControl>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <TextField
                    inputProps={{
                      style: { fontSize: 14 },
                    }}
                    size="small"
                    label="Họ tên"
                    variant="outlined"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <TextField
                    inputProps={{
                      style: { fontSize: 14 },
                    }}
                    size="small"
                    label="Số điện thoại liện hệ"
                    variant="outlined"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ mt: 2 }} size="small">
                  <InputLabel
                    id="city"
                    sx={{ bgcolor: "#fff", padding: "0 8px 0 3px" }}
                  >
                    Tỉnh, Thành phố
                  </InputLabel>
                  <Select
                    className="fz-14"
                    labelId="city"
                    size="small"
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
                <FormControl fullWidth sx={{ mt: 2 }} size="small">
                  <InputLabel
                    id="district"
                    sx={{ bgcolor: "#fff", padding: "0 8px 0 3px" }}
                  >
                    Quận, Huyện
                  </InputLabel>
                  <Select
                    labelId="district"
                    className="fz-14"
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
                <FormControl fullWidth sx={{ mt: 2 }} size="small">
                  <InputLabel
                    id="ward"
                    sx={{ bgcolor: "#fff", padding: "0 8px 0 3px" }}
                  >
                    Phường
                  </InputLabel>
                  <Select
                    labelId="ward"
                    className="fz-14"
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
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <TextField
                    inputProps={{
                      style: { fontSize: 14 },
                    }}
                    size="small"
                    id="street"
                    label="Tên đường"
                    variant="outlined"
                    value={street}
                    disabled={optionsWards.length === 0}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <TextField
                    inputProps={{
                      style: { fontSize: 14 },
                    }}
                    size="small"
                    id="addressNo"
                    label="Số nhà"
                    variant="outlined"
                    value={addressNo}
                    disabled={optionsWards.length === 0}
                    onChange={(e) => setAddressNo(e.target.value)}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Thanh toán khi giao hàng"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} sx={{ borderLeft: "0.5px solid lightgray" }}>
            <TitleControl>
              Đơn hàng ({selectedCartItems.count} sản phẩm)
            </TitleControl>

            <Box
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
            </Box>
            <Box
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
            </Box>
            <Box
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
            </Box>
            <Box
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
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;
