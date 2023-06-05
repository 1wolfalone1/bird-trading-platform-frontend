import axios from "axios";
import { BASE_URL } from "./ServerConfig.js";
axios.defaults.withCredentials = true;

export const authenticateAPI = axios.create({
   baseURL: `${BASE_URL}/users/authenticate`,
   withCredentials : true,
   headers: {
      "Access-Control-Allow-Origin": "*",
   },
});
