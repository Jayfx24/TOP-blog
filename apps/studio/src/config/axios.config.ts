import axios from "axios";
// import "dotenv/config";
// MOVE TO PACKAGES SHARED

// import axios from "axios";

// const api = axios.create({ baseURL: "https://api.example.com" });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("access_token");
//   if (token) {
//     config.headers.set("Authorization", `Bearer ${token}`);
//   }
//   return config;
// });

export const api = axios.create({
  baseURL: "/",
  // headers: {
  //   "Content-Type": "application/json",
  // },
  timeout: 10000,
});
// add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) remove token
    return Promise.reject(error);
  },
);
