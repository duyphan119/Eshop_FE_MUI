import Box from "@mui/material/Box";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import top_banner from "../../assets/imgs/hannah-morgan-39891.webp";
import Breadcrumbs from "../../components/Breadcrumbs";
import config from "../../config";
import { API_AUTH_URL } from "../../constants";
import { setAccessToken } from "../../redux/authSlice";
import { showToast } from "../../redux/toastSlice";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await axios.post(`${API_AUTH_URL}/register`, data);
      const res = await axios.post(`${API_AUTH_URL}/login`, data);
      dispatch(setAccessToken(res.item));
      dispatch(
        showToast({
          isOpen: true,
          text: "Đăng ký thành công",
          type: "success",
        })
      );
      navigate(config.routes.home);
    } catch (error) {}
  };
  const password = useRef({});
  password.current = watch("password", "");
  useEffect(() => {
    document.title = "Đăng kí";
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
          <div
            style={{
              height: 1,
              backgroundColor: "gray",
              width: 180,
              marginBlock: 32,
            }}
          ></div>
          <Link
            to={config.routes.home}
            className="hover-color-main-color register-action-link"
          >
            Về trang chủ
          </Link>
          <Link
            to={config.routes.login}
            className="hover-color-main-color register-action-link"
          >
            Đăng nhập
          </Link>
        </Box>
      </Box>
    </>
  );
}
