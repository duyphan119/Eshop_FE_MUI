import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { API_PRODUCT_URL, LIMIT_ROW_PRODUCT } from "../../../constants";
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
  getProduct,
} from "../../../redux/productSlice";
const ProductManagement = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      sortable: true,
      filter: true,
    },
    {
      field: "groupProduct.name",
      headerName: "Tên nhóm sản phẩm",
      sortable: true,
      filter: true,
    },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      sortable: true,
      filter: true,
    },
    {
      field: "initPrice",
      headerName: "Giá",
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "newPrice",
      headerName: "Giá mới",
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "avatar",
      headerName: "Hình ảnh",
      width: 120,
      cellRenderer: (params) => (
        <img src={params.data.avatar} height="100%" alt="" />
      ),
    },
    {
      field: "slug",
      headerName: "Slug",
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
          <Tooltip title="Sửa sản phẩm">
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
          <Tooltip title="Xoá sản phẩm">
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

  const product = useSelector((state) => state.product.product);
  const page = useSelector((state) => state.product.page);
  const limit = useSelector((state) => state.product.limit);
  console.log(product);
  const dispatch = useDispatch();

  useEffect(() => {
    const promises = [];
    promises.push(
      configAxiosResponse().get(
        `${API_PRODUCT_URL}?limit=${LIMIT_ROW_PRODUCT}&p=${page}`
      )
    );
    Promise.allSettled(promises)
      .then((listRes) => {
        if (listRes[0].status === "fulfilled") {
          dispatch(getProduct(listRes[0].value));
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
        Thêm sản phẩm
      </button>
      <Box>
        <div
          style={{
            width: "100%",
            overflow: "hidden",
            height: calHeightDataGrid(LIMIT_ROW_PRODUCT),
          }}
        >
          <div
            className="ag-theme-alpine"
            style={{ width: "100%", height: "100%" }}
          >
            <AgGridReact
              rowData={product.items}
              columnDefs={columns}
            ></AgGridReact>
          </div>
        </div>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
        <Pagination
          showRowsPerPage={true}
          listRowPerPage={[LIMIT_ROW_PRODUCT, 50, 100, 200, 500]}
          rowsPerPage={limit}
          onChangeRowsPerPage={(value) => dispatch(changeLimit(value))}
          onChange={(e, value) => {
            dispatch(changePage(value));
          }}
          page={page}
          totalPage={product.totalPage}
        />
      </Box>
    </Box>
  );
};

export default ProductManagement;
