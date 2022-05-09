import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
  HEIGHT_ORDER_DETAIL,
  LIMIT_ORDER_DETAILS,
  WIDTH_ORDER_DETAIL,
} from "../../../constants";

const OrderDetailModal = ({ open, item, handleClose }) => {
  console.log(item);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 560,
          transform: "translate(-50%, -50%)",
          bgcolor: "#fff",
          boxShadow: 24,
          p: 2,
          outline: "none",
        }}
      >
        <Typography variant="h6">
          <b>{`Đơn hàng ${item?.id}`}</b>
        </Typography>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            fontSize: "14px",
          }}
        >
          <li style={{ display: "flex", marginTop: "8px" }}>
            <div style={{ width: "68px" }}>Khách: </div>
            <div style={{ flex: "1" }}>
              {item?.user?.first_name}&nbsp;{item?.user?.last_name}
            </div>
          </li>
          <li style={{ display: "flex", marginTop: "8px" }}>
            <div style={{ width: "68px" }}>Ngày: </div>
            <div style={{ flex: "1" }}>
              {new Date(item?.createdAt).toLocaleDateString("vi-VN")}
            </div>
          </li>
          <li style={{ display: "flex", marginTop: "8px" }}>
            <div style={{ width: "68px" }}>Giờ: </div>
            <div style={{ flex: "1" }}>
              {new Date(item?.createdAt).toLocaleTimeString("vi-VN")}
            </div>
          </li>
          <li style={{ display: "flex", marginTop: "8px" }}>
            <div style={{ width: "68px" }}>Địa chỉ: </div>
            <div style={{ flex: "1" }}>
              {`${item?.address_no} ${item?.street}, ${item?.ward}, ${item?.district}, ${item?.city}`}
            </div>
          </li>
        </ul>
        <Typography
          variant="body2"
          textAlign="center"
          mt={1}
          mb={1}
          fontWeight="bold"
        >
          Danh sách sản phẩm
        </Typography>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            maxHeight: `${
              HEIGHT_ORDER_DETAIL * LIMIT_ORDER_DETAILS +
              LIMIT_ORDER_DETAILS * 8
            }px`,
            overflowY: "auto",
          }}
          className="custom-scrollbar"
        >
          {item?.order_items?.map((order_item) => {
            return (
              <li
                key={order_item + Math.random()}
                style={{
                  display: "flex",
                  marginTop: "8px",
                }}
              >
                <img
                  width={WIDTH_ORDER_DETAIL}
                  height={HEIGHT_ORDER_DETAIL}
                  style={{ objectFit: "cover" }}
                  src={order_item.product_color_size.product_color.thumbnail}
                  alt=""
                />
                <div
                  style={{
                    marginLeft: "8px",
                    transform: "translateY(-1px)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flex: 1,
                    height: `${HEIGHT_ORDER_DETAIL}px`,
                  }}
                >
                  <div
                    className="three-dot three-dot-1"
                    style={{ fontSize: "14px" }}
                  >
                    {order_item.product_color_size.product_color.product.name}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      marginTop: "2px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      Màu sắc:&nbsp;
                      <b>{order_item.product_color_size.product_color.color}</b>
                    </div>
                    <div
                      style={{
                        width: "6px",
                        height: "1px",
                        backgroundColor: "#000",
                        marginInline: "4px",
                        transform: "translateY(1px)",
                      }}
                    ></div>
                    <div>
                      Kích cỡ:&nbsp;
                      <b>{order_item.product_color_size.size_text}</b>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    Số lượng: <b>{order_item.quantity}</b>
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ color: "var(--main-color)" }}>
                      {(
                        order_item.quantity *
                        order_item.product_color_size.product_color.product
                          .price
                      )
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      đ
                    </span>
                    <b style={{ color: "var(--main-color)" }}>
                      {(
                        order_item.quantity *
                        order_item.product_color_size.product_color.product
                          .price
                      )
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      đ
                    </b>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "8px",
          }}
        >
          <table style={{ textAlign: "right" }}>
            <tbody>
              <tr style={{ fontSize: "12px" }}>
                <td>Vận chuyển:</td>
                <td>
                  <b style={{ color: "var(--main-color)" }}>
                    {item?.delivery_price
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    đ
                  </b>
                </td>
              </tr>
              <tr style={{ fontSize: "14px" }}>
                <td>Tổng cộng:</td>
                <td>
                  <b style={{ color: "var(--main-color)" }}>
                    {(item?.total - item?.delivery_price)
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    đ
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Box>
    </Modal>
  );
};

export default OrderDetailModal;
