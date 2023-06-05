import axios from "axios";
import { BASE_URL } from "../ServerConfig.js";


export const accessoriesAPI = axios.create({
   baseURL: `${BASE_URL}/accessories`,
   withCredentials : true,
   headers: {
      "Access-Control-Allow-Origin": "*",
   },
});

