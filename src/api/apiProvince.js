import axios from "axios"
const API_URL = "https://provinces.open-api.vn/api/"

export const apiGetAllCities = async () => {
   try {
      const res = await axios.get(`${API_URL}?depth=3`);
      return res.data
   } catch (error) {
      console.log(error)
   }
}