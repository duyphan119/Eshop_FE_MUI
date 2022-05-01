import { configAxiosResponse } from "../config/configAxios";
import { getAllGenderCategories } from "../redux/genderCategorySlice";
import * as constants from "../constants";
const API_URL = `${constants.SERVER_URL}/v1/api/gender-category`;
export const apiGetAllGenderCategories = async (dispatch) => {
  try {
    const data = await configAxiosResponse().get(`${API_URL}`);
    dispatch(getAllGenderCategories(data));
  } catch (error) {
    console.log(error);
  }
};
