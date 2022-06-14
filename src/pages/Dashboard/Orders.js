import { AgGridReact } from "ag-grid-react";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TitlePaper } from "../../components/Title";
import { LIMIT_RECENT_ORDERS } from "../../constants";
import { calHeightDataGrid, formatDateTimeVN } from "../../utils";

export default function Orders() {
  const columns = [
    {
      field: "id",
      headerName: "Đơn số",
      width: 80,
    },
    {
      field: "createdAt",
      headerName: "Thời gian",
      valueFormatter: (params) => `${formatDateTimeVN(params.data.createdAt)}`,
      width: 180,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 500,
    },
    {
      field: "telephone",
      headerName: "Số điện thoại",
      width: 120,
    },
    {
      field: "totalPrice",
      headerName: "Tổng",
      width: 90,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 120,
      pinned: "right",
    },
  ];

  const orders = useSelector((state) => state.order.recentOrders);

  return (
    <React.Fragment>
      <TitlePaper>Đơn hàng gần đây</TitlePaper>
      <div
        style={{
          width: "100%",
          height: calHeightDataGrid(LIMIT_RECENT_ORDERS),
        }}
      >
        <div
          className="ag-theme-alpine"
          style={{ width: "100%", height: "100%" }}
        >
          <AgGridReact
            sideBar={{
              toolPanels: ["filters", "columns"],
            }}
            // rowData={orders}
            rowData={[
              {
                id: 1,
                address:
                  "115/21 Hoàng Hoa Thám, Phường 2, Thành phố Tân An, tỉnh Long An",
                telephone: "0385981197",
                deliveryPrice: 0,
                tempPrice: 570000,
                totalPrice: 570000,
                status: "Đã giao",
                createdAt: "2022-06-14 15:15:34",
              },
            ]}
            columnDefs={columns}
          ></AgGridReact>
        </div>
      </div>
      <Link
        to="/dashboard/orders"
        style={{
          marginTop: "24px",
          color: "var(--main-color)",
          textDecoration: "underline",
          fontSize: "14px",
        }}
      >
        Xem tất cả đơn hàng
      </Link>
    </React.Fragment>
  );
}
