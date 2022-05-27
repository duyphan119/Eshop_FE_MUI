import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import { configAxiosAll, configAxiosResponse } from "../../config/configAxios";
import {
  API_ORDER_STATUS_URL,
  API_ORDER_URL,
  LIMIT_ROW_ORDER,
} from "../../constants";
import {
  calHeightDataGrid,
  formatThousandDigits,
  formatTimeVN,
} from "../../utils";
import ModalEditOrder from "../../components/ModalEditOrder";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const OrderManagement = () => {
  const columns = [
    {
      field: "id",
      headerName: "Đơn số",
      width: 110,
      sortable: true,
      filter: true,
      pinned: "left",
    },
    {
      field: "user.full_name",
      headerName: "Khách hàng",
      width: 200,
      sortable: true,
      filter: true,
    },
    {
      field: "createdAt",
      headerName: "Thời gian",
      width: 170,
      sortable: true,
      filter: true,
      valueFormatter: (params) => formatTimeVN(params.data.createdAt),
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 560,
      sortable: true,
      filter: true,
    },
    {
      field: "telephone",
      headerName: "Số điện thoại",
      width: 140,
      sortable: true,
      filter: true,
    },
    {
      field: "coupon.percent",
      headerName: "Giảm giá",
      width: 110,
      sortable: true,
      filter: true,
    },
    {
      field: "total",
      headerName: "Tổng tiền",
      width: 120,
      sortable: true,
      filter: true,
      valueFormatter: (params) => formatThousandDigits(params.data.total),
    },
    {
      field: "status.description",
      headerName: "Trạng thái",
      width: 130,
      pinned: "right",
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
          <Tooltip title="Sửa hoá đơn">
            <IconButton
              onClick={() => {
                setCurrentOrder(params.data);
                setOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sửa hoá đơn">
            <IconButton>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState();
  const [currentOrder, setCurrentOrder] = useState();
  const [open, setOpen] = useState(false);
  const [orderStatuses, setOrderStatuses] = useState([]);

  console.log(order);

  useEffect(() => {
    (function () {
      const promiseOrder = new Promise((resolve, reject) =>
        resolve(
          configAxiosAll(user, dispatch).get(
            `${API_ORDER_URL}?limit=${LIMIT_ROW_ORDER}&p=${page}`
          )
        )
      );
      const promiseOrderStatus = new Promise((resolve, reject) =>
        resolve(configAxiosResponse().get(`${API_ORDER_STATUS_URL}`))
      );

      Promise.allSettled([promiseOrder, promiseOrderStatus])
        .then((listRes) => {
          setOrder(listRes[0].value);
          setOrderStatuses(listRes[1].value);
        })
        .catch((err) => {});
    })();
  }, [user, dispatch, page]);

  function handleOk(total, indexStatus) {
    configAxiosAll(user, dispatch)
      .put(`${API_ORDER_URL}`, {
        ...currentOrder,
        total,
        order_status_id: orderStatuses[indexStatus].id,
      })
      .then((data) => {
        const _order = { ...order };
        const index = _order.items.findIndex((el) => el.id === currentOrder.id);
        if (index !== -1) {
          _order.items[index] = {
            ...currentOrder,
            total,
            order_status_id: orderStatuses[indexStatus].id,
            status: orderStatuses[indexStatus],
          };
          setOrder(_order);
        }
      })
      .catch((err) => {});
  }

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden", height: calHeightDataGrid(12) }}
    >
      <div
        className="ag-theme-alpine"
        style={{ width: "100%", height: "100%" }}
      >
        <AgGridReact
          rowData={order && order.items ? order.items : []}
          columnDefs={columns}
        ></AgGridReact>
      </div>
      {/* {order && (
        <TablePagination
          rowsPerPageOptions={[LIMIT_ROW_ORDER, 50, 100]}
          component="div"
          count={order.total_result}
          rowsPerPage={LIMIT_ROW_ORDER}
          page={page}
          onPageChange={(e, page) => {
            setPage(page);
          }}
        />
      )} */}
      {currentOrder && open && (
        <ModalEditOrder
          open={open}
          handleClose={() => setOpen(false)}
          labelOk="Sửa"
          title={`Sửa hoá đơn ${currentOrder.id}`}
          isCloseAfterOk={true}
          order={currentOrder}
          width={600}
          orderStatuses={orderStatuses}
          handleOk={handleOk}
        />
      )}
    </Paper>
  );
};

export default OrderManagement;
