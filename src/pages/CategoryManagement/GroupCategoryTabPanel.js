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
import ModalDiscountGroupCategory from "../../components/ModalDiscountGroupCategory";
import ModalGroupCategory from "../../components/ModalGroupCategory";
import { configAxiosAll } from "../../config/configAxios";
import {
  API_DISCOUNT_CATEGORY_URL,
  API_GROUP_CATEGORY_URL,
  LIMIT_ROW_GROUP_CATEGORY,
} from "../../constants";
import {
  deleteGroupCategory,
  getCurrentGroupCategory,
  addGroupCategory,
  updateGroupCategory,
} from "../../redux/groupCategorySlice";
import { calHeightDataGrid } from "../../utils";

const GroupCategoryTabPanel = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "gender.name",
      headerName: "Đối tượng khách hàng",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "name",
      headerName: "Tên nhóm danh mục",
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
          <Tooltip title="Sửa nhóm danh mục">
            <IconButton
              onClick={() => {
                dispatch(getCurrentGroupCategory(params.data));
                setOpenGroupCategory(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá nhóm danh mục">
            <IconButton
              onClick={() => {
                dispatch(getCurrentGroupCategory(params.data));
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
  const groupCategories = useSelector((state) => state.groupCategory.all);
  const currentGroupCategory = useSelector(
    (state) => state.groupCategory.current
  );

  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [openGroupCategory, setOpenGroupCategory] = useState(false);
  const [openDiscountGroupCategory, setOpenDiscountGroupCategory] =
    useState(false);

  async function handleOk(data) {
    const { name, gender } = data;
    try {
      if (currentGroupCategory) {
        const req = {
          id: currentGroupCategory.id,
          name,
          gender_id: gender.id,
        };
        await configAxiosAll(user, dispatch).put(
          `${API_GROUP_CATEGORY_URL}`,
          req
        );
        dispatch(
          updateGroupCategory({ ...currentGroupCategory, ...req, gender })
        );
      } else {
        const res = await configAxiosAll(user, dispatch).post(
          `${API_GROUP_CATEGORY_URL}`,
          {
            name,
            gender_id: gender.id,
          }
        );
        dispatch(addGroupCategory({ ...res, gender }));
      }
    } catch (error) {}
  }
  async function getDiscountGroupCategory(data) {
    const { groupCategory, start, end, percent } = data;
    const list = [];
    groupCategory.categories.forEach((item) => {
      list.push({
        percent,
        start,
        end,
        category_id: item.id,
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
        `${API_GROUP_CATEGORY_URL}/${currentGroupCategory.id}`
      );
      dispatch(deleteGroupCategory(currentGroupCategory.id));
    } catch (error) {}
  }
  return (
    <Box p={1} bgcolor="#fff">
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => {
          dispatch(getCurrentGroupCategory(null));
          setOpenGroupCategory(true);
        }}
        startIcon={<AddIcon />}
      >
        Thêm nhóm danh mục
      </Button>
      <Button
        variant="contained"
        sx={{ mb: 2, ml: 2 }}
        onClick={() => {
          setOpenDiscountGroupCategory(true);
        }}
        startIcon={<AddIcon />}
      >
        Thêm giảm giá
      </Button>
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          height: calHeightDataGrid(LIMIT_ROW_GROUP_CATEGORY),
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
      {openGroupCategory && (
        <ModalGroupCategory
          open={openGroupCategory}
          handleClose={() => setOpenGroupCategory(false)}
          labelOk={currentGroupCategory ? "Sửa" : "Thêm"}
          title={
            currentGroupCategory ? "Sửa nhóm danh mục" : "Thêm nhóm danh mục"
          }
          isCloseAfterOk={true}
          groupCategory={currentGroupCategory}
          width={600}
          handleOk={handleOk}
        />
      )}
      {openDiscountGroupCategory && (
        <ModalDiscountGroupCategory
          open={openDiscountGroupCategory}
          handleClose={() => setOpenDiscountGroupCategory(false)}
          labelOk="Thêm"
          title="Thêm giảm giá"
          isCloseAfterOk={true}
          handleOk={getDiscountGroupCategory}
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

export default GroupCategoryTabPanel;
