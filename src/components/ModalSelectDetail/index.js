import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../Modal";

const ModalSelectDetail = ({
  open,
  handleClose,
  title,
  labelOk,
  isCloseAfterOk,
  handleOk,
  width,
}) => {
  const colors = useSelector((state) => state.color.all);
  const sizes = useSelector((state) => state.size.all);

  const [indexColor, setIndexColor] = useState(0);
  const [indexSize, setIndexSize] = useState(0);
  const [amount, setAmount] = useState(0);

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={title}
      labelOk={labelOk}
      handleOk={() => {
        handleOk({
          color: colors[indexColor],
          size: sizes[indexSize],
          amount,
        });
      }}
      isCloseAfterOk={isCloseAfterOk}
      width={width}
    >
      <Grid container rowSpacing={2} columnSpacing={2} my={1}>
        <Grid item xs={4}>
          {colors.length > 0 && (
            <FormControl fullWidth>
              <InputLabel id="color">Màu sắc</InputLabel>
              <Select
                label="Màu sắc"
                labelId="color"
                value={indexColor}
                onChange={(e) => setIndexColor(e.target.value)}
              >
                {colors.map((item, index) => (
                  <MenuItem value={index} key={index}>
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Grid>
        <Grid item xs={4}>
          {sizes.length > 0 && (
            <FormControl fullWidth>
              <InputLabel id="size">Kích cỡ</InputLabel>
              <Select
                label="Kích cỡ"
                labelId="size"
                value={indexSize}
                onChange={(e) => setIndexSize(e.target.value)}
              >
                {sizes.map((item, index) => (
                  <MenuItem value={index} key={index}>
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              label="Số lượng"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ModalSelectDetail;
