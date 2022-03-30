import { configAxios } from "../config/configAxios";
import * as constants from "../constants";
import { getCart } from "../redux/cartSlice";
import { showToastMessage } from "../redux/toastSlice";
import { getOrders } from "../redux/orderSlice";
const API_URL = `${constants.SERVER_URL}/v1/api/order`;

export const apiCreateOrder = async (user, data, dispatch) => {
  try {
    await configAxios(user, dispatch).post(`${API_URL}`, data);
    dispatch(getCart([]));
    dispatch(
      showToastMessage({
        type: "success",
        text: "Đặt hàng thành công",
        title: "Thành công",
        isOpen: true,
      })
    );
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
};
export const apiGetOrdersByUser = async (user, dispatch) => {
  try {
    const res = await configAxios(user, dispatch).get(
      `${API_URL}/user/${user.id}`
    );
    dispatch(getOrders(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const apiDeleteOrder = async (user, order, dispatch) => {
  try {
    await configAxios(user, dispatch).delete(
      `${API_URL}/${order.id}`
    );
  } catch (error) {
    console.log(error);
  }
};
