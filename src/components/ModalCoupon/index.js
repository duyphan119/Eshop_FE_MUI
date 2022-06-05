import { FormControl, Grid, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import Modal from "../Modal";

const ModalCoupon = ({
  open,
  handleClose,
  title,
  labelOk,
  isCloseAfterOk,
  handleOk,
  width,
  coupon,
}) => {
  const [start, setStart] = useState(coupon ? coupon.start : new Date());
  const [finish, setFinish] = useState(coupon ? coupon.finish : new Date());
  const [percent, setPercent] = useState(coupon ? coupon.percent : 0);
  const [code, setCode] = useState(coupon ? coupon.code : "");
  const [name, setName] = useState(coupon ? coupon.name : "");

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={title}
      labelOk={labelOk}
      handleOk={() => {
        handleOk({
          start,
          finish,
          percent,
          name,
          code,
        });
      }}
      isCloseAfterOk={isCloseAfterOk}
      width={width}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              label="Tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              label="Mã giảm giá"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              label="Phần trăm"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              required
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Ngày bắt đầu"
                value={start}
                onChange={(newValue) => {
                  setStart(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Ngày kết thúc"
                value={finish}
                onChange={(newValue) => {
                  setFinish(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ModalCoupon;
