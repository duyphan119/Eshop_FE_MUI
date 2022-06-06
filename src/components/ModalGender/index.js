import { FormControl, Grid, TextField } from "@mui/material";
import { useState } from "react";
import Modal from "../Modal";

const ModalGender = ({
  open,
  handleClose,
  title,
  labelOk,
  isCloseAfterOk,
  handleOk,
  width,
  genderCategory,
}) => {
  const [name, setName] = useState(genderCategory ? genderCategory.name : "");

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={title}
      labelOk={labelOk}
      handleOk={() => {
        handleOk({
          name,
        });
      }}
      isCloseAfterOk={isCloseAfterOk}
      width={width}
    >
      <Grid container columnSpacing={2} rowSpacing={2} my={1}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Tên đối tượng"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ModalGender;
