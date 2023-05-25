

import axios from "axios";
import { BASE_URL } from "./MockConfig";


export const birdApi = axios.create({
   baseURL: `${BASE_URL}/birds`,
   headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
   },
});

