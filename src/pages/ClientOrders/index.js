import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TitleAccount } from "../../components/Title";
import { configAxiosAll } from "../../config/configAxios";
import { API_ORDER_URL } from "../../constants";
import { formatThousandDigits, formatDateTimeVN } from "../../utils";

const ClientOrders = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [order, setOrder] = useState();

  useEffect(() => {
    document.title = "Đơn hàng của tôi";
    (async function () {
      try {
        const data = await configAxiosAll(user, dispatch).get(
          `${API_ORDER_URL}/user/${user.id}`
        );
        setOrder(data);
      } catch (error) {}
    })();
  }, [user, dispatch]);

  if (!order || !order.items) return "";

  console.log(order);

  return (
    <>
      <TitleAccount
        leftLabel="Đơn hàng của tôi"
        rightLabel={`${order.items.length} đơn hàng`}
      />
      <Box p={1}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Đơn số</TableCell>
              <TableCell align="center">Thời gian</TableCell>
              <TableCell align="center">Địa chỉ</TableCell>
              <TableCell align="center">SĐT</TableCell>
              <TableCell align="center">Giảm giá</TableCell>
              <TableCell align="center">Tổng</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="center">{item.id}</TableCell>
                <TableCell align="center">
                  {formatDateTimeVN(item.createdAt)}
                </TableCell>
                <TableCell align="center">{item.address}</TableCell>
                <TableCell align="center">{item.telephone}</TableCell>
                <TableCell align="center">{item.coupon.percent}%</TableCell>
                <TableCell align="center">
                  {formatThousandDigits(item.total)}
                </TableCell>
                <TableCell align="center">{item.status.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

export default ClientOrders;
