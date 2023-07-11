import axios from "axios";
import { BASE_URL } from "../ServerConfig.js";


export const foodAPI = axios.create({
   baseURL: `${process.env.REACT_APP_BASE_URL}/foods`,
   withCredentials : true,
   headers: {
      "Access-Control-Allow-Origin": "*",
   },
});

