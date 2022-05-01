import { configAxiosAll } from "../config/configAxios";
import * as constants from "../constants";
const API_URL = `${constants.SERVER_URL}/v1/api/product-color-image`;
export const apiCreateProductColorImage = async (
  user,
  product_color_image,
  dispatch
) => {
  try {
    const data = await configAxiosAll(user, dispatch).post(
      `${API_URL}`,
      product_color_image
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const apiCreateProductColorImages = async (
  user,
  product_color_images,
  dispatch
) => {
  try {
    const data = await configAxiosAll(user, dispatch).post(
      `${API_URL}?many=true`,
      product_color_images
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
