import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiLogin } from "../../api/apiAuth";
import { Link } from "react-router-dom";
import Input from "../../components/custom/Input";
import "./loginregister.scss";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    apiLogin(
      {
        email: "duyphan2@gmail.com",
        password: "123456",
      },
      dispatch,
      navigate
    );
  };
  const handleLoginFacebook = () => {
    window.open("http://localhost:8080/v1/api/auth/facebook");
  };
  const handleLoginGoogle = () => {
    window.open("http://localhost:8080/v1/api/auth/google");
  };
  useEffect(()=>{
    document.title = "Đăng nhập";
  },[])
  return (
    <div className="login-register">
      <Container>
        <form onSubmit={handleSubmit}>
          <div className="form-title">ĐĂNG NHẬP</div>
          <Input
            fields={{
              type: "text",
              name: "email",
              placeholder: "Địa chỉ email",
              id: "email",
              autoComplete: "off",
            }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            fields={{
              type: "password",
              name: "password",
              placeholder: "Mật khẩu",
              id: "password",
            }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 1px",
            }}
          >
            <Link to={`/`} style={{ fontSize: "1.2rem" }}>
              Quên mật khẩu?
            </Link>
            <Link to={`/register`} style={{ fontSize: "1.2rem" }}>
              Đăng ký
            </Link>
          </div>
          <button type="submit" className="form-submit full-width">
            Đăng nhập
          </button>
          <div className="login-register__oauth">
            <div className="login-register__oauth-login google" onClick={handleLoginGoogle}>
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

export default LoginPage;
