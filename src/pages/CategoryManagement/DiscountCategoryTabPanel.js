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
import ModalDiscountCategory from "../../components/ModalDiscountCategory";
import { configAxiosAll, configAxiosResponse } from "../../config/configAxios";
import {
  API_DISCOUNT_CATEGORY_URL,
  LIMIT_ROW_DISCOUNT_CATEGORY,
} from "../../constants";
import {
  getAllDiscountCategories,
  getCurrentDiscountCategory,
} from "../../redux/discountCategorySlice";
import { calHeightDataGrid, formatDateVN } from "../../utils";

const DiscountCategoryTabPanel = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "category.name",
      headerName: "Danh mục",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "start",
      headerName: "Ngày bắt đầu",
      flex: 1,
      sortable: true,
      filter: true,
      valueFormatter: (params) => formatDateVN(params.data.start),
    },
    {
      field: "end",
      headerName: "Ngày kết thúc",
      flex: 1,
      sortable: true,
      filter: true,
      valueFormatter: (params) => formatDateVN(params.data.end),
    },
    {
      field: "percent",
      headerName: "Phần trăm",
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
          <Tooltip title="Sửa giảm giá">
            <IconButton
              onClick={() => {
                dispatch(getCurrentDiscountCategory(params.data));
                setOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá giảm xoá">
            <IconButton
              onClick={() => {
                dispatch(getCurrentDiscountCategory(params.data));
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
  const discountCategories = useSelector((state) => state.discountCategory.all);
  const currentDiscountCategory = useSelector(
    (state) => state.discountCategory.current
  );
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);

  async function onConfirm() {
    try {
      await configAxiosAll(user, dispatch).delete(
        `${API_DISCOUNT_CATEGORY_URL}/${currentDiscountCategory.id}`
      );
      const data = await configAxiosResponse().get(
        `${API_DISCOUNT_CATEGORY_URL}`
      );
      dispatch(getAllDiscountCategories(data));
    } catch (error) {}
  }
  async function getDiscountCategory(data) {
    const { category, start, end, percent } = data;

    if (currentDiscountCategory) {
      configAxiosAll(user, dispatch)
        .put(`${API_DISCOUNT_CATEGORY_URL}`, {
          id: currentDiscountCategory.id,
          percent,
          start,
          end,
          category_id: category.id,
        })
        .then((res) => {
          const _discountCategories = [...discountCategories];
          const index = _discountCategories.findIndex(
            (el) => el.id === currentDiscountCategory.id
          );
          if (index !== -1) {
            _discountCategories[index] = res;
            dispatch(getAllDiscountCategories(_discountCategories));
          }
        })
        .catch((err) => {});
    } else {
      configAxiosAll(user, dispatch)
        .post(`${API_DISCOUNT_CATEGORY_URL}`, {
          percent,
          start,
          end,
          category_id: category.id,
        })
        .then((res) => {
          dispatch(
            getAllDiscountCategories([
              { ...res, category },
              ...discountCategories,
            ])
          );
        })
        .catch((err) => {});
    }
  }
  return (
    <Box p={1} bgcolor="#fff">
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => {
          dispatch(getCurrentDiscountCategory(null));
          setOpen(true);
        }}
        startIcon={<AddIcon />}
      >
        Thêm giảm giá
      </Button>
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          height: calHeightDataGrid(LIMIT_ROW_DISCOUNT_CATEGORY),
        }}
      >
        <div
          className="ag-theme-alpine"
          style={{ width: "100%", height: "100%" }}
        >
          <AgGridReact
            rowData={discountCategories}
            columnDefs={columns}
          ></AgGridReact>
        </div>
      </div>
      {open && (
        <ModalDiscountCategory
          open={open}
          handleClose={() => setOpen(false)}
          labelOk={currentDiscountCategory ? "Sửa" : "Thêm"}
          title={!currentDiscountCategory ? "Thêm giảm giá" : "Sửa giảm giá"}
          isCloseAfterOk={true}
          discountCategory={currentDiscountCategory}
          handleOk={getDiscountCategory}
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

export default DiscountCategoryTabPanel;
