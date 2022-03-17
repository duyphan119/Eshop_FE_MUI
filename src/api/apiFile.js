import axios from "axios";
import * as constants from "../constants";
const API_URL = `${constants.SERVER_URL}/v1/api/file`;
export const apiUploadImage = async (formData) => {
  try {
    const res = await axios.post(`${API_URL}/upload-image`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
export const apiUploadImages = async (formData) => {
  try {
    const res = await axios.post(`${API_URL}/upload-images`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};