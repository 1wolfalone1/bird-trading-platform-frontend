import axios from "axios";
import { BASE_URL } from "../ServerConfig.js";


export const accessoriesAPI = axios.create({
   baseURL: `${BASE_URL}/accessories`,
   headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
   },
});

