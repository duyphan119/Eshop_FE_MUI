import { useEffect, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import top_banner from "../../assets/imgs/hannah-morgan-39891.webp";
import { API_AUTH_URL } from "../../constants";
import Breadcrumbs from "../../components/Breadcrumbs";
import config from "../../config";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post(`${API_AUTH_URL}/register`, data)
      .then(() => {
        navigate(config.routes.home);
      })
      .catch((err) => {});
  };
  const password = useRef({});
  password.current = watch("password", "");
  useEffect(() => {
    document.title = "Đăng kí";
  }, []);
  console.log(errors);
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
        <div style={{ fontSize: 36 }}>Đăng ký</div>
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
            {...register("fullName", {
              required: "Trường này không được để trống",
            })}
            className="register-input"
            placeholder="Họ tên"
          />
          <input
            {...register("email", {
              required: "Trường này không được để trống",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Địa chỉ email không hợp lệ",
              },
            })}
            className="register-input"
            placeholder="Địa chỉ email"
          />
          <input
            {...register("password", {
              required: "Trường này không được để trống",
              minLength: { value: 6, message: "Mật khẩu ít nhất 6 kí tự" },
            })}
            fullWidth
            type="password"
            placeholder="Mật khẩu"
            className="register-input"
          />
          <input
            {...register("confirmPassword", {
              required: "Trường này không được để trống",
              validate: (value) =>
                value === password.current ||
                "Nhập lại mật khẩu không chính xác",
            })}
            fullWidth
            type="password"
            placeholder="Nhập lại mật khẩu"
            className="register-input"
          />
          <input
            {...register("telephone", {
              required: "Trường này không được để trống",
              pattern: {
                value: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                message: "Số điện thoại không hợp lệ",
              },
            })}
            className="register-input"
            placeholder="Số điện thoại"
          />

          <div className="register-btn-submit">
            <button type="submit">Đăng ký</button>
          </div>
        </Box>
      </Box>
    </>
  );
}
