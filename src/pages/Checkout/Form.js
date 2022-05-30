import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { TitleControl } from "../../components/Title";
import { API_PROVINCE_URL } from "../../constants";
const Form = ({ order, setOrder }) => {
  const [optionsCity, setOptionsCity] = useState([]);
  const [optionsDistrict, setOptionsDistricts] = useState([]);
  const [optionsWards, setOptionsWards] = useState([]);

  useEffect(() => {
    (async function () {
      const res = await axios.get(`${API_PROVINCE_URL}?depth=3`);
      setOptionsCity(res.data);
    })();
  }, []);

  useEffect(() => {
    if (optionsCity.length !== 0) {
      const _item = optionsCity.find((item) => item.name === order.city);
      setOptionsDistricts(_item ? _item.districts : []);
    }
  }, [order.city, optionsCity]);

  useEffect(() => {
    if (optionsDistrict.length !== 0) {
      const _item = optionsDistrict.find(
        (item) => item.name === order.district
      );
      setOptionsWards(_item ? _item.wards : []);
    }
  }, [order.district, optionsDistrict]);

  return (
    <Box sx={{ pt: 4 }}>
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
              value={order.fullName}
              onChange={(e) =>
                setOrder((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }))
              }
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
              value={order.phoneNumber}
              onChange={(e) =>
                setOrder((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
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
              value={order.city}
              label="Tỉnh, Thành phố"
              onChange={(e) =>
                setOrder((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
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
              value={order.district}
              label="Quận, Huyện"
              disabled={optionsDistrict.length === 0}
              onChange={(e) =>
                setOrder((prev) => ({
                  ...prev,
                  district: e.target.value,
                }))
              }
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
              value={order.ward}
              label="Phường"
              disabled={optionsWards.length === 0}
              onChange={(e) =>
                setOrder((prev) => ({
                  ...prev,
                  ward: e.target.value,
                }))
              }
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
              value={order.street}
              disabled={optionsWards.length === 0}
              onChange={(e) =>
                setOrder((prev) => ({
                  ...prev,
                  street: e.target.value,
                }))
              }
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
              value={order.addressNo}
              disabled={optionsWards.length === 0}
              onChange={(e) =>
                setOrder((prev) => ({
                  ...prev,
                  addressNo: e.target.value,
                }))
              }
            />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <TitleControl>Thanh toán</TitleControl>
          <FormControlLabel
            control={<Checkbox checked={true} />}
            label="Thanh toán khi giao hàng"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;
