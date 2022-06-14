import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { API_AUTH_URL, SERVER_URL } from "../../constants";
import { login } from "../../redux/authSlice";
import { configAxiosResponse } from "../../config/configAxios";
import top_banner from "../../assets/imgs/hannah-morgan-39891.webp";
import { Divider } from "@mui/material";
import Breadcrumbs from "../../components/Breadcrumbs";
import "./Login.css";
const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    configAxiosResponse()
      .post(`${API_AUTH_URL}/login`, data)
      .then((res) => {
        dispatch(login(res));
        navigate("/");
      })
      .catch((err) => {});
  };
  useEffect(() => {
    document.title = "Đăng nhập";
  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${top_banner})`,
          height: 230,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ fontSize: 36 }}>Đăng nhập</div>
        <Breadcrumbs
          sx={{ textTransform: "uppercase", mt: 2, fontSize: 12 }}
          items={[
            {
              text: "Trang chủ",
              to: "/",
            },
            {
              text: "Tài khoản",
            },
          ]}
        />
      </div>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            {...register("email", {
              required: "Trường này không được để trống",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Địa chỉ email không hợp lệ",
              },
            })}
            className="login-input"
            placeholder="Địa chỉ email"
          />
          <input
            {...register("password", {
              required: "Trường này không được để trống",
              minLength: { value: 6, message: "Mật khẩu ít nhất 6 kí tự" },
            })}
            fullWidth
            style={{ marginTop: 16 }}
            type="password"
            placeholder="Mật khẩu"
            className="login-input"
          />
          <div className="login-btn-submit">
            <button type="submit">Đăng nhập</button>
          </div>
          <div
            style={{
              height: 1,
              backgroundColor: "gray",
              width: 180,
              marginBlock: 32,
            }}
          ></div>
          <Link to={`/`} className="hover-color-main-color login-action-link">
            Về trang chủ
          </Link>
          <Link to={`/`} className="hover-color-main-color login-action-link">
            Đăng ký
          </Link>
          <Link to={`/`} className="hover-color-main-color login-action-link">
            Quên mật khẩu
          </Link>
        </Box>
      </Box>
    </>
  );
};
export default Login;
