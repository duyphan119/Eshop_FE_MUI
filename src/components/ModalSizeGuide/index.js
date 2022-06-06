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

const ModalSizeGuide = ({
  open,
  handleClose,
  title,
  labelOk,
  isCloseAfterOk,
  sizeGuide,
  handleOk,
  width,
}) => {
  const categories = useSelector((state) => state.category.all);
  const sizes = useSelector((state) => state.size.all);

  const [indexCategory, setIndexCategory] = useState(
    sizeGuide
      ? categories.findIndex((item) => item.id === sizeGuide.category_id)
      : 0
  );
  const [indexSize, setIndexSize] = useState(
    sizeGuide ? sizes.findIndex((item) => item.id === sizeGuide.size_id) : 0
  );
  const [minHeight, setMinHeight] = useState(
    sizeGuide ? sizeGuide.min_height : 0
  );
  const [maxHeight, setMaxHeight] = useState(
    sizeGuide ? sizeGuide.max_height : 0
  );
  const [minWeight, setMinWeight] = useState(
    sizeGuide ? sizeGuide.min_weight : 0
  );
  const [maxWeight, setMaxWeight] = useState(
    sizeGuide ? sizeGuide.max_weight : 0
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={title}
      labelOk={labelOk}
      handleOk={() => {
        handleOk({
          minHeight,
          maxHeight,
          minWeight,
          maxWeight,
          category: categories[indexCategory],
          size: sizes[indexSize],
        });
      }}
      isCloseAfterOk={isCloseAfterOk}
      width={width}
    >
      <Grid container columnSpacing={2} rowSpacing={2} my={1}>
        {categories && (
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="category-size-guide">Danh mục</InputLabel>
              <Select
                label="Danh mục"
                onChange={(e) => setIndexCategory(e.target.value)}
                value={indexCategory}
              >
                {categories.map((item, index) => (
                  <MenuItem key={index} value={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        {sizes && (
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="size-size-guide">Kích cỡ</InputLabel>
              <Select
                label="Kích cỡ"
                onChange={(e) => setIndexSize(e.target.value)}
                value={indexSize}
              >
                {sizes.map((item, index) => (
                  <MenuItem key={index} value={index}>
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        <Grid item xs={4}>
          <FormControl fullWidth>
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              label="Chiều cao nhỏ nhất"
              value={minHeight}
              onChange={(e) => setMinHeight(parseInt(e.target.value))}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              label="Chiều cao lớn nhất"
              value={maxHeight}
              onChange={(e) => setMaxHeight(parseInt(e.target.value))}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              label="Cân nặng nhỏ nhất"
              value={minWeight}
              onChange={(e) => setMinWeight(parseInt(e.target.value))}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              label="Cân nặng lớn nhất"
              value={maxWeight}
              onChange={(e) => setMaxWeight(parseInt(e.target.value))}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ModalSizeGuide;
