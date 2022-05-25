import { Box } from "@mui/material";
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API_AUTH_URL } from "../../../../constants";
import { logout } from "../../../../redux/authSlice";
const AccountNotify = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogout = () => {
    axios.get(`${API_AUTH_URL}/logout`);
    dispatch(logout());
    navigate("/login");
  };
  return (
    <Box className="account-notify">
      {user ? (
        <>
          <Link to="/account" className="account-notify-item">
            Thông tin tài khoản
          </Link>
          <Link to="/account/order" className="account-notify-item">
            {user && user.role && user.role.role === "admin"
              ? "Danh sách đơn hàng"
              : "Đơn hàng của tôi"}
          </Link>
          {user && user.role && user.role.role === "admin" && (
            <Link to="/dashboard" className="account-notify-item">
              Bảng điều khiển
            </Link>
          )}
          <Link to="/account/latest" className="account-notify-item">
            Đã xem gần đây
          </Link>
          <Link to="/account/favorite" className="account-notify-item">
            Sản phẩm yêu thích
          </Link>
          <div
            className="account-notify-item"
            onClick={handleLogout}
            style={{
              borderTop: "1px solid #000",
              paddingTop: "8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <LogoutIcon fontSize="20px" style={{ marginRight: "4px" }} />
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
