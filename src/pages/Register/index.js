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
import { API_AUTH_URL } from "../../constants";

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
        navigate("/login");
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng ký tài khoản
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <TextField
            {...register("full_name", {
              required: "Trường này không được để trống",
            })}
            fullWidth
            label="Họ tên"
            error={errors.full_name}
            helperText={errors.full_name && errors.full_name.message}
          />
          <TextField
            {...register("email", {
              required: "Trường này không được để trống",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Địa chỉ email không hợp lệ",
              },
            })}
            fullWidth
            sx={{ mt: 2 }}
            label="Địa chỉ email"
            error={errors.email}
            helperText={errors.email && errors.email.message}
          />
          <TextField
            {...register("password", {
              required: "Trường này không được để trống",
              minLength: { value: 6, message: "Mật khẩu ít nhất 6 kí tự" },
            })}
            fullWidth
            sx={{ mt: 2 }}
            type="password"
            label="Mật khẩu"
            error={errors.password}
            helperText={errors.password && errors.password.message}
          />
          <TextField
            {...register("confirmPassword", {
              required: "Trường này không được để trống",
              validate: (value) =>
                value === password.current ||
                "Nhập lại mật khẩu không chính xác",
            })}
            fullWidth
            sx={{ mt: 2 }}
            type="password"
            label="Nhập lại mật khẩu"
            error={errors.confirmPassword}
            helperText={
              errors.confirmPassword && errors.confirmPassword.message
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Đăng ký
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">Đã có tài khoản? Đăng nhập</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
