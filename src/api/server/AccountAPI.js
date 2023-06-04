import axios from "axios";
import { BASE_URL } from "./ServerConfig";


const api = axios.create({
   baseURL: BASE_URL + "/accounts",
   headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
   },
});