import { configAxios } from "../config/configAxios";
import * as constants from "../constants";
const API_URL = `${constants.SERVER_URL}/v1/api`;

export const apiSearch = async (user, keyword, type, dispatch) => {
   try {
      const res = await configAxios(user, dispatch).get(`${API_URL}/${type}?q=${keyword}`)
      return res.data
   } catch (error) {
      console.log(error)
      return []
   }
}