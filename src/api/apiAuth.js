import axios from "axios";
import { login, logout } from "../redux/authSlice";
import * as constants from "../constants";
const API_URL = `${constants.SERVER_URL}/v1/api/auth`;
export const apiLogin = async (user, dispatch, navigate) => {
  try {
    const res = await axios.post(`${API_URL}/login`, user, {
      withCredentials: true,
    });
    if (res.data) {
      dispatch(login(res.data));
      navigate("/");
    }
  } catch (error) {
    console.log(error);
  }
};
export const apiLoginWithGoogle = async (dispatch, navigate) => {
  try {
    const res = await axios.get(`${API_URL}/google`, {
      withCredentials: true,
    });
    if (res.data) {
      dispatch(login(res.data));
      navigate("/");
    }
  } catch (error) {
    console.log(error);
  }
};
export const apiRegister = async (user, navigate) => {
  try {
    await axios.post(`${API_URL}/register`, user, {
      withCredentials: true,
    });
    navigate("/login");
  } catch (error) {
    console.log(error);
  }
};
export const apiRefreshToken = async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/refresh`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log("Lỗi api refresh token");
    if (error.response.status === 401) {
      dispatch(logout());
    }
  }
  return null;
};
export const apiOAuthLogin = async (dispatch, navigate) => {
  try {
    const res = await axios.get(`${API_URL}/oauth/success`, {
      withCredentials: true,
    });
    dispatch(login(res.data));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
export const apiLogout = async (dispatch, navigate) => {
  try {
    await axios.get(`${API_URL}/logout`, { withCredentials: true });
    dispatch(logout());
    navigate("/login");
  } catch (error) {
    console.log(error);
  }
};
export const apiGetCodeVerifyEmail = async (email) => {
  try {
    const res = await axios.post(
      `${API_URL}/send-email`,
      { email },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
