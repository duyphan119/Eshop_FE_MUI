import * as constants from "../constants";
import { axiosRes } from "../config/configAxios";
const API_URL = `${constants.SERVER_URL}/v1/api/size`;
export const apiGetAllSizes = async () => {
  try {
    const data = await axiosRes().get(`${API_URL}`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
