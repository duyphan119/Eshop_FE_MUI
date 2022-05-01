import { configAxiosAll } from "../config/configAxios";
import * as constants from "../constants";
import { getAllCollections, getMainCollection } from "../redux/collectionSlice";
const API_URL = `${constants.SERVER_URL}/v1/api/collection`;
export const apiGetMainCollection = async (user, dispatch) => {
  try {
    const data = await configAxiosAll(user, dispatch).get(
      `${API_URL}?is_main=1`
    );
    dispatch(getMainCollection(data));
  } catch (error) {
    console.log(error);
  }
};

export const apiGetAllCollections = async (user, dispatch) => {
  try {
    const data = await configAxiosAll(user, dispatch).get(`${API_URL}`);
    dispatch(getAllCollections(data));
  } catch (error) {
    console.log(error);
  }
};
