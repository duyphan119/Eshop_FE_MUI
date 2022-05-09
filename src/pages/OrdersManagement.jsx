import { Box, Button, Chip, Container, Grid, Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  apiDeleteOrderUser,
  apiGetAllOrders,
  apiGetOrdersByUser,
  apiUpdateOrder,
} from "../api/apiOrder";
import { apiGetAllOrderStatus } from "../api/apiOrderStatus";
import ConfirmDialog from "../components/ConfirmDialog";
import OrderDetailModal from "../components/OrderDetailModal";
import { ADMIN_ORDERS_PER_PAGE } from "../constants";

const OrdersManagement = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [p, setP] = useState(0);
  const [orderDetailModal, setOrderDetailModal] = useState({
    open: false,
    item: null,
  });
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    text: "",
    onConfirm: () => {},
  });

  console.log(orders);

  useEffect(() => {
    const callApi = async () => {
      let data = [];
      if (user.role.role === "admin") {
        data = await apiGetAllOrders(user, "", dispatch);
      } else {
        data = await apiGetOrdersByUser(user, dispatch);
      }
      setOrders(data);
    };
    callApi();
  }, [dispatch, p, user]);

  useEffect(() => {
    const callApi = async () => {
      const data = await apiGetAllOrderStatus(user, dispatch);
      setOrderStatuses(data);
    };
    callApi();
  }, [dispatch, user]);

  const handleDeleteOrder = async (order) => {
    if (order.code.is_default) {
      const isDeleted = apiDeleteOrderUser(user, order.id, dispatch);
      if (isDeleted) {
        setOrders([...orders].filter((item) => item.id !== order.id));
      }
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "createdAt",
      headerName: "Thời gian tạo",
      width: 140,
      renderCell: (params) => {
        return (
          <>
            {new Date(params.value).toLocaleDateString("vi-VN") +
              " " +
              new Date(params.value).toLocaleTimeString("vi-VN")}
          </>
        );
      },
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 400,
    },
    {
      field: "telephone",
      headerName: "Số điện thoại",
      width: 80,
    },
    {
      field: "total",
      headerName: "Tổng tiền",
      renderCell: (params) => {
        return (
          <>{params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</>
        );
      },
    },
    {
      field: "status",
      width: 160,
      headerName: "Trạng thái",
      renderCell: (params) => {
        return user.role.role === "admin" ? (
          <select
            value={params.row.code_id}
            style={{ outline: "none", padding: "5px" }}
            onChange={async (e) => {
              apiUpdateOrder(
                user,
                { code_id: e.target.value, id: params.row.id },
                dispatch
              );
            }}
          >
            {orderStatuses.map((orderStatus) => (
              <option key={orderStatus.id} value={orderStatus.id}>
                {orderStatus.description}
              </option>
            ))}
          </select>
        ) : (
          <Chip label={params.row.status.description} variant="contained" />
        );
      },
    },
    {
      field: "actions",
      headerName: "Hành động",
      width: 180,
      renderCell: (params) => {
        console.log(params.row);
        return (
          <>
            <Button
              sx={{ fontSize: 12 }}
              variant="contained"
              size="small"
              onClick={() =>
                setOrderDetailModal({ open: true, item: params.row })
              }
            >
              Chi tiết
            </Button>
            {user.role.role !== "admin" && (
              <Button
                variant="contained"
                color="error"
                size="small"
                sx={{ fontSize: 12, ml: 1 }}
                disabled={!params.row.status === "Pending"}
                onClick={() =>
                  setConfirmDialog({
                    ...confirmDialog,
                    open: true,
                    title: "Xác nhận",
                    text: `Bạn có chắc chắn huỷ đơn hàng ${params.row.id} không ?`,
                    onConfirm: () => {
                      handleDeleteOrder(params.row);
                    },
                  })
                }
              >
                Huỷ
              </Button>
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <Box sx={{ paddingBlock: "20px" }}>
        <Container>
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Danh sách đơn hàng</Typography>
            </Grid>
          </Grid>
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12} sx={{ height: 600, width: "100%" }}>
              <DataGrid
                columns={columns}
                rows={orders}
                rowCount={ADMIN_ORDERS_PER_PAGE}
                pageSize={ADMIN_ORDERS_PER_PAGE}
                rowsPerPageOptions={[ADMIN_ORDERS_PER_PAGE]}
                onPageChange={(page) => setP(page)}
                sx={{ fontSize: 12 }}
                components={{
                  Toolbar: () => (
                    <GridToolbarContainer>
                      <GridToolbarColumnsButton />
                      <GridToolbarFilterButton />
                      <GridToolbarDensitySelector />
                      {user.role.role === "admin" && <GridToolbarExport />}
                    </GridToolbarContainer>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <OrderDetailModal
        open={orderDetailModal.open}
        item={orderDetailModal.item}
        handleClose={() => setOrderDetailModal({ open: false, item: null })}
      />
      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        text={confirmDialog.text}
        onConfirm={confirmDialog.onConfirm}
        onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
      />
    </>
  );
};

export default OrdersManagement;
