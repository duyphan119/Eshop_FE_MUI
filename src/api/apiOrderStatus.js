import { configAxiosAll } from "../config/configAxios";
import * as constants from "../constants";
const API_URL = `${constants.SERVER_URL}/v1/api/order-status`;
export const apiGetAllOrderStatus = async (user, dispatch) => {
  try {
    const data = await configAxiosAll(user, dispatch).get(`${API_URL}/`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
