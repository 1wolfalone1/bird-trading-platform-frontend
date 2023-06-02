import axios from "axios";
import { BASE_URL } from "../ServerConfig.js";


export const productAPI = axios.create({
   baseURL: `${BASE_URL}/products`,
   headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
   },
});

