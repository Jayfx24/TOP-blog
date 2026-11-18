import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
export const blogAPI = axios.create({
  baseURL: `${API_URL}/blog`,
  timeout: 10000,
});
