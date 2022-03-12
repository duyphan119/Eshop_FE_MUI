import axios from "axios";
import * as constants from "../constants";
import { getProducts, getProduct } from "../redux/productSlice";
const API_URL = `${constants.SERVER_URL}/v1/api/product`;
export const apiGetProductsByCategorySlug = async (categorySlug, dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/category-slug/${categorySlug}?all=true`);
    dispatch(getProducts(res.data));
  } catch (error) {
    console.log(error);
  }
};
export const apiGetProductBySlug = async (slug) => {
  try {
    const res = await axios.get(`${API_URL}/slug/${slug}?all=true`);
    console.log(res.data)
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
