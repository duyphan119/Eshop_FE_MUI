import { FormControl, TextField } from "@mui/material";
import { useState } from "react";
import Modal from "../Modal";

const ModalColor = ({
  open,
  handleClose,
  title,
  labelOk,
  isCloseAfterOk,
  handleOk,
  width,
  color,
}) => {
  const [value, setValue] = useState(color ? color.value : "");
  const [code, setCode] = useState(color ? color.code : "");

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={title}
      labelOk={labelOk}
      handleOk={() => {
        handleOk({
          code,
          value,
        });
      }}
      isCloseAfterOk={isCloseAfterOk}
      width={width}
    >
      <FormControl fullWidth sx={{ mt: 1 }}>
        <TextField
          label="Tên màu"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </FormControl>
      <FormControl fullWidth sx={{ my: 1 }}>
        <TextField
          label="SKU"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </FormControl>
    </Modal>
  );
};

export default ModalColor;
