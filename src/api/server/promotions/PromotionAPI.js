import axios from "axios";
import { BASE_URL } from "../ServerConfig";

export const getAllPromotions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/promotions`);
    return response.data;
  } catch (err) {
    console.log("Get promotion error: ", err);
    return [];
  }
};
