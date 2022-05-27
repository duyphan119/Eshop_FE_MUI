import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TitlePaper } from "../../components/Title";
import { configAxiosAll } from "../../config/configAxios";
import { API_ORDER_URL, LIMIT_RECENT_ORDERS } from "../../constants";
import { calHeightDataGrid, formatTimeVN } from "../../utils";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
export default function Orders() {
  const columns = [
    {
      field: "id",
      headerName: "Đơn số",
      width: 90,
    },
    {
      field: "createdAt",
      headerName: "Thời gian",
      valueFormatter: (params) => `${formatTimeVN(params.data.createdAt)}`,
      width: 160,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 620,
    },
    {
      field: "telephone",
      headerName: "Số điện thoại",
      width: 120,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      valueGetter: (params) => params.data.status.description,
      flex: 1,
    },
  ];

  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    (async function () {
      const data = await configAxiosAll(user, dispatch).get(
        `${API_ORDER_URL}?limit=${LIMIT_RECENT_ORDERS}`
      );
      setOrders(data.items);
    })();
  }, [dispatch, user]);

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
            rowData={orders}
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
