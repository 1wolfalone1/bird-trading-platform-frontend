import { BASE_URL } from "./ServerConfig";


const api = axios.create({
   baseURL: BASE_URL,
   headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
   },
});