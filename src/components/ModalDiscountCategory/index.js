import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSelector } from "react-redux";

import Modal from "../Modal";
const ModalDiscountCategory = ({
  open,
  handleClose,
  title,
  labelOk,
  isCloseAfterOk,
  handleOk,
  width,
  discountCategory,
}) => {
  const categories = useSelector((state) => state.category.all);

  const [start, setStart] = useState(
    discountCategory ? discountCategory.start : new Date()
  );
  const [end, setEnd] = useState(
    discountCategory ? discountCategory.end : new Date()
  );
  const [percent, setPercent] = useState(
    discountCategory ? discountCategory.percent : 0
  );
  const [index, setIndex] = useState(0);

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={title}
      labelOk={labelOk}
      handleOk={() => {
        handleOk({
          start,
          end,
          percent,
          category: categories[index],
        });
      }}
      isCloseAfterOk={isCloseAfterOk}
      width={width}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="category">Danh mục</InputLabel>
            <Select
              labelId="category"
              label="Danh mục"
              value={index}
              onChange={(e) => setIndex(e.target.value)}
            >
              {categories.map((item, index) => (
                <MenuItem key={index} value={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              label="Phần trăm"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
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
                value={end}
                onChange={(newValue) => {
                  setEnd(newValue);
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

export default ModalDiscountCategory;
