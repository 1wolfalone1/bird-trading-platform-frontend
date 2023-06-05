


import axios from "axios";
import { BASE_URL } from "../ServerConfig.js";


export const birdApi = axios.create({
   baseURL: `${BASE_URL}/birds`,
   withCredentials : true,
   headers: {
      "Access-Control-Allow-Origin": "*",
   },
});

