import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { API_DISCOUNT_URL, LIMIT_ROW_DISCOUNT } from "../../../constants";
import { calHeightDataGrid, formatDateVN } from "../../../utils";
import Pagination from "../../../components/Pagination";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useEffect } from "react";
import { axiosRes } from "../../../config/configAxios";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLimit,
  changePage,
  getDiscount,
} from "../../../redux/discountSlice";
const DiscountManagement = () => {
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
      field: "percent",
      headerName: "Phần trăm",
      sortable: true,
      filter: true,
    },
    {
      field: "banner",
      headerName: "Quảng cáo",
      cellRenderer: (params) => (
        <img src={params.data.banner} height="32" alt="" />
      ),
    },
    {
      field: "start",
      headerName: "Bắt đầu",
      sortable: true,
      filter: true,
      valueGetter: (params) => formatDateVN(params.data.start),
    },
    {
      field: "end",
      headerName: "Kết thúc",
      sortable: true,
      filter: true,
      valueGetter: (params) => formatDateVN(params.data.end),
    },
    {
      field: "description",
      headerName: "Mô tả",
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
              color="secondary"
              onClick={() => {
                // dispatch(getCurrentCategory(params.data));
                // setOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá giảm giá">
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

  const discount = useSelector((state) => state.discount.discount);
  const page = useSelector((state) => state.discount.page);
  const limit = useSelector((state) => state.discount.limit);
  console.log(discount);
  const dispatch = useDispatch();

  useEffect(() => {
    const promises = [];
    promises.push(
      axiosRes().get(
        `${API_DISCOUNT_URL}?limit=${LIMIT_ROW_DISCOUNT}&p=${page}`
      )
    );
    Promise.allSettled(promises)
      .then((listRes) => {
        if (listRes[0].status === "fulfilled") {
          dispatch(getDiscount(listRes[0].value));
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
        Thêm giảm giá
      </button>
      <Box>
        <div
          style={{
            width: "100%",
            overflow: "hidden",
            height: calHeightDataGrid(LIMIT_ROW_DISCOUNT),
          }}
        >
          <div
            className="ag-theme-alpine"
            style={{ width: "100%", height: "100%" }}
          >
            <AgGridReact
              rowData={discount.items}
              columnDefs={columns}
            ></AgGridReact>
          </div>
        </div>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
        <Pagination
          showRowsPerPage={true}
          listRowPerPage={[LIMIT_ROW_DISCOUNT, 50, 100, 200, 500]}
          rowsPerPage={limit}
          onChangeRowsPerPage={(value) => dispatch(changeLimit(value))}
          onChange={(e, value) => {
            dispatch(changePage(value));
          }}
          page={page}
          totalPage={discount.totalPage}
        />
      </Box>
    </Box>
  );
};

export default DiscountManagement;
