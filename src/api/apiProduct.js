import axios from "axios";
import { configAxios, configAxiosAll } from "../config/configAxios";
import * as constants from "../constants";
import { getProducts } from "../redux/productSlice";
const API_URL = `${constants.SERVER_URL}/v1/api/product`;
export const apiSearch = async (user, query, dispatch) => {
  try {
    const data = await configAxiosAll(user, dispatch).get(
      `${API_URL}/search${query}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const apiGetProductsByCategorySlug = async (
  user,
  categorySlug,
  query,
  dispatch
) => {
  try {
    let queryString = `${API_URL}/category-slug/${categorySlug}${query}`;
    const data = await configAxiosAll(user, dispatch).get(queryString);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const apiGetProductsByGroupCategorySlug = async (
  user,
  groupCategorySlug,
  query,
  dispatch
) => {
  try {
    console.log(query);
    let queryString = `${API_URL}/group-category-slug/${groupCategorySlug}${query}`;
    const data = await configAxiosAll(user, dispatch).get(queryString);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const apiGetProductsByStatistics = async (user, query, dispatch) => {
  try {
    let queryString = `${API_URL}/statistics?type=${query}`;
    const data = await configAxiosAll(user, dispatch).get(queryString);
    return data;
  } catch (error) {
    console.log(error);
  }
  return [];
};

export const apiGetProductsByCollectionId = async (
  user,
  collectionId,
  query,
  dispatch
) => {
  try {
    let queryString = `${API_URL}/collection/${collectionId}${query}`;
    const data = await configAxiosAll(user, dispatch).get(queryString);
    dispatch(getProducts(data));
  } catch (error) {
    console.log(error);
  }
};
export const apiGetProductsByCollectionIdNotUpdateStore = async (
  user,
  collectionId,
  dispatch
) => {
  try {
    let queryString = `${API_URL}/collection/${collectionId}`;
    const res = await configAxios(user, dispatch).get(queryString);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const apiGetProductBySlug = async (user, slug, query, dispatch) => {
  try {
    const data = await configAxiosAll(user, dispatch).get(
      `${API_URL}/slug/${slug}${query}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
export const apiGetProductsByGenderCategorySlug = async (
  user,
  slug,
  query,
  dispatch
) => {
  try {
    const data = await configAxiosAll(user, dispatch).get(
      `${API_URL}/gender-category-slug/${slug}${query}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
export const apiGetTotalPages = async (query, limit) => {
  try {
    let queryString = `${API_URL}/pages${
      query === "" ? "?limit=" + limit : query + "&limit=" + limit
    }`;
    const res = await axios.get(queryString);
    return res.data.length;
  } catch (error) {
    console.log(error);
  }
  return 0;
};
export const apiCreateProduct = async (user, product, dispatch) => {
  try {
    const data = await configAxiosAll(user, dispatch).post(
      `${API_URL}`,
      product
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
