import { Grid, Typography } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import {
  calHeightDataGrid,
  exportComponentToPDF,
  formatDateTimeVN,
} from "../../utils";
import Logo from "../Logo";
import Modal from "../Modal";
const ModalDownloadOrder = ({
  open,
  handleClose,
  title,
  labelOk,
  isCloseAfterOk,
  order,
  height,
  width,
}) => {
  console.log(order);
  const columns = [
    {
      field: "detail.product.name",
      headerName: "Sản phẩm",
      flex: 6,
      valueGetter: (params) =>
        `${params.data.detail.product.name} - (${params.data.detail.color.value} / ${params.data.detail.size.value})`,
    },
    {
      field: "product_price",
      headerName: "Giá",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      flex: 1,
    },
  ];
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={title}
      labelOk={labelOk}
      handleOk={() => exportComponentToPDF("order-preview")}
      isCloseAfterOk={isCloseAfterOk}
      width={width}
      height={height}
    >
      <Grid container spacing={2} id="order-preview">
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Logo
              style={{
                color: "#fff",
                backgroundColor: "var(--main-color)",
                fontSize: 60,
                padding: "0 6px",
                width: 80,
                height: 80,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            <Typography variant="h4">ĐƠN ĐẶT HÀNG</Typography>

            <div className="">Số: {order.id}</div>
            <div className="">
              Ngày đặt: {formatDateTimeVN(order.createdAt)}
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>Khách hàng: {order.user.full_name}</div>
          <div>Địa chỉ: {order.address}</div>
          <div>Số điện thoại: {order.telephone}</div>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              width: "100%",
              overflow: "hidden",
              height: calHeightDataGrid(
                order && order.items ? order.items.length : 0
              ),
            }}
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
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "end", textAlign: "right" }}
        >
          <table>
            <thead>
              <tr>
                <td>Giảm giá:</td>
                <td>{order.coupon.percent}</td>
              </tr>
              <tr>
                <td>Tổng cộng:</td>
                <td>{order.total}</td>
              </tr>
            </thead>
          </table>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ModalDownloadOrder;
