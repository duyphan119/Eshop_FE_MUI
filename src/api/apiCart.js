import { configAxiosAll } from "../config/configAxios";
import * as constants from "../constants";
import { getCart } from "../redux/cartSlice";
const API_URL = `${constants.SERVER_URL}/v1/api/cart`;
export const apiGetCartByUser = async (user, dispatch) => {
  try {
    const data = await configAxiosAll(user, dispatch).get(
      `${API_URL}/user/${user.id}`
    );
    dispatch(getCart(data));
  } catch (error) {
    console.log(error);
  }
};
