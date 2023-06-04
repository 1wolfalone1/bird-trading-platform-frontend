
import axios from "axios";
import { BASE_URL } from "./ServerConfig.js";


export const registerAPI = axios.create({
   baseURL: `${BASE_URL}/users/register`,
   headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
   },
});

