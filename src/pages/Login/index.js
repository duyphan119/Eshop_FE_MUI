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
import { useFormik } from "formik";
import * as Yup from "yup";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { API_AUTH_URL, SERVER_URL } from "../../constants";
import { login } from "../../redux/authSlice";
import { configAxiosResponse } from "../../config/configAxios";
const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (data) => {
      try {
        const resData = await configAxiosResponse().post(
          `${API_AUTH_URL}/login`,
          data
        );
        dispatch(login(resData));
        navigate("/");
      } catch (error) {}
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email address is required")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email address is invalid"
        ),
      password: Yup.string()
        .required("Password is required")
        .min(3, "Password must be least 3 characters"),
    }),
  });

  useEffect(() => {
    document.title = "Đăng nhập";
  }, []);

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
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            error={formik.touched.email && formik.errors.email ? true : false}
            helperText={formik.touched.email && formik.errors.email}
            required
            fullWidth
            label="Email Address"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            margin="normal"
          />
          <TextField
            error={
              formik.touched.password && formik.errors.password ? true : false
            }
            helperText={formik.touched.password && formik.errors.password}
            required
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            margin="normal"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Login
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
            Login with google
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
            Login with Facebook
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/register">{"Don't have an account? Register"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default Login;
