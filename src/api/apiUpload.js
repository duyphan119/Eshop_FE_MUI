import { configAxiosResponse } from "../config/configAxios";
import * as constants from "../constants";
const API_URL = `${constants.SERVER_URL}/v1/api/upload`;

export const apiUploadImages = async (formData) => {
  try {
    const data = await configAxiosResponse().post(`${API_URL}`, formData);
    console.log("call api");
    return data;
  } catch (error) {
    console.log(error);
  }
  return [];
};
