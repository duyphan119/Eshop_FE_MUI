import axios from "axios";
import { configAxios, configAxiosAll } from "../config/configAxios";
import * as constants from "../constants";
import { getProducts } from "../redux/productSlice";
import { showToast } from "../redux/toastSlice";
import { apiCreateImageProduct } from "./apiImagesProduct";
import { apiCreateSize } from "./apiSize";
const API_URL = `${constants.SERVER_URL}/v1/api/collection-item`;
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

export const apiGetProductBySlug = async (user, slug, dispatch) => {
  try {
    const res = await configAxios(user, dispatch).get(
      `${API_URL}/slug/${slug}?all=true`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
export const apiCreateProduct = async (data, dispatch) => {
  try {
    const { sizes, images } = data;
    const res1 = await axios.post(`${API_URL}`, data);
    if (res1.data) {
      const id = res1.data.id;
      if (sizes) {
        for (let i = 0; i < sizes.length; i++) {
          await apiCreateSize({ ...sizes[i], productId: id });
        }
      }
      if (images) {
        for (let i = 0; i < images.length; i++) {
          await apiCreateImageProduct({ ...images[i], productId: id });
        }
      }
    }
    dispatch(
      showToast({
        type: "success",
        text: "Thêm thành công",
        title: "Thành công",
        isOpen: true,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      showToast({
        type: "error",
        text: "Thêm thất bại",
        title: "Thất bại",
        isOpen: true,
      })
    );
  }
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
