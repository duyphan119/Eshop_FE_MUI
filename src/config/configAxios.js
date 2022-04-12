import axios from "axios";
import jwtDecode from "jwt-decode";
import { apiRefreshToken } from "../api/apiAuth";
import { refreshToken } from "../redux/authSlice";
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
          if (data.accessToken) {
            dispatch(refreshToken(data.accessToken));
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
