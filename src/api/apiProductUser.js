import { configAxiosAll } from "../config/configAxios";
import * as constants from "../constants";
import { removeFavoriteItem } from "../redux/productSlice";
import { showToastMessage } from "../redux/toastSlice";
const API_URL = `${constants.SERVER_URL}/v1/api/product-user`;
export const apiAddToFavoriteList = async (user, data, dispatch) => {
  try {
    await configAxiosAll(user, dispatch).post(`${API_URL}`, data);
    dispatch(
      showToastMessage({
        type: "success",
        text: "Thêm vào danh sách yêu thích thành công",
        isOpen: true,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      showToastMessage({
        type: "error",
        text: "Thêm vào danh sách yêu thích thất bại",
        isOpen: true,
      })
    );
  }
};
export const apiRemoveFavoriteItem = async (user, data, dispatch) => {
  try {
    await configAxiosAll(user, dispatch).delete(
      `${API_URL}/product/${data.product_id}`
    );
    dispatch(removeFavoriteItem({ product_id: data.product_id }));
    dispatch(
      showToastMessage({
        type: "success",
        text: "Xoá khỏi danh sách yêu thích thành công",
        isOpen: true,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      showToastMessage({
        type: "error",
        text: "Xoá khỏi danh sách yêu thích thất bại",
        isOpen: true,
      })
    );
  }
};
export const apiGetFavoriteListByUser = async (user, dispatch) => {
  try {
    const data = await configAxiosAll(user, dispatch).get(`${API_URL}/user`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
