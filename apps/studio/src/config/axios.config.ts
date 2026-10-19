import axios from "axios";
// import "dotenv/config";
// MOVE TO PACKAGES SHARED

export const api = axios.create({
  baseURL: "http://localhost:3000/studio",
  // headers: {
  //   "Content-Type": "application/json",
  // },
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
