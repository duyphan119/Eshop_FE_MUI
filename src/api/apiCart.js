import { configAxios, configAxiosAll } from "../config/configAxios";
import * as constants from "../constants";
import { addToCart, removeCartItem, updateCart } from "../redux/cartSlice";
import { showToastMessage } from "../redux/toastSlice";
const API_URL = `${constants.SERVER_URL}/v1/api/cart`;
export const apiGetCartByUser = async (user, dispatch) => {
  try {
    await configAxiosAll(user, dispatch).get(`${API_URL}/user/${user.id}`);
  } catch (error) {
    console.log(error);
  }
};
export const apiMergeCart = async (user, cart, dispatch) => {
  try {
    await configAxiosAll(user, dispatch).post(`${API_URL}?merge=true`, {
      user_id: user.id,
      cart,
    });
  } catch (error) {
    console.log(error);
  }
};
export const apiAddToCart = async (user, item, dispatch) => {
  try {
    if (user) {
      const res = await configAxios(user, dispatch).post(`${API_URL}`, {
        ...item,
        user_id: user.id,
      });
      dispatch(addToCart(res.data));
      dispatch(
        showToastMessage({
          type: "success",
          text: "Thêm thành công",
          isOpen: true,
        })
      );
    } else {
      dispatch(
        showToastMessage({
          type: "error",
          text: "Thêm thất bại",
          isOpen: true,
        })
      );
    }
  } catch (error) {
    console.log(error);
    dispatch(
      showToastMessage({
        type: "error",
        text: "Thêm thất bại",
        isOpen: true,
      })
    );
  }
};
export const apiUpdateCart = async (user, item, dispatch) => {
  try {
    const res = await configAxios(user, dispatch).put(`${API_URL}`, item);
    if (res.data) {
      dispatch(updateCart(res.data));
    } else {
      dispatch(removeCartItem(item.id));
    }
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
        isOpen: true,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      showToastMessage({
        type: "error",
        text: "Xoá thất bại",
        isOpen: true,
      })
    );
  }
};
