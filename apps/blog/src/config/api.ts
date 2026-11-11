import axios from "axios";

export const blogAPI = axios.create({
  baseURL: "/api",
  timeout: 10000,
});
