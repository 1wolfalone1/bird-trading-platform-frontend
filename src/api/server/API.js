import axios from "axios";
import { BASE_URL } from "./ServerConfig.js";


export const api = axios.create({
   baseURL: `${BASE_URL}`,
   withCredentials : true,
   headers: {
      "Access-Control-Allow-Origin": "*",
   },
});

