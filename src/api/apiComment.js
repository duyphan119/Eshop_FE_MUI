import axios from "axios";
import * as constants from "../constants";
const API_URL = `${constants.SERVER_URL}/v1/api/comment`;
export const apiAddNewComment = async (comment) => {
  try {
    await axios.post(`${API_URL}`, comment);
  } catch (error) {
    console.log(error);
  }
};
