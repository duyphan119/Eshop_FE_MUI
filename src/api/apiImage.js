import * as constants from "../constants";
import { axiosRes } from "../config/configAxios";
const API_URL = `${constants.SERVER_URL}/v1/api/image`;
export const apiCreateImages = async (details) => {
  try {
    const data = await axiosRes().post(`${API_URL}?many=true`, details);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
