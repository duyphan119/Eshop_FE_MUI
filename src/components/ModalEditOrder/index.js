import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Modal from "../Modal";

const ModalEditOrder = ({
  open,
  handleClose,
  title,
  labelOk,
  isCloseAfterOk,
  order,
  orderStatuses,
  handleOk,
  width,
}) => {
  const [total, setTotal] = useState(order ? order.total : 0);
  const [indexStatus, setIndexStatus] = useState(
    (!orderStatuses || orderStatuses.length) === 0
      ? -1
      : orderStatuses.findIndex((el) => el.id === order.status.id)
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={title}
      labelOk={labelOk}
      handleOk={() => {
        handleOk({ total, indexStatus });
      }}
      isCloseAfterOk={isCloseAfterOk}
      width={width}
    >
      <Grid container columnSpacing={2} rowSpacing={2} my={1}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              label="Tổng tiền"
              value={total}
              onChange={(e) => setTotal(parseInt(e.target.value))}
            />
          </FormControl>
        </Grid>
        {orderStatuses && (
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="order-status">Danh mục</InputLabel>
              <Select
                label="Trạng thái"
                onChange={(e) => setIndexStatus(e.target.value)}
                value={indexStatus}
              >
                {orderStatuses.map((item, index) => (
                  <MenuItem key={index} value={index}>
                    {item.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
      </Grid>
    </Modal>
  );
};

export default ModalEditOrder;
