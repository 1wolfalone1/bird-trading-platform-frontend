


import axios from "axios";
import { BASE_URL } from "../ServerConfig.js";
axios.interceptors.request.use(request => {
   console.log(request);
   // Edit request config
   return request;
}, error => {
   console.log(error);
   return Promise.reject(error);
});

export const birdApi = axios.create({
   baseURL: `${BASE_URL}/birds`,
   withCredentials : true,
   headers: {
      "Access-Control-Allow-Origin": "*",
   },
});

