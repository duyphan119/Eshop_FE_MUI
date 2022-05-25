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

const ModalGroupCategory = ({
  open,
  handleClose,
  title,
  labelOk,
  isCloseAfterOk,
  handleOk,
  width,
  groupCategory,
}) => {
  const genderCategories = useSelector((state) => state.genderCategory.all);

  const [name, setName] = useState(groupCategory ? groupCategory.name : "");

  const [indexGender, setIndexGender] = useState(
    (function () {
      if (groupCategory) {
        const index = genderCategories.findIndex(
          (el) => el.id === groupCategory.gender.id
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
          gender: genderCategories[indexGender],
        });
      }}
      isCloseAfterOk={isCloseAfterOk}
      width={width}
    >
      <Grid container columnSpacing={2} rowSpacing={2} my={1}>
        {genderCategories && (
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="group">Đối tượng khách hàng</InputLabel>
              <Select
                label="Nhóm danh mục"
                onChange={(e) => setIndexGender(e.target.value)}
                value={indexGender}
              >
                {genderCategories.map((item, index) => (
                  <MenuItem key={index} value={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Tên nhóm danh mục"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ModalGroupCategory;
