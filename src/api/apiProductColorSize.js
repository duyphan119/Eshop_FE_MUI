import { configAxiosAll } from "../config/configAxios";
import * as constants from "../constants";
const API_URL = `${constants.SERVER_URL}/v1/api/product-color-size`;
export const apiCreateProductColorSize = async (
  user,
  product_color_size,
  dispatch
) => {
  try {
    const data = await configAxiosAll(user, dispatch).post(
      `${API_URL}`,
      product_color_size
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const apiCreateProductColorSizes = async (
  user,
  product_color_sizes,
  dispatch
) => {
  try {
    const data = await configAxiosAll(user, dispatch).post(
      `${API_URL}?many=true`,
      product_color_sizes
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
