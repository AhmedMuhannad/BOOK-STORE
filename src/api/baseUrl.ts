import axios from "axios";
import { type AxiosInstance } from "axios";
const baseUrl = "http://localhost:5000"; // Replace with your backend URL
const apiBase: AxiosInstance = axios.create({
  baseURL: baseUrl,
});
export default apiBase;
