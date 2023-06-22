import axios from "axios";
import { BASE_URL } from "./ServerConfig.js";
import qs  from "qs";

export const api = axios.create({
   baseURL: `${process.env.REACT_APP_BASE_URL}`,
   withCredentials: true,
   headers: {
      "Access-Control-Allow-Origin": "*",
   },
});
api.defaults.paramsSerializer = params => qs.stringify(params, {arrayFormat: 'repeat'})
api.interceptors.request.use(
   (config) => {
      if (!config.headers.Authorization) {
         const token = JSON.parse(localStorage.getItem("token"));
         console.log(token, '-------------------------------asdfasdfasdfasdf');
         if (token) {
            config.headers.Authorization = `Bearer ${token.accessToken}`;
         }
      }
      return config;
   },
   (error) => Promise.reject(error)
);
