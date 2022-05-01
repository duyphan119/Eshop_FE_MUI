import { configAxiosAll } from "../config/configAxios";
import * as constants from "../constants";
const API_URL = `${constants.SERVER_URL}/v1/api/product-color`;
export const apiCreateProductColor = async (user, product_color, dispatch) => {
  try {
    const data = await configAxiosAll(user, dispatch).post(
      `${API_URL}`,
      product_color
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const apiCreateProductColors = async (
  user,
  product_colors,
  dispatch
) => {
  try {
    const data = await configAxiosAll(user, dispatch).post(
      `${API_URL}?many=true`,
      product_colors
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
