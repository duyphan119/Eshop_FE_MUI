import { AgGridReact } from "ag-grid-react";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TitlePaper } from "../../components/Title";
import config from "../../config";
import { LIMIT_RECENT_ORDERS } from "../../constants";
import { calHeightDataGrid, formatThousandDigits } from "../../utils";

export default function Orders() {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 2,
    },
    {
      field: "category.name",
      headerName: "Danh mục",
      flex: 4,
    },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      flex: 15,
    },
    {
      field: "price",
      headerName: "Giá",
      flex: 3,
      valueFormatter: (params) => formatThousandDigits(params.data.price),
    },
  ];

  const products = useSelector((state) => state.product.bestSellersDashboard);

  return (
    <React.Fragment>
      <TitlePaper>Sản phẩm bán chạy nhất</TitlePaper>
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
          <AgGridReact rowData={products} columnDefs={columns}></AgGridReact>
        </div>
      </div>
      <Link
        to={config.routes.productManagement}
        style={{
          marginTop: "24px",
          color: "var(--main-color)",
          textDecoration: "underline",
          fontSize: "14px",
        }}
      >
        Xem tất cả sản phẩm
      </Link>
    </React.Fragment>
  );
}
