import axios from "axios";

// MOVE TO PACKAGES SHARED

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
// add token 

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) remove token
    return Promise.reject(error);
  },
);
