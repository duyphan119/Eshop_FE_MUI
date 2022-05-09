import * as constants from "../constants";
import { configAxiosResponse } from "../config/configAxios";
const API_URL = `${constants.SERVER_URL}/v1/api/product-detail`;
export const apiCreateDetails = async (details) => {
  try {
    const data = await configAxiosResponse().post(
      `${API_URL}?many=true`,
      details
    );
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
