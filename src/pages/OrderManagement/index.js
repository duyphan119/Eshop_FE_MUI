import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import { configAxiosAll, configAxiosResponse } from "../../config/configAxios";
import {
  API_ORDER_STATUS_URL,
  API_ORDER_URL,
  LIMIT_ROW_ORDER,
} from "../../constants";
import { formatThousandDigits, formatTimeVN } from "../../utils";
import ModalEditOrder from "../../components/ModalEditOrder";
import { CustomTableCell } from "../../components/TableCell";

const useStyles = makeStyles({
  sticky: {
    position: "sticky",
    right: 0,
    backgroundColor: "#fff",
  },
});

const OrderManagement = () => {
  const classes = useStyles();

  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState();
  const [currentOrder, setCurrentOrder] = useState();
  const [open, setOpen] = useState(false);
  const [orderStatuses, setOrderStatuses] = useState([]);

  useEffect(() => {
    document.title = "Quản lý hoá đơn";
  }, []);

  console.log(order);

  useEffect(() => {
    (function () {
      const promiseOrder = new Promise((resolve, reject) =>
        resolve(
          configAxiosAll(user, dispatch).get(
            `${API_ORDER_URL}?limit=${LIMIT_ROW_ORDER}&p=${page}`
          )
        )
      );
      const promiseOrderStatus = new Promise((resolve, reject) =>
        resolve(configAxiosResponse().get(`${API_ORDER_STATUS_URL}`))
      );

      Promise.allSettled([promiseOrder, promiseOrderStatus])
        .then((listRes) => {
          setOrder(listRes[0].value);
          setOrderStatuses(listRes[1].value);
        })
        .catch((err) => {});
    })();
  }, [user, dispatch, page]);

  function handleOk(total, indexStatus) {
    configAxiosAll(user, dispatch)
      .put(`${API_ORDER_URL}`, {
        ...currentOrder,
        total,
        order_status_id: orderStatuses[indexStatus].id,
      })
      .then((data) => {
        const _order = { ...order };
        const index = _order.items.findIndex((el) => el.id === currentOrder.id);
        if (index !== -1) {
          _order.items[index] = {
            ...currentOrder,
            total,
            order_status_id: orderStatuses[indexStatus].id,
            status: orderStatuses[indexStatus],
          };
          setOrder(_order);
        }
      })
      .catch((err) => {});
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 520 }} className="custom-scrollbar">
        <Table stickyHeader size="small">
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
                Tổng tiền
              </CustomTableCell>
              <CustomTableCell header align="center">
                Trạng thái
              </CustomTableCell>
              <CustomTableCell className={classes.sticky}></CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order &&
              order.items &&
              order.items.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <CustomTableCell align="center">{row.id}</CustomTableCell>
                    <CustomTableCell align="center">
                      {formatTimeVN(row.createdAt)}
                    </CustomTableCell>
                    <CustomTableCell align="center">
                      {row.address}
                    </CustomTableCell>
                    <CustomTableCell align="center">
                      {row.telephone}
                    </CustomTableCell>
                    <CustomTableCell align="center">
                      {row.coupon.percent === 0 ? 0 : row.coupon.percent + "%"}
                    </CustomTableCell>
                    <CustomTableCell align="center">
                      {formatThousandDigits(row.total)}
                    </CustomTableCell>
                    <CustomTableCell align="center">
                      {row.status.description}
                    </CustomTableCell>
                    <CustomTableCell className={classes.sticky}>
                      <Tooltip title="Sửa hoá đơn">
                        <IconButton
                          onClick={() => {
                            setCurrentOrder(row);
                            setOpen(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xuất PDF">
                        <IconButton>
                          <DownloadIcon />
                        </IconButton>
                      </Tooltip>
                    </CustomTableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {order && (
        <TablePagination
          rowsPerPageOptions={[LIMIT_ROW_ORDER, 50, 100]}
          component="div"
          count={order.total_result}
          rowsPerPage={LIMIT_ROW_ORDER}
          page={page}
          onPageChange={(e, page) => {
            setPage(page);
          }}
        />
      )}
      {currentOrder && open && (
        <ModalEditOrder
          open={open}
          handleClose={() => setOpen(false)}
          labelOk="Sửa"
          title={`Sửa hoá đơn ${currentOrder.id}`}
          isCloseAfterOk={true}
          order={currentOrder}
          width={600}
          orderStatuses={orderStatuses}
          handleOk={handleOk}
        />
      )}
    </Paper>
  );
};

export default OrderManagement;
