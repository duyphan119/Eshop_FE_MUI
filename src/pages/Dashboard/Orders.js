import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CustomTableCell } from "../../components/TableCell";
import { TitlePaper } from "../../components/Title";
import { configAxiosAll } from "../../config/configAxios";
import { API_ORDER_URL, LIMIT_RECENT_ORDERS } from "../../constants";
import { formatThousandDigits, formatTimeVN } from "../../utils";

export default function Orders() {
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
      <Table size="small">
        <TableHead>
          <TableRow>
            <CustomTableCell header align="center">
              Đơn số
            </CustomTableCell>
            <CustomTableCell header align="center">
              Thời gian
            </CustomTableCell>
            <CustomTableCell header align="center">
              Địa chỉ
            </CustomTableCell>
            <CustomTableCell header align="center">
              Số điện thoại
            </CustomTableCell>
            <CustomTableCell header align="center">
              Giảm giá
            </CustomTableCell>
            <CustomTableCell header align="center">
              Tổng
            </CustomTableCell>
            <CustomTableCell header align="center">
              Trạng thái
            </CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <CustomTableCell align="center">{order.id}</CustomTableCell>
              <CustomTableCell align="center">
                {formatTimeVN(order.createdAt)}
              </CustomTableCell>
              <CustomTableCell align="center">{order.address}</CustomTableCell>
              <CustomTableCell align="center">
                {order.telephone}
              </CustomTableCell>
              <CustomTableCell align="center">
                {order.coupon.percent}
              </CustomTableCell>
              <CustomTableCell align="center">
                {formatThousandDigits(order.total)}
              </CustomTableCell>
              <CustomTableCell align="center">
                {order.status.description}
              </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
