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
import ModalCategory from "../../components/ModalCategory";
import { configAxiosAll, configAxiosResponse } from "../../config/configAxios";
import {
  API_CATEGORY_URL,
  API_UPLOAD_URL,
  LIMIT_ROW_CATEGORY,
} from "../../constants";
import {
  addCategory,
  getAllCategories,
  getCurrentCategory,
  updateCategory,
} from "../../redux/categorySlice";
import { calHeightDataGrid } from "../../utils";

const CategoryTabPanel = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "group_category.gender.name",
      headerName: "Đối tượng",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "group_category.name",
      headerName: "Nhóm danh mục",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "icon",
      headerName: "Icon",
      flex: 1,
      cellRenderer: (params) => (
        <img src={params.data.icon} width="16" height="16" alt="" />
      ),
    },
    {
      field: "name",
      headerName: "Tên danh mục",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "code",
      headerName: "Viết tắt",
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
          <Tooltip title="Sửa danh mục">
            <IconButton
              color="secondary"
              onClick={() => {
                dispatch(getCurrentCategory(params.data));
                setOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá danh mục">
            <IconButton
              color="error"
              onClick={() => {
                dispatch(getCurrentCategory(params.data));
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
  const categories = useSelector((state) => state.category.all);
  const currentCategory = useSelector((state) => state.category.current);
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleOk(data) {
    try {
      const { name, code, file, groupCategory } = data;
      let urlList;
      if (file) {
        let formData = new FormData();
        formData.append("images", file);
        urlList = await configAxiosResponse().post(
          `${API_UPLOAD_URL}`,
          formData
        );
      }
      let res;
      if (currentCategory) {
        let req = {
          id: currentCategory.id,
          name,
          code,
          icon:
            urlList && urlList.length > 0
              ? urlList[0].secure_url
              : currentCategory.icon,
          group_category_id: groupCategory.id,
        };
        await configAxiosAll(user, dispatch).put(`${API_CATEGORY_URL}`, req);
        dispatch(
          updateCategory({
            ...currentCategory,
            ...req,
            group_category: groupCategory,
          })
        );
      } else {
        res = await configAxiosAll(user, dispatch).post(`${API_CATEGORY_URL}`, {
          name,
          code,
          icon: urlList && urlList.length > 0 ? urlList[0].secure_url : null,
          group_category_id: groupCategory.id,
        });
        dispatch(addCategory({ ...res, group_category: groupCategory }));
      }
    } catch (error) {}
  }
  async function onConfirm() {
    try {
      await configAxiosAll(user, dispatch).delete(
        `${API_CATEGORY_URL}/${currentCategory.id}`
      );
      const data = await configAxiosResponse().get(`${API_CATEGORY_URL}`);
      dispatch(getAllCategories(data));
    } catch (error) {}
  }
  return (
    <Box p={1} bgcolor="#fff">
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => {
          dispatch(getCurrentCategory(null));
          setOpen(true);
        }}
        startIcon={<AddIcon />}
      >
        Thêm danh mục
      </Button>
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          height: calHeightDataGrid(LIMIT_ROW_CATEGORY),
        }}
      >
        <div
          className="ag-theme-alpine"
          style={{ width: "100%", height: "100%" }}
        >
          <AgGridReact rowData={categories} columnDefs={columns}></AgGridReact>
        </div>
      </div>
      {open && (
        <ModalCategory
          open={open}
          handleClose={() => setOpen(false)}
          labelOk={currentCategory ? "Sửa" : "Thêm"}
          title={currentCategory ? "Sửa danh mục" : "Thêm danh mục"}
          isCloseAfterOk={true}
          category={currentCategory}
          width={600}
          handleOk={handleOk}
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

export default CategoryTabPanel;
