import axios from "axios";
import * as constants from "../constants";
import { getAllGroupCategories } from "../redux/groupCategorySlice";
const API_URL = `${constants.SERVER_URL}/v1/api/group-category`;
export const apiGetAllGroupCategories = async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}`);
    dispatch(getAllGroupCategories(res.data));
  } catch (error) {
    console.log(error);
  }
};
export const apiGetGroupCategoriesByBuyerTypeSlug = async (buyerTypeSlug, dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/buyerTypeSlug/${buyerTypeSlug}`);
    dispatch(getAllGroupCategories(res.data));
  } catch (error) {
    console.log(error);
  }
};
export const apiGetGroupCategoryBySlug = async (slug) => {
  try {
    const res = await axios.get(`${API_URL}/slug/${slug}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
