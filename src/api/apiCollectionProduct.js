import axios from "axios";
import * as constants from "../constants";
import { getAllCollectionProducts  } from "../redux/collectionProductSlice";
const API_URL = `${constants.SERVER_URL}/v1/api/collection-product`;
export const apiGetAllCollectionProducts = async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}`);
    dispatch(getAllCollectionProducts(res.data));
  } catch (error) {
    console.log(error);
  }
};
// export const apiGetBuyerTypeBySlug = async (slug) => {
//   try {
//     const res = await axios.get(`${API_URL}/slug/${slug}`);
//     return res.data
//   } catch (error) {
//     console.log(error);
//   }
// };