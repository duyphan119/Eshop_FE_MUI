import { Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { apiLogout } from "../api/apiAuth";
import "./styles/account_notify.css";
const AccountNotify = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    apiLogout(dispatch, navigate);
  };
  return (
    <Box className="account-notify">
      {user ? (
        <>
          <Link to="/account" className="account-notify-item">
            Thông tin tài khoản
          </Link>
          <Link to="/orders" className="account-notify-item">
            {user.role.role === "admin"
              ? "Danh sách đơn hàng"
              : "Đơn hàng của tôi"}
          </Link>
          {user.role.role === "admin" && (
            <Link to="/dashboard" className="account-notify-item">
              Bảng điều khiển
            </Link>
          )}
          <div className="account-notify-item" onClick={handleLogout}>
            Đăng xuất
          </div>
        </>
      ) : (
        <>
          <Link to="/login" className="account-notify-item">
            Đăng nhập
          </Link>
          <Link to="/register" className="account-notify-item">
            Đăng ký
          </Link>
        </>
      )}
    </Box>
  );
};

export default AccountNotify;
