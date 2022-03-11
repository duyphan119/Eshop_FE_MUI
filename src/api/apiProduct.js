import axios from "axios";
import * as constants from "../constants";
import { getProducts } from "../redux/productSlice";
const API_URL = `${constants.SERVER_URL}/v1/api/product`;
export const apiGetProductsByCategorySlug = async (categorySlug, dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/category-slug/${categorySlug}`);
    dispatch(getProducts(res.data));
  } catch (error) {
    console.log(error);
  }
};
