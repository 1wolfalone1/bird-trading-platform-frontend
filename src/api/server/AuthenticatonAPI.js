

import axios from "axios";
import { BASE_URL } from "./ServerConfig.js";


export const authenticateAPI = axios.create({
   baseURL: `${BASE_URL}/users/authenticate`,
   headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
   },
});

