import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { API_ORDER_URL, LIMIT_RECENT_ORDERS } from "../../constants";
import { configAxiosAll } from "../../config/configAxios";
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
      <Title>Đơn hàng gần đây</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Đơn số</TableCell>
            <TableCell>Thời gian</TableCell>
            <TableCell>Địa chỉ</TableCell>
            <TableCell>Giảm giá</TableCell>
            <TableCell>Tổng</TableCell>
            <TableCell>Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{formatTimeVN(order.createdAt)}</TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell>Không</TableCell>
              <TableCell>{formatThousandDigits(order.total)}</TableCell>
              <TableCell>{order.status.description}</TableCell>
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
