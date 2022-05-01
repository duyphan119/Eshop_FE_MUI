import axios from "axios";
import { getAllCategories } from "../redux/categorySlice";
import * as constants from "../constants";
import { configAxiosResponse } from "../config/configAxios";
const API_URL = `${constants.SERVER_URL}/v1/api/category`;
export const apiGetAllCategories = async () => {
  try {
    const data = await configAxiosResponse().get(`${API_URL}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const apiGetCategoriesByBuyerTypeSlug = async (
  buyerTypeSlug,
  dispatch
) => {
  try {
    const res = await axios.get(`${API_URL}/buyerTypeSlug/${buyerTypeSlug}`);
    dispatch(getAllCategories(res.data));
  } catch (error) {
    console.log(error);
  }
};
export const apiGetCategoryBySlug = async (slug) => {
  try {
    const res = await axios.get(`${API_URL}/slug/${slug}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
