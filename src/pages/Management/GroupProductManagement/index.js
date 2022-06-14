import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  API_GROUP_PRODUCT_URL,
  LIMIT_ROW_GROUP_PRODUCT,
} from "../../../constants";
import { calHeightDataGrid } from "../../../utils";
import Pagination from "../../../components/Pagination";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useEffect } from "react";
import { configAxiosResponse } from "../../../config/configAxios";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLimit,
  changePage,
  getGroupProduct,
} from "../../../redux/groupProductSlice";
const GroupProductManagement = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      sortable: true,
      filter: true,
    },
    {
      field: "category.groupCategory.name",
      headerName: "Tên nhóm danh mục",
      sortable: true,
      filter: true,
    },
    {
      field: "category.name",
      headerName: "Tên danh mục",
      sortable: true,
      filter: true,
    },
    {
      field: "name",
      headerName: "Tên nhóm sản phẩm",
      sortable: true,
      filter: true,
    },
    {
      field: "shortName",
      headerName: "Viết tắt",
      sortable: true,
      filter: true,
    },
    {
      field: "avatar",
      headerName: "Hình ảnh",
      cellRenderer: (params) => (
        <img src={params.data.avatar} height="32" alt="" />
      ),
    },
    {
      field: "banner",
      headerName: "Quảng cáo",
      cellRenderer: (params) => (
        <img src={params.data.banner} height="32" alt="" />
      ),
    },
    {
      field: "slug",
      headerName: "Slug",
      sortable: true,
      filter: true,
    },
    {
      field: "description",
      headerName: "Mô tả",
      sortable: true,
      filter: true,
    },
    {
      field: "code",
      headerName: "Viết tắt",
      sortable: true,
      filter: true,
    },
    {
      field: "isHot",
      headerName: "Đang hot",
      valueGetter: (params) => (params.data.isHot ? "Hot" : "Không"),
    },
    {
      field: "actions",
      headerName: "",
      pinned: "right",
      width: 120,
      cellRenderer: (params) => (
        <>
          <Tooltip title="Sửa nhóm sản phẩm">
            <IconButton
              color="secondary"
              onClick={() => {
                // dispatch(getCurrentCategory(params.data));
                // setOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá nhóm sản phẩm">
            <IconButton
              color="error"
              onClick={() => {
                // dispatch(getCurrentCategory(params.data));
                // setOpenDialog(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const groupProduct = useSelector((state) => state.groupProduct.groupProduct);
  const page = useSelector((state) => state.groupProduct.page);
  const limit = useSelector((state) => state.groupProduct.limit);
  console.log(groupProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    const promises = [];
    promises.push(
      configAxiosResponse().get(
        `${API_GROUP_PRODUCT_URL}?limit=${LIMIT_ROW_GROUP_PRODUCT}&p=${page}`
      )
    );
    Promise.allSettled(promises)
      .then((listRes) => {
        if (listRes[0].status === "fulfilled") {
          dispatch(getGroupProduct(listRes[0].value));
        }
      })
      .catch((err) => {});
  }, [dispatch, page]);

  return (
    <Box bgcolor="#fff" p={1}>
      <button
        className="management-btn-add"
        onClick={() => {
          // dispatch(getCurrentCategory(null));
          // setOpen(true);
        }}
      >
        <AddIcon />
        Thêm nhóm sản phẩm
      </button>
      <Box>
        <div
          style={{
            width: "100%",
            overflow: "hidden",
            height: calHeightDataGrid(LIMIT_ROW_GROUP_PRODUCT),
          }}
        >
          <div
            className="ag-theme-alpine"
            style={{ width: "100%", height: "100%" }}
          >
            <AgGridReact
              rowData={groupProduct.items}
              columnDefs={columns}
            ></AgGridReact>
          </div>
        </div>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
        <Pagination
          showRowsPerPage={true}
          listRowPerPage={[LIMIT_ROW_GROUP_PRODUCT, 50, 100, 200, 500]}
          rowsPerPage={limit}
          onChangeRowsPerPage={(value) => dispatch(changeLimit(value))}
          onChange={(e, value) => {
            dispatch(changePage(value));
          }}
          page={page}
          totalPage={groupProduct.totalPage}
        />
      </Box>
    </Box>
  );
};

export default GroupProductManagement;
