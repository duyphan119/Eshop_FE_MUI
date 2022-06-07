import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../components/ConfirmDialog";
import ModalDiscountGender from "../../components/ModalDiscountGender";
import ModalGender from "../../components/ModalGender";
import { configAxiosAll } from "../../config/configAxios";
import {
  API_DISCOUNT_CATEGORY_URL,
  API_GENDER_URL,
  LIMIT_ROW_GENDER,
} from "../../constants";
import {
  addGenderCategory,
  deleteGenderCategory,
  getCurrentGenderCategory,
  updateGenderCategory,
} from "../../redux/genderCategorySlice";
import { calHeightDataGrid } from "../../utils";

const GenderTabPanel = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "name",
      headerName: "Tên đối tượng khách hàng",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "actions",
      headerName: "",
      pinned: "right",
      width: 120,
      cellRenderer: (params) => (
        <>
          <Tooltip title="Sửa đối tượng khách hàng">
            <IconButton
              color="secondary"
              onClick={() => {
                dispatch(getCurrentGenderCategory(params.data));
                setOpenGender(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá đối tượng khách hàng">
            <IconButton
              color="error"
              onClick={() => {
                dispatch(getCurrentGenderCategory(params.data));
                setOpenDialog(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];
  const user = useSelector((state) => state.auth.currentUser);
  const groupCategories = useSelector((state) => state.genderCategory.all);
  const currentGenderCategory = useSelector(
    (state) => state.genderCategory.current
  );

  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [openDiscountGender, setOpenDiscountGender] = useState(false);

  async function handleOk(data) {
    const { name } = data;
    try {
      if (currentGenderCategory) {
        const req = {
          id: currentGenderCategory.id,
          name,
        };
        await configAxiosAll(user, dispatch).put(`${API_GENDER_URL}`, req);
        dispatch(updateGenderCategory({ ...currentGenderCategory, ...req }));
      } else {
        const res = await configAxiosAll(user, dispatch).post(
          `${API_GENDER_URL}`,
          {
            name,
          }
        );
        dispatch(addGenderCategory(res));
      }
    } catch (error) {}
  }
  async function getDiscountGender(data) {
    const { genderCategory, start, end, percent } = data;
    const list = [];
    genderCategory.group_categories.forEach((item) => {
      item.categories.forEach((subItem) => {
        list.push({
          percent,
          start,
          end,
          category_id: subItem.id,
        });
      });
    });
    configAxiosAll(user, dispatch)
      .post(`${API_DISCOUNT_CATEGORY_URL}?many=true`, list)
      .then((res) => {})
      .catch((err) => {});
  }
  async function onConfirm() {
    try {
      await configAxiosAll(user, dispatch).delete(
        `${API_GENDER_URL}/${currentGenderCategory.id}`
      );
      dispatch(deleteGenderCategory(currentGenderCategory.id));
    } catch (error) {}
  }
  return (
    <Box p={1} bgcolor="#fff">
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => {
          dispatch(getCurrentGenderCategory(null));
          setOpenGender(true);
        }}
        startIcon={<AddIcon />}
      >
        Thêm đối tượng
      </Button>
      <Button
        variant="contained"
        sx={{ mb: 2, ml: 2 }}
        onClick={() => {
          setOpenDiscountGender(true);
        }}
        startIcon={<AddIcon />}
      >
        Thêm giảm giá
      </Button>
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          height: calHeightDataGrid(LIMIT_ROW_GENDER),
        }}
      >
        <div
          className="ag-theme-alpine"
          style={{ width: "100%", height: "100%" }}
        >
          <AgGridReact
            rowData={groupCategories}
            columnDefs={columns}
          ></AgGridReact>
        </div>
      </div>
      {openGender && (
        <ModalGender
          open={openGender}
          handleClose={() => setOpenGender(false)}
          labelOk={currentGenderCategory ? "Sửa" : "Thêm"}
          title={
            currentGenderCategory
              ? "Sửa đối tượng khách hàng"
              : "Thêm đối tượng khách hàng"
          }
          isCloseAfterOk={true}
          genderCategory={currentGenderCategory}
          handleOk={handleOk}
        />
      )}
      {openDiscountGender && (
        <ModalDiscountGender
          open={openDiscountGender}
          handleClose={() => setOpenDiscountGender(false)}
          labelOk="Thêm"
          title="Thêm giảm giá"
          isCloseAfterOk={true}
          handleOk={getDiscountGender}
        />
      )}
      {openDialog && (
        <ConfirmDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onConfirm={onConfirm}
          text={`Bạn có chắc chắn muốn xoá ?`}
        />
      )}
    </Box>
  );
};

export default GenderTabPanel;
