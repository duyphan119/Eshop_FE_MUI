import { configAxiosAll } from "../config/configAxios";
import * as constants from "../constants";
const API_URL = `${constants.SERVER_URL}/v1/api/statistics`;
export const apiGetRevenue = async (user, query, dispatch) => {
  try {
    const data = await configAxiosAll(user, dispatch).get(
      `${API_URL}/revenue${query}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
