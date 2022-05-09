import { configAxiosResponse } from "../config/configAxios";
import * as constants from "../constants";
const API_URL = `${constants.SERVER_URL}/v1/api/code`;
export const apiGetCodesByType = async (type) => {
  try {
    const data = await configAxiosResponse().get(`${API_URL}/type/${type}`);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
