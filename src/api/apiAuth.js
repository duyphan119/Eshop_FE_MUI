import axios from "axios";
import { login } from "../redux/authSlice";
import * as constants from "../constants";
const API_URL = `http://localhost:8080/v1/api/auth`;
export const apiLogin = async (user, dispatch, navigate) => {
  try {
    const res = await axios.post(`${API_URL}/login`, user, {
      withCredentials: true,
    });
    dispatch(login(res.data));
    navigate("/");
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
export const apiRefreshToken = async () => {
  try {
    const res = await axios.post(
      `${API_URL}/refresh`,
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
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
export const apiLogout = async (dispatch) => {
  try {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    dispatch(login(null));
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
