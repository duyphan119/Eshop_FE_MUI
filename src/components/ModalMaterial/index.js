import { FormControl, TextField } from "@mui/material";
import { useState } from "react";
import Modal from "../Modal";

const ModalMaterial = ({
  open,
  handleClose,
  title,
  labelOk,
  isCloseAfterOk,
  handleOk,
  width,
  material,
}) => {
  const [value, setValue] = useState(material ? material.value : "");

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={title}
      labelOk={labelOk}
      handleOk={() => {
        handleOk({
          value,
        });
      }}
      isCloseAfterOk={isCloseAfterOk}
      width={width}
    >
      <FormControl fullWidth sx={{ my: 1 }}>
        <TextField
          label="Tên chất liệu"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </FormControl>
    </Modal>
  );
};

export default ModalMaterial;
