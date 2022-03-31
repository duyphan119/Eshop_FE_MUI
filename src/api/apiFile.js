import axios from "axios";
import * as constants from "../constants";
const API_URL = `${constants.SERVER_UPLOAD_IMAGE_URL}?key=${constants.IMGBB_API_KEY}`;
const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});
export const apiUploadImage = async (formData) => {
  try {
    // const image = await toBase64(file);
    // const formData = new FormData();
    // formData.append("image", image);
    const res = await axios.post(`${API_URL}/upload-image`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
export const apiUploadImages = async (formData) => {
  try {
    const res = await axios.post(`${API_URL}`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};