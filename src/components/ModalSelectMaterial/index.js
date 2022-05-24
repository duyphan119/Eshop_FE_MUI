import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../Modal";

const ModalSelectMaterial = ({
  open,
  handleClose,
  title,
  labelOk,
  isCloseAfterOk,
  handleOk,
  width,
}) => {
  const materials = useSelector((state) => state.material.all);

  const [indexMaterial, setIndexMaterial] = useState(0);

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={title}
      labelOk={labelOk}
      handleOk={() => {
        handleOk(materials[indexMaterial]);
      }}
      isCloseAfterOk={isCloseAfterOk}
      width={width}
    >
      {materials.length > 0 && (
        <FormControl fullWidth sx={{ marginBlock: "8px" }}>
          <InputLabel id="material">Chất liệu</InputLabel>
          <Select
            label="Chất liệu"
            labelId="material"
            value={indexMaterial}
            onChange={(e) => setIndexMaterial(e.target.value)}
          >
            {materials.map((item, index) => (
              <MenuItem value={index} key={index}>
                {item.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Modal>
  );
};

export default ModalSelectMaterial;
