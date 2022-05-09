import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { apiGetAllOrders } from "../../../api/apiOrder";
import { LIMIT_RECENT_ORDERS } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Orders() {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    const callApi = async () => {
      const data = await apiGetAllOrders(
        user,
        `?limit=${LIMIT_RECENT_ORDERS}`,
        dispatch
      );
      setOrders(data);
    };
    callApi();
  }, [dispatch, user]);

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Đơn số</TableCell>
            <TableCell>Thời gian</TableCell>
            <TableCell>Địa chỉ</TableCell>
            <TableCell>Tổng</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell align="right">Giảm giá</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString("vi-VN") +
                  " " +
                  new Date(order.createdAt).toLocaleTimeString("vi-VN")}
              </TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell>
                {order.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
              </TableCell>
              <TableCell>{order.status.description}</TableCell>
              <TableCell align="right">Không</TableCell>
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
        See more orders
      </Link>
    </React.Fragment>
  );
}
