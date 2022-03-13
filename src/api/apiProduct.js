import axios from "axios";
import * as constants from "../constants";
import { getProducts } from "../redux/productSlice";
const API_URL = `${constants.SERVER_URL}/v1/api/product`;
export const apiGetProductsByCategorySlug = async (
  categorySlug,
  query,
  dispatch
) => {
  try {
    const res = await axios.get(
      `${API_URL}/category-slug/${categorySlug}${
        query === "" ? "?all=true" : query + "&all=true"
      }`
    );
    console.log(`${API_URL}/category-slug/${categorySlug}${
      query === "" ? "?all=true" : query + "&all=true"
    }`)
    dispatch(getProducts(res.data));
  } catch (error) {
    console.log(error);
  }
};
export const apiGetProductBySlug = async (slug) => {
  try {
    const res = await axios.get(`${API_URL}/slug/${slug}?all=true`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
