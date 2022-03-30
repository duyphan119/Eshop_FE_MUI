import axios from "axios";
import * as constants from "../constants";
import { getAllBuyerTypes } from "../redux/buyerTypeSlice";
const API_URL = `${constants.SERVER_URL}/v1/api/buyer-type`;
export const apiGetAllBuyerTypes = async (dispatch, all) => {
  try {
    const res = await axios.get(`${API_URL}`);
    dispatch(getAllBuyerTypes(res.data));
  } catch (error) {
    console.log(error);
  }
};
export const apiGetBuyerTypeBySlug = async (slug) => {
  try {
    const res = await axios.get(`${API_URL}/slug/${slug}`);
    return res.data
  } catch (error) {
    console.log(error);
  }
};