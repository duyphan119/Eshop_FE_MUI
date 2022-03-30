import { configAxios } from "../config/configAxios";
import * as constants from "../constants";
import { showToastMessage } from "../redux/toastSlice";
import { getWishlist, removeWishlistItem } from "../redux/wishlistSlice";
const API_URL = `${constants.SERVER_URL}/v1/api/wishlist`;
export const apiAddToWishlist = async (user, data, dispatch) => {
  try {
    await configAxios(user, dispatch).post(`${API_URL}`, data);
    dispatch(
      showToastMessage({
        type: "success",
        text: "Thêm vào danh sách yêu thích thành công",
        title: "Thành công",
        isOpen: true,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      showToastMessage({
        type: "error",
        text: "Thêm vào danh sách yêu thích thất bại",
        title: "Thất bại",
        isOpen: true,
      })
    );
  }
};
export const apiRemoveWishlistItem = async (user, wishlistId, dispatch) => {
  try {
    await configAxios(user, dispatch).delete(`${API_URL}/${wishlistId}`);
    dispatch(removeWishlistItem(wishlistId));
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
export const apiRemoveWishlistItemByProductSlug = async (user, productSlug, dispatch) => {
  try {
    await configAxios(user, dispatch).delete(`${API_URL}/productSlug/${productSlug}`);
    dispatch(removeWishlistItem(productSlug));
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
export const apiGetWishListByUser = async (user, dispatch) => {
   try {
      const res = await configAxios(user, dispatch).get(`${API_URL}/user/${user.id}`);
      dispatch(getWishlist(res.data));
    } catch (error) {
      console.log(error);
    }
}