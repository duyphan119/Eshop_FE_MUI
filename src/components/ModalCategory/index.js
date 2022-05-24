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

const ModalCategory = ({
  open,
  handleClose,
  title,
  labelOk,
  isCloseAfterOk,
  handleOk,
  width,
  category,
}) => {
  const groupCategories = useSelector((state) => state.groupCategory.all);

  const [name, setName] = useState(category ? category.name : "");
  const [code, setCode] = useState(category ? category.code : "");

  const [indexGroup, setIndexGroup] = useState(
    (function () {
      if (category) {
        const index = groupCategories.findIndex(
          (el) => el.id === category.group_category.id
        );
        if (index !== -1) {
          return index;
        }
      }
      return 0;
    })()
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={title}
      labelOk={labelOk}
      handleOk={() => {
        handleOk({
          name,
          code,
          groupCategory: groupCategories[indexGroup],
        });
      }}
      isCloseAfterOk={isCloseAfterOk}
      width={width}
    >
      <Grid container columnSpacing={2} rowSpacing={2} my={1}>
        {groupCategories && (
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="group">Nhóm danh mục</InputLabel>
              <Select
                label="Nhóm danh mục"
                onChange={(e) => setIndexGroup(e.target.value)}
                value={indexGroup}
              >
                {groupCategories.map((item, index) => (
                  <MenuItem key={index} value={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        <Grid item xs={9}>
          <FormControl fullWidth>
            <TextField
              label="Tên danh mục"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <TextField
              label="SKU"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ModalCategory;
