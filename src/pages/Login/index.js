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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          my: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            {...register("email", {
              required: "Trường này không được để trống",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Địa chỉ email không hợp lệ",
              },
            })}
            fullWidth
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Đăng nhập
          </Button>
          <Button
            variant="outlined"
            fullWidth
            type="button"
            startIcon={<GoogleIcon />}
            sx={{ mt: 2 }}
            onClick={() => {
              window.open(`${SERVER_URL}/v1/api/auth/google`, "_self");
            }}
          >
            Đăng nhập với Google
          </Button>
          <Button
            variant="outlined"
            type="button"
            fullWidth
            startIcon={<FacebookIcon />}
            sx={{ mt: 2, mb: 1 }}
            onClick={() => {
              window.open(`${SERVER_URL}/v1/api/auth/facebook`, "_self");
            }}
          >
            Đăng nhập với Facebook
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                to="/"
                style={{
                  textDecoration: "underline",
                  color: "var(--main-color)",
                }}
              >
                Quên mật khẩu?
              </Link>
            </Grid>
            <Grid item>
              <Link
                to="/register"
                style={{
                  textDecoration: "underline",
                  color: "var(--main-color)",
                }}
              >
                Chưa có tài khoản? Đăng ký
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default Login;
