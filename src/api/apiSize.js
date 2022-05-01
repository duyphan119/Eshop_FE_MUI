import axios from "axios";
import * as constants from "../constants";
const API_URL = `${constants.SERVER_URL}/v1/api/size`;
export const apiCreateSize = async (data) => {
   try {
      await axios.post(`${API_URL}`, data)
   } catch (error) {
      console.log(error)
   }
}