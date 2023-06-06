import axios from "axios";
import { BASE_URL } from "../ServerConfig.js";


export const foodAPI = axios.create({
   baseURL: `${BASE_URL}/foods`,
   withCredentials : true,
   headers: {
      "Access-Control-Allow-Origin": "*",
   },
});

