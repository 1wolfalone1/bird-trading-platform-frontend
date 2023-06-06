
import axios from "axios";
import { BASE_URL } from "./ServerConfig.js";


export const registerAPI = axios.create({
   baseURL: `${BASE_URL}/users/register`,
   withCredentials : true,
   headers: {
      "Access-Control-Allow-Origin": "*",
   },
});

