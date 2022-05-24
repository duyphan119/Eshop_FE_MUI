import {
  Button,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../Modal";

const ModalSelectImage = ({
  open,
  handleClose,
  title,
  labelOk,
  isCloseAfterOk,
  handleOk,
  width,
}) => {
  const colors = useSelector((state) => state.color.all);

  const [indexColor, setIndexColor] = useState(0);
  const [files, setFiles] = useState([]);

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={title}
      labelOk={labelOk}
      handleOk={() => {
        handleOk({ color: colors[indexColor], files });
      }}
      isCloseAfterOk={isCloseAfterOk}
      width={width}
    >
      {colors.length > 0 && (
        <FormControl fullWidth sx={{ marginBlock: "8px" }}>
          <InputLabel id="color">Màu sắc</InputLabel>
          <Select
            label="Danh mục"
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
      <label htmlFor="contained-button-file">
        <input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={(e) => setFiles(Array.from(e.target.files))}
          hidden
        />
        <Button variant="contained" component="span">
          Chọn hình ảnh
        </Button>
      </label>
      <Grid container rowSpacing={2} columnSpacing={2}>
        {files.map((item, index) => (
          <Grid item xs={2} key={index}>
            <img
              src={URL.createObjectURL(item)}
              alt=""
              style={{ width: "100%" }}
            />
          </Grid>
        ))}
      </Grid>
    </Modal>
  );
};

export default ModalSelectImage;
