import axios from "axios";
import { MOCK_URL } from "./ServerConfig";


const api = axios.create({
   baseURL: MOCK_URL,
   headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
   },
});