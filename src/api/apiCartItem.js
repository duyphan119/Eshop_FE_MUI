import { configAxios, configAxiosAll } from "../config/configAxios";
import * as constants from "../constants";
import { addToCart, removeCartItem, updateCart } from "../redux/cartSlice";
import { showToast } from "../redux/toastSlice";
const API_URL = `${constants.SERVER_URL}/v1/api/cart-item`;
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
      const data = await configAxiosAll(user, dispatch).post(`${API_URL}`, {
        ...item,
        user_id: user.id,
        cart_id: user.cart.id,
      });
      dispatch(addToCart(data));
      dispatch(
        showToast({
          type: "success",
          text: "Thêm thành công",
          isOpen: true,
        })
      );
    } else {
      console.log(user);
      dispatch(
        showToast({
          type: "error",
          text: "Thêm thất bại",
          isOpen: true,
        })
      );
    }
  } catch (error) {
    console.log(error);
    dispatch(
      showToast({
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
      showToast({
        type: "success",
        text: "Xoá thành công",
        isOpen: true,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      showToast({
        type: "error",
        text: "Xoá thất bại",
        isOpen: true,
      })
    );
  }
};
