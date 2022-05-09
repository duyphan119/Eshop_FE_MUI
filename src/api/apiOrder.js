import { configAxios, configAxiosAll } from "../config/configAxios";
import * as constants from "../constants";
import { getCart } from "../redux/cartSlice";
import { showToastMessage } from "../redux/toastSlice";
const API_URL = `${constants.SERVER_URL}/v1/api/order`;

export const apiCreateOrder = async (user, data, dispatch) => {
  try {
    const data1 = await configAxiosAll(user, dispatch).post(`${API_URL}`, data);
    dispatch(getCart([]));
    dispatch(
      showToastMessage({
        type: "success",
        text: "Đặt hàng thành công",
        title: "Thành công",
        isOpen: true,
      })
    );
    return data1;
  } catch (error) {
    console.log(error);
    dispatch(
      showToastMessage({
        type: "error",
        text: "Đặt hàng thất bại",
        title: "Thất bại",
        isOpen: true,
      })
    );
  }
  return null;
};
export const apiGetAllOrders = async (user, query, dispatch) => {
  try {
    const data = await configAxiosAll(user, dispatch).get(`${API_URL}${query}`);
    return data;
    // dispatch(getOrders(res.data));
  } catch (error) {
    console.log(error);
  }
};
export const apiGetOrdersByUser = async (user, dispatch) => {
  try {
    const data = await configAxiosAll(user, dispatch).get(
      `${API_URL}/user/${user.id}`
    );
    console.log(data);
    return data;
    // dispatch(getOrders(res.data));
  } catch (error) {
    console.log(error);
  }
  return [];
};

export const apiUpdateOrder = async (user, order, dispatch) => {
  try {
    const data = await configAxios(user, dispatch).put(`${API_URL}`, order);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
export const apiDeleteOrder = async (user, order, dispatch) => {
  try {
    await configAxios(user, dispatch).delete(`${API_URL}/${order.id}`);
  } catch (error) {
    console.log(error);
  }
};
export const apiDeleteOrderUser = async (user, id, dispatch) => {
  try {
    await configAxios(user, dispatch).delete(
      `${API_URL}/${id}/user/${user.id}`
    );
    return true;
  } catch (error) {
    console.log(error);
  }
  return false;
};
