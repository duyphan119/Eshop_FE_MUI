import { FormControl, TextField } from "@mui/material";
import { useState } from "react";
import Modal from "../Modal";

const ModalRole = ({
  open,
  handleClose,
  title,
  labelOk,
  isCloseAfterOk,
  handleOk,
  width,
  role,
}) => {
  const [value, setValue] = useState(role ? role.role : "");

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={title}
      labelOk={labelOk}
      handleOk={() => {
        handleOk({
          role: value,
        });
      }}
      isCloseAfterOk={isCloseAfterOk}
      width={width}
    >
      <FormControl fullWidth sx={{ my: 1 }}>
        <TextField
          label="Quyền"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </FormControl>
    </Modal>
  );
};

export default ModalRole;
