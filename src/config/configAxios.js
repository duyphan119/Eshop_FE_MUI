import axios from "axios";
import jwtDecode from "jwt-decode";
import { apiRefreshToken } from "../api/apiAuth";
import { logout, refreshToken } from "../redux/authSlice";
export const configAxios = (user, dispatch) => {
  const instance = axios.create({
    withCredentials: true,
  });
  instance.interceptors.request.use(
    async (config) => {
      if (user) {
        const decodeToken = jwtDecode(user.access_token) * 1000;

        if (isNaN(decodeToken) || decodeToken < new Date().getTime()) {
          const data = await apiRefreshToken();
          if (data.access_token) {
            dispatch(refreshToken(data.access_token));
            config.headers["authorization"] = `Bearer ${data.access_token}`;
          }
        } else {
          config.headers["authorization"] = `Bearer ${user.access_token}`;
        }
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
  return instance;
};
export const configAxiosResponse = () => {
  const instance = axios.create({
    withCredentials: true,
  });
  instance.interceptors.response.use((res) => {
    return res.data;
  });
  return instance;
};

export const configAxiosAll = (user, dispatch) => {
  const instance = axios.create({
    withCredentials: true,
  });
  instance.interceptors.request.use(
    async (config) => {
      if (user) {
        if (user.access_token) {
          const decodeToken = jwtDecode(user.access_token).exp * 1000;

          if (isNaN(decodeToken) || decodeToken < new Date().getTime()) {
            const data = await apiRefreshToken(dispatch);
            if (data.access_token) {
              dispatch(refreshToken(data.access_token));
              config.headers["authorization"] = `Bearer ${data.access_token}`;
            }
          } else {
            config.headers["authorization"] = `Bearer ${user.access_token}`;
          }
        } else {
          dispatch(logout());
        }
      }
      return config;
    },
    (err) => {}
  );
  instance.interceptors.response.use((res) => {
    return res.data;
  });
  return instance;
};
