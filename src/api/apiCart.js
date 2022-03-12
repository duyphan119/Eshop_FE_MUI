import axios from "axios";
import { configAxios } from "../config/configAxios";
import * as constants from "../constants";
import {
  addToCart,
  getCart,
  removeCartItem,
  updateCart,
} from "../redux/cartSlice";
import { showToastMessage } from "../redux/toastSlice";
const API_URL = `${constants.SERVER_URL}/v1/api/cart`;
export const apiGetCartByUser = async (user, dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/user/${user.id}`);
    dispatch(getCart(res.data));
  } catch (error) {
    console.log(error);
  }
};
export const apiAddToCart = async (user, item, dispatch) => {
  try {
    const res = await configAxios(user, dispatch).post(`${API_URL}/`, {
      userId: user.id,
      sizeId: item.size.id,
      quantity: item.quantity,
    });
    dispatch(addToCart(res.data));
    dispatch(
      showToastMessage({
        type: "success",
        text: "Thêm thành công",
        title: "Thành công",
        isOpen: true,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      showToastMessage({
        type: "error",
        text: "Thêm thất bại",
        title: "Thất bại",
        isOpen: true,
      })
    );
  }
};
export const apiUpdateCart = async (user, item, dispatch) => {
  try {
    const res = await configAxios(user, dispatch).put(`${API_URL}/${item.id}`, {
      quantity: item.quantity,
    });
    dispatch(updateCart(res.data));
  } catch (error) {
    console.log(error);
  }
};
export const apiRemoveCartItem = async (user, cartItemId, dispatch) => {
  try {
    await configAxios(user, dispatch).delete(`${API_URL}/${cartItemId}`);
    dispatch(removeCartItem(cartItemId));
    dispatch(
      showToastMessage({
        type: "success",
        text: "Xoá thành công",
        title: "Thành công",
        isOpen: true,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      showToastMessage({
        type: "error",
        text: "Xoá thất bại",
        title: "Thất bại",
        isOpen: true,
      })
    );
  }
};
