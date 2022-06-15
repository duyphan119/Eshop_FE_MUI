import { axiosRes } from "../config/configAxios";
import { getAllGenderCategories } from "../redux/genderCategorySlice";
import * as constants from "../constants";
const API_URL = `${constants.SERVER_URL}/v1/api/gender`;
export const apiGetAllGenderCategories = async (dispatch) => {
  try {
    const data = await axiosRes().get(`${API_URL}`);
    dispatch(getAllGenderCategories(data));
  } catch (error) {
    console.log(error);
  }
};
