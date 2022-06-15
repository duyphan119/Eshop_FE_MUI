import { updateUser } from "../redux/authSlice";
import * as constants from "../constants";
import { configAxios } from "../config/configAxios";
import { showToast } from "../redux/toastSlice";
const API_URL = `${constants.SERVER_URL}/v1/api/user`;
export const apiUpdateUser = async (user, dispatch) => {
  try {
    await configAxios(user, dispatch).put(`${API_URL}/${user.id}`, user, {
      withCredentials: true,
    });
    dispatch(updateUser(user));
    dispatch(
      showToast({
        isOpen: true,
        text: "Cập nhật thành công",
        title: "Thành công",
        type: "success",
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      showToast({
        isOpen: true,
        text: "Cập nhật thất bại",
        title: "Thất bại",
        type: "error",
      })
    );
  }
};
