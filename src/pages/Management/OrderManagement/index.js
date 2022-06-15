import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import { API_ORDER_URL, LIMIT_ROW_ORDER } from "../../../constants";
import { calHeightDataGrid } from "../../../utils";
import Pagination from "../../../components/Pagination";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useEffect } from "react";
import { axiosRes } from "../../../config/configAxios";
import { useDispatch, useSelector } from "react-redux";
import { changeLimit, changePage, getOrder } from "../../../redux/orderSlice";
const OrderManagement = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      sortable: true,
      filter: true,
    },
    {
      field: "fullName",
      headerName: "Họ tên",
      sortable: true,
      filter: true,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      sortable: true,
      filter: true,
      width: 540,
    },
    {
      field: "telephone",
      headerName: "Số điện thoại",
      sortable: true,
      filter: true,
    },
    {
      field: "coupon.percent",
      headerName: "Giảm giá",
      sortable: true,
      filter: true,
    },
    {
      field: "deliveryPrice",
      headerName: "Tiền vận chuyển",
      sortable: true,
      filter: true,
    },
    {
      field: "tempPrice",
      headerName: "Tiền tạm tính",
      sortable: true,
      filter: true,
    },
    {
      field: "totalPrice",
      headerName: "Tổng tiền",
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
      field: "status",
      headerName: "Trạng thái",
      sortable: true,
      filter: true,
      pinned: "right",
      width: 120,
    },
    {
      field: "actions",
      headerName: "",
      pinned: "right",
      width: 180,
      cellRenderer: (params) => (
        <>
          <Tooltip title="Xuất hoá đơn">
            <IconButton
              color="success"
              onClick={() => {
                // dispatch(getCurrentCategory(params.data));
                // setOpen(true);
              }}
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sửa hoá đơn">
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
          <Tooltip title="Xoá hoá đơn">
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

  const order = useSelector((state) => state.order.order);
  const page = useSelector((state) => state.order.page);
  const limit = useSelector((state) => state.order.limit);
  console.log(order);
  const dispatch = useDispatch();

  useEffect(() => {
    const promises = [];
    promises.push(
      axiosRes().get(`${API_ORDER_URL}?limit=${LIMIT_ROW_ORDER}&p=${page}`)
    );
    Promise.allSettled(promises)
      .then((listRes) => {
        if (listRes[0].status === "fulfilled") {
          dispatch(getOrder(listRes[0].value));
        }
      })
      .catch((err) => {});
  }, [dispatch, page]);

  return (
    <Box bgcolor="#fff" p={1}>
      <Box>
        <div
          style={{
            width: "100%",
            overflow: "hidden",
            height: calHeightDataGrid(LIMIT_ROW_ORDER),
          }}
        >
          <div
            className="ag-theme-alpine"
            style={{ width: "100%", height: "100%" }}
          >
            <AgGridReact
              rowData={order.items}
              columnDefs={columns}
            ></AgGridReact>
          </div>
        </div>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
        <Pagination
          showRowsPerPage={true}
          listRowPerPage={[LIMIT_ROW_ORDER, 50, 100, 200, 500]}
          rowsPerPage={limit}
          onChangeRowsPerPage={(value) => dispatch(changeLimit(value))}
          onChange={(e, value) => {
            dispatch(changePage(value));
          }}
          page={page}
          totalPage={order.totalPage}
        />
      </Box>
    </Box>
  );
};

export default OrderManagement;
