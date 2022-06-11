import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TitleAccount } from "../../components/Title";
import { configAxiosAll } from "../../config/configAxios";
import { API_ORDER_URL } from "../../constants";
import { formatThousandDigits, formatDateTimeVN } from "../../utils";
import ConfirmDialog from "../../components/ConfirmDialog";
import {
  deletedClientOrder,
  getClientOrder,
  getCurrentClientOrder,
} from "../../redux/orderSlice";

const ClientOrders = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const order = useSelector((state) => state.order.clientOrder);
  const page = useSelector((state) => state.order.pageClient);
  const limit = useSelector((state) => state.order.limitClient);
  const current = useSelector((state) => state.order.currentClient);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.title = "Đơn hàng của tôi";
    (async function () {
      try {
        const data = await configAxiosAll(user, dispatch).get(
          `${API_ORDER_URL}/user/${user.id}?limit=${limit}&p=${page}`
        );
        dispatch(getClientOrder(data));
      } catch (error) {}
    })();
  }, [user, dispatch, limit, page]);

  function handleDelete() {
    if (current.status.id === 1) {
      configAxiosAll(user, dispatch)
        .delete(`${API_ORDER_URL}/${current.id}`, {
          data: { user_id: user.id },
        })
        .then(() => {
          dispatch(deletedClientOrder(current.id));
        })
        .catch((err) => {});
    }
  }
  console.log(current);
  if (!order || !order.items) return "";

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
              <TableCell align="center"></TableCell>
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
                <TableCell align="center">
                  <Tooltip title="Huỷ đơn hàng" size="small">
                    <IconButton
                      color="error"
                      onClick={() => {
                        dispatch(getCurrentClientOrder(item));
                        setOpen(true);
                      }}
                      disabled={current ? current.status.id !== 1 : true}
                    >
                      <DoDisturbIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        text="Bạn có chắc chắn muốn huỷ đơn hàng này ?"
      />
    </>
  );
};

export default ClientOrders;
