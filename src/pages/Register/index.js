import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_AUTH_URL } from "../../constants";

export default function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    onSubmit: (data) => {
      delete data.confirm_password;
      axios
        .post(`${API_AUTH_URL}/register`, data)
        .then((res) => {
          navigate("/login");
        })
        .catch((err) => console.log(err));
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required("First name is required"),
      middle_name: Yup.string().required("Middle name is required"),
      last_name: Yup.string().required("Last name is required"),
      email: Yup.string()
        .required("Email address is required")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email address is invalid"
        ),
      password: Yup.string()
        .required("Password is required")
        .min(3, "Password must be least 3 characters"),
      confirm_password: Yup.string().equals(
        [Yup.ref("password")],
        "Confirm password must be equal password"
      ),
    }),
  });

  useEffect(() => {
    document.title = "Đăng kí";
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
          Register
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={
                  formik.touched.first_name && formik.errors.first_name
                    ? true
                    : false
                }
                helperText={
                  formik.touched.first_name && formik.errors.first_name
                }
                required
                fullWidth
                label="First Name"
                name="first_name"
                id="first_name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={
                  formik.touched.first_name && formik.errors.first_name
                    ? true
                    : false
                }
                helperText={
                  formik.touched.middle_name && formik.errors.middle_name
                }
                required
                fullWidth
                label="Middle Name"
                name="middle_name"
                id="middle_name"
                value={formik.values.middle_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={
                  formik.touched.last_name && formik.errors.last_name
                    ? true
                    : false
                }
                helperText={formik.touched.last_name && formik.errors.last_name}
                required
                fullWidth
                label="Last Name"
                name="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={
                  formik.touched.email && formik.errors.email ? true : false
                }
                helperText={formik.touched.email && formik.errors.email}
                required
                fullWidth
                label="Email Address"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={
                  formik.touched.confirm_password &&
                  formik.errors.confirm_password
                    ? true
                    : false
                }
                helperText={
                  formik.touched.confirm_password &&
                  formik.errors.confirm_password
                }
                required
                fullWidth
                label="Confirm Password"
                type="password"
                name="confirm_password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">Already have an account? Login</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
