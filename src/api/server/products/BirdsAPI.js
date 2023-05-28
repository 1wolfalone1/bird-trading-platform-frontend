


import axios from "axios";
import { MOCK_URL } from "../ServerConfig.js";


export const birdApi = axios.create({
   baseURL: `${MOCK_URL}/birds`,
   headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
   },
});

