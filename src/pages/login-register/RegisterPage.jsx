import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { apiGetCodeVerifyEmail, apiRegister } from "../../api/apiAuth";
import Input from "../../components/custom/Input";
import * as constants from "../../constants";
import "./loginregister.scss";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [codeVerifyEmail, setCodeVerifyEmail] = useState();
  const [code, setCode] = useState("");
  const [duration, setDuration] = useState(0);
  const interval = useRef();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      if (!codeVerifyEmail) {
        setCodeVerifyEmail(await apiGetCodeVerifyEmail(values.email));
      } else {
        if (code === codeVerifyEmail.value) {
          clearInterval(interval.current);
          apiRegister(values, navigate);
        }
      }
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Bắt buộc nhập trường này")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email is incorrect"
        ),
      password: Yup.string()
        .required("Bắt buộc nhập trường này")
        .min(6, "Mật khẩu tối thiểu 6 kí tự"),
      firstName: Yup.string().required("Bắt buộc nhập trường này"),
      lastName: Yup.string().required("Bắt buộc nhập trường này"),
      confirmPassword: Yup.string()
        .required("Bắt buộc nhập trường này")
        .oneOf([Yup.ref("password")], "Nhập lại mật khẩu không chính xác"),
    }),
  });
  useEffect(() => {
    if (codeVerifyEmail) {
      interval.current = setInterval(() => {
        setDuration((prev) => {
          if (prev + 1000 === codeVerifyEmail.expiresIn) {
            return 0;
          }
          return prev + 1000;
        });
      }, 1000);
    }
  }, [codeVerifyEmail]);
  if (codeVerifyEmail && duration >= codeVerifyEmail.expiresIn) {
    clearInterval(interval.current);
  }

  const handleLoginFacebook = () => {
    window.open(`${constants.SERVER_URL}/v1/api/auth/facebook`);
  };
  const handleLoginGoogle = () => {
    window.open(`${constants.SERVER_URL}/v1/api/auth/google`);
  };
  useEffect(() => {
    document.title = "Đăng ký tài khoản";
  }, []);
  if (useSelector((state) => state.auth.currentUser)) {
    return <Navigate to={`/`} />;
  }
  return (
    <div className="login-register">
      <Container>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-title">ĐĂNG KÝ</div>
          {codeVerifyEmail ? (
            <>
              <div>Còn: {(codeVerifyEmail.expiresIn - duration) / 1000}s</div>
              <Input
                fields={{
                  type: "text",
                  name: "code",
                  placeholder: "Nhập mã xác thực",
                  id: "code",
                  autoComplete: "off",
                }}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </>
          ) : (
            <>
              <Input
                fields={{
                  type: "text",
                  name: "firstName",
                  placeholder: "Tên",
                  id: "firstName",
                  autoComplete: "off",
                }}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && formik.errors.firstName}
              />
              <Input
                fields={{
                  type: "text",
                  name: "lastName",
                  placeholder: "Họ",
                  id: "lastName",
                  autoComplete: "off",
                }}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && formik.errors.lastName}
              />
              <Input
                fields={{
                  type: "email",
                  name: "email",
                  placeholder: "Địa chỉ email",
                  id: "email",
                  autoComplete: "off",
                }}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && formik.errors.email}
              />
              <Input
                fields={{
                  type: "password",
                  name: "password",
                  placeholder: "Mật khẩu",
                  id: "password",
                }}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && formik.errors.password}
              />
              <Input
                fields={{
                  type: "password",
                  name: "confirmPassword",
                  placeholder: "Nhập lại mật khẩu",
                  id: "confirmPassword",
                }}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 1px",
                }}
              >
                <Link to={`/login`} style={{ fontSize: "1.4rem" }}>
                  Đăng nhập
                </Link>
              </div>
            </>
          )}
          {codeVerifyEmail ? (
            <>
              <button
                className="login-register__submit full-width"
                type="submit"
              >
                Đăng ký
              </button>
            </>
          ) : (
            <button className="form-submit full-width" type="submit">
              Tiếp theo
            </button>
          )}
          <div className="login-register__oauth">
            <div
              className="login-register__oauth-login google"
              onClick={handleLoginGoogle}
            >
              <AiOutlineGoogle />
              <span>Google</span>
            </div>
            <div
              className="login-register__oauth-login facebook"
              onClick={handleLoginFacebook}
            >
              <FaFacebookF />
              <span>Facebook</span>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default RegisterPage;