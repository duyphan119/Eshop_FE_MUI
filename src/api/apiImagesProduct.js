import axios from "axios";
import * as constants from "../constants";
const API_URL = `${constants.SERVER_URL}/v1/api/images-product`;
export const apiCreateImageProduct = async (data) => {
   try {
      await axios.post(`${API_URL}`, data)
   } catch (error) {
      console.log(error)
   }
}