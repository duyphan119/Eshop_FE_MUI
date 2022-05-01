import { configAxiosAll } from "../config/configAxios";
import * as constants from "../constants";
const API_URL = `${constants.SERVER_URL}/v1/api/comment`;
export const apiAddNewComment = async (user, comment, dispatch) => {
  try {
    const data = await configAxiosAll(user, dispatch).post(
      `${API_URL}`,
      comment
    );
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
export const apiUpdateComment = async (user, comment, dispatch) => {
  try {
    const data = await configAxiosAll(user, dispatch).put(
      `${API_URL}`,
      comment
    );
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
