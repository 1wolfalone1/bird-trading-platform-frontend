import axios from "axios";
import { BASE_URL } from "../ServerConfig.js";


export const foodAPI = axios.create({
   baseURL: `${BASE_URL}/foods`,
   headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
   },
});

