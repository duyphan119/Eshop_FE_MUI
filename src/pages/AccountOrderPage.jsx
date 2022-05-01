import { Box, Container, Grid, Typography } from "@mui/material";
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
import { apiGetOrdersByUser } from "../api/apiOrder";
import { ORDERS_PER_PAGE } from "../constants";

const AccountOrderPage = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "createdAt",
      headerName: "Thời gian tạo",
      width: 160,
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
      width: 500,
      renderCell: (params) => {
        return (
          <>{`${params.row.address_no} ${params.row.street}, ${params.row.ward}, ${params.row.district}, ${params.row.city}`}</>
        );
      },
    },
    {
      field: "delivery_price",
      headerName: "Tiền vận chuyển",
      width: 140,
      renderCell: (params) => {
        return (
          <>{params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</>
        );
      },
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
      field: "code",
      headerName: "Trạng thái",
      renderCell: (params) => {
        return <>{params.value.value_vi}</>;
      },
    },
  ];

  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);

  console.log(orders);

  useEffect(() => {
    const callApi = async () => {
      const data = await apiGetOrdersByUser(user, dispatch);
      setOrders(data);
    };
    callApi();
  }, [dispatch, user]);

  return (
    <Box sx={{ paddingBlock: "20px" }}>
      <Container>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Đơn hàng của tôi</Typography>
          </Grid>
        </Grid>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12} sx={{ height: 600, width: "100%" }}>
            <DataGrid
              columns={columns}
              rows={orders}
              rowCount={ORDERS_PER_PAGE}
              components={{
                Toolbar: () => (
                  <GridToolbarContainer>
                    <GridToolbarColumnsButton />
                    <GridToolbarFilterButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                  </GridToolbarContainer>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AccountOrderPage;
